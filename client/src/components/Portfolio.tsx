import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axiosInstance";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface Project {
  id: number;
  name: string;
  country: string;
  image: string;
  description: string;
  allocated: number;
}

export default function Portfolio() {
  const [requestedTons, setRequestedTons] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPortfolio = async () => {
    setLoading(true);
    setError("");
  
    // Simulate a delay before making the request
    setTimeout(async () => {
      try {
        const response = await axiosInstance.post("/portfolio/generate", {
          requestedTons: requestedTons,
        });
        setPortfolio(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to fetch portfolio: ${err.message}`);
        } else {
          setError("Failed to fetch portfolio");
        }
      } finally {
        setLoading(false);
      }
    }, 2000);
  };
  
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
          <Button onClick={fetchPortfolio} disabled={loading}>
            {loading ? "Generating..." : "Generate Portfolio"}
          </Button>
        </CardContent>
      </Card>
      {portfolio.length > 0 && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Allocated Tons</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((p: Project) => (
              <TableRow key={p.id}>
                <TableCell>
                  {" "}
                  <img
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={50}
                    className="rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.country}</TableCell>
                <TableCell>{p.allocated}</TableCell>
                <TableCell>{p.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
