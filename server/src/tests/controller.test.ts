import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import portfolioHandling from '../controllers/portfolioController';
import { Project } from '../models/Project';

// Mock the models
vi.mock('../models/Project');
vi.mock('../models/Country');

describe('portfolioHandling', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockProjects: any[];

    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();

        // Setup response mock
        mockRes = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };

        // Setup basic test data
        mockProjects = [
            {
                id: 1,
                description: 'Project 1',
                image_url: 'image1.jpg',
                distribution_weight: 70,
                offered_volume_in_tons: 1000,
                country: { name: 'Country 1' },
                get: vi.fn().mockReturnValue(70),
                getDataValue: vi.fn().mockReturnValue(1000),
                toJSON: vi.fn().mockReturnValue({
                    id: 1,
                    description: 'Project 1',
                    image_url: 'image1.jpg',
                    distribution_weight: 70,
                    offered_volume_in_tons: 1000,
                    country: { name: 'Country 1' }
                })
            },
            {
                id: 2,
                description: 'Project 2',
                image_url: 'image2.jpg',
                distribution_weight: 30,
                offered_volume_in_tons: 500,
                country: { name: 'Country 2' },
                get: vi.fn().mockReturnValue(30),
                getDataValue: vi.fn().mockReturnValue(500),
                toJSON: vi.fn().mockReturnValue({
                    id: 2,
                    description: 'Project 2',
                    image_url: 'image2.jpg',
                    distribution_weight: 30,
                    offered_volume_in_tons: 500,
                    country: { name: 'Country 2' }
                })
            }
        ];

        // Mock Project.findAll
        (Project.findAll as any).mockResolvedValue(mockProjects);
    });

    it('should allocate tons proportionally based on distribution weight', async () => {
        mockReq = {
            body: { requestedTons: 900 }
        };

        await portfolioHandling(mockReq as Request, mockRes as Response);

        expect(mockRes.json).toHaveBeenCalled();
        const result = mockRes.json.mock.calls[0][0];
        
        // Check if allocation is proportional to weights (70/30 split)
        expect(result).toHaveLength(2);
        expect(result[0].allocated).toBeCloseTo(630, 1); // 70% of 900
        expect(result[1].allocated).toBeCloseTo(270, 1); // 30% of 900
    });

    it('should respect maximum offered volume limits', async () => {
        mockReq = {
            body: { requestedTons: 2000 } // More than total available
        };

        await portfolioHandling(mockReq as Request, mockRes as Response);

        const result = mockRes.json.mock.calls[0][0];
        expect(result[0].allocated).toBeLessThanOrEqual(1000); // First project max
        expect(result[1].allocated).toBeLessThanOrEqual(500);  // Second project max
        expect(result[0].allocated + result[1].allocated).toBeLessThanOrEqual(1500); // Total available
    });

    it('should handle redistribution of remaining tons', async () => {
        // Modify first project to have limited capacity
        mockProjects[0].offered_volume_in_tons = 300;
        mockProjects[0].getDataValue = vi.fn().mockReturnValue(300);
        mockProjects[0].toJSON = vi.fn().mockReturnValue({
            ...mockProjects[0].toJSON(),
            offered_volume_in_tons: 300
        });

        mockReq = {
            body: { requestedTons: 600 }
        };

        await portfolioHandling(mockReq as Request, mockRes as Response);

        const result = mockRes.json.mock.calls[0][0];
        expect(result[0].allocated).toBe(300); // Max capacity
        expect(result[1].allocated).toBeCloseTo(300); // Gets remaining tons
    });

    it('should handle errors gracefully', async () => {
        // Mock a failure
        (Project.findAll as any).mockRejectedValue(new Error('Database error'));

        mockReq = {
            body: { requestedTons: 1000 }
        };

        await portfolioHandling(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Allocation failed' });
    });

    it('should return correct response format', async () => {
        mockReq = {
            body: { requestedTons: 500 }
        };

        await portfolioHandling(mockReq as Request, mockRes as Response);

        const result = mockRes.json.mock.calls[0][0];
        expect(result[0]).toMatchObject({
            id: expect.any(Number),
            description: expect.any(String),
            image: expect.any(String),
            country: expect.any(String),
            allocated: expect.any(Number)
        });
    });
});