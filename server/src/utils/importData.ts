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
  price_per_ton: string;
  offered_volume_in_tons: string;
  distribution_weight: string;
  supplier_name: string;
  earliest_delivery: string;
  description: string;
}

const csvFilePath = path.join(__dirname, 'data', 'data.csv');

export default async function importCSV() {
  try {
    const rows: CSVRow[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
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
              countryMap.set(row.country, country.id);
            }
          }

          console.log('Countries inserted ✅');

          const projectsToInsert = rows.map((row) => ({
            id: parseInt(row.id),
            name: row.name,
            country_id: countryMap.get(row.country)!,
            image: row.image,
            price_per_ton: parseFloat(row.price_per_ton),
            offered_volume_in_tons: parseInt(row.offered_volume_in_tons),
            distribution_weight: parseFloat(row.distribution_weight),
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
