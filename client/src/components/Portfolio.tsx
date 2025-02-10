import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axiosInstance";

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

export default function Portfolio() {
  const [requestedTons, setRequestedTons] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPortfolio = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post("/portfolio/generate", {
        requestedTons: requestedTons,
      });
      console.log(response.data);
      
      //setPortfolio(response.data);
    } catch (err) {
      setError("Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
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
          <Button onClick={fetchPortfolio}>Generate Portfolio</Button>
        </CardContent>
      </Card>
      {portfolio.length > 0 && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Allocated Tons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((p:Project) => (
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
