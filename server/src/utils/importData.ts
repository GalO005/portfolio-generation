import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { Country } from '../models/Country';
import { Project } from '../models/Project';

interface CSVRow {
  id: string;
  name: string;
  country: string;
  image: string;
  price_per_ton: number;
  offered_volume_in_tons: number;
  distribution_weight: number;
  supplier_name: string;
  earliest_delivery: string;
  description: string;
}

const csvFilePath = path.resolve(__dirname, '..', 'data', 'data.csv');

export default async function importCSV() {
  try {
    const rows: CSVRow[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser({
          mapHeaders: ({ header }) => header.trim().toLowerCase().replace(/ /g, '_')
        }))
        .on('data', (data) => rows.push(data))
        .on('end', async () => {
          console.log('CSV data read successfully ✅');

          const countryMap = new Map<string, number>();

          for (const row of rows) {
            if (!countryMap.has(row.country)) {
              let country = await Country.findOne({ where: { name: row.country } });
              if (!country) {
                country = await Country.create({ name: row.country });
              }
              countryMap.set(row.country, country.getDataValue('id'));
            }
          }

          console.log('Countries inserted ✅');
          

          const projectsToInsert = rows.map((row) => ({
            id: parseInt(row.id),
            name: row.name,
            country_id: Number(countryMap.get(row.country)),
            image_url: row.image,
            price_per_ton: row.price_per_ton,
            offered_volume_in_tons: row.offered_volume_in_tons,
            distribution_weight: row.distribution_weight,
            supplier_name: row.supplier_name,
            earliest_delivery: row.earliest_delivery,
            description: row.description
          }));

          await Project.bulkCreate(projectsToInsert, { ignoreDuplicates: true });

          console.log('Projects inserted ✅');
          resolve();
        })
        .on('error', (err) => reject(err));
    });
  } catch (error) {
    console.error('Error importing CSV ❌', error);
  }
}