import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Project {
    id: number;
    name: string;
    country: string;
    image: string;
    price_per_ton: number;
    available: number;
    distribution_weight: number;
  }
const projects: Project[] = [
    { id: 1, name: "EverGreen CarbonScape", country: "Germany", image: "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Fugitives/38bb530f5caf513be9f2a41f2d909f47-min.jpeg", price_per_ton: 650, available: 15, distribution_weight: 0.05 },
    { id: 2, name: "VerdeCarbon", country: "India", image: "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Mineralisation/ben-karpinski-ctWw2S9VqOI-unsplash-min.jpg", price_per_ton: 200, available: 900, distribution_weight: 0.1 },
    { id: 3, name: "SustainaForest Carbon", country: "Brazil", image: "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Afforestation+reforestation/marita-kavelashvili-ugnrXk1129g-unsplash-min.jpg", price_per_ton: 50.85, available: 1500, distribution_weight: 0.15 },
    { id: 4, name: "EcoRespire", country: "India", image: "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Climate+fund/climate-fund.png", price_per_ton: 25, available: 1100, distribution_weight: 0.25 },
    { id: 5, name: "EverGreen Carbon", country: "Egypt", image: "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Renewable+energy/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-min.jpg", price_per_ton: 10.5, available: 16000, distribution_weight: 0.45 }
  ];

export default function Portfolio() {
  const [requestedTons, setRequestedTons] = useState("");
  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Carbon Credit Portfolio</h2>
          <Input
            type="number"
            min={0}
            value={requestedTons}
            onChange={(e) => setRequestedTons(e.target.value)}
            placeholder="Enter desired tons"
            className="mb-4"
          />
          <Button onClick={() => console.log("Generate Portfolio")}>Generate Portfolio</Button>
        </CardContent>
      </Card>
      {projects.length > 0 && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Allocated Tons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p:Project) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
