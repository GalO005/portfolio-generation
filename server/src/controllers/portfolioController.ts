import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { Country } from '../models/Country';

interface ProjectWithAllocated extends Project {
    allocated: number;
}
export default async function portfolioHandling(req: Request, res: Response) {
    try {
        const { requestedTons } = req.body;

        // Fetch all projects with their associated countries
        let projects = await Project.findAll({
            order: [["distribution_weight", "DESC"]],
            include: [{ model: Country, attributes: ['name'] }]
        });


        // Calculate total distribution weight
        const totalWeight = projects.reduce((sum, project) => sum + project.get('distribution_weight'), 0);

        // Initialize variables
        // let remainingTons = +requestedTons;
        let remainingTons = Math.min(+requestedTons, projects.reduce((sum, p) => sum + p.getDataValue('offered_volume_in_tons'), 0));
        const allocation: ProjectWithAllocated[] = [];

        // First pass: Allocate tons proportionally, respecting available volume
        let projectsWithAllocated: ProjectWithAllocated[] = projects.map((p) => ({
            ...p.toJSON(),
            allocated: 0
        }) as ProjectWithAllocated);
        for (const project of projectsWithAllocated) {
            const proportionalShare = (project['distribution_weight'] / totalWeight) * requestedTons;
            const allocateAmount = Math.min(proportionalShare, project['offered_volume_in_tons']);

            project.allocated = allocateAmount;
            allocation.push(project);

            remainingTons -= allocateAmount;
            if (remainingTons <= 0) break;
        }

        // Second pass: Redistribute remaining tons to projects with available volume
        if (remainingTons > 0) {
            // Filter projects that still have available volume
            const availableProjects = allocation.filter((p) => p['offered_volume_in_tons'] - p.allocated > 0);

            // Calculate total remaining weight for redistribution
            const remainingWeight = availableProjects.reduce((sum, p) => sum + p['distribution_weight'], 0);

            // Redistribute remaining tons proportionally
            for (const project of availableProjects) {
                const additionalAllocation = Math.min(
                    (project['distribution_weight'] / remainingWeight) * remainingTons,
                    (project['offered_volume_in_tons']) - project.allocated
                );

                project.allocated += additionalAllocation;
                remainingTons -= additionalAllocation;

                if (remainingTons <= 0) break;
            }
        }

        // Ensure the total allocated tons do not exceed the requested amount
        const totalAllocated = allocation.reduce((sum, p) => sum + p.allocated, 0);
        if (totalAllocated > requestedTons) {
            throw new Error("Total allocated tons exceeded the requested amount.");
        }
        const results = allocation.map((p) => ({id: p.id, description: p.description, image: p.image_url, country: p.country.name, allocated: p.allocated}));

        // Send the allocation response
        res.json(results);
    } catch (error) {
        console.error("Error during allocation:", error);
        res.status(500).json({ error: "Allocation failed" });
    }
}