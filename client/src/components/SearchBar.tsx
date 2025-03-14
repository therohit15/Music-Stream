import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const { data: results, isLoading } = useQuery({
    queryKey: ['/api/search', query],
    enabled: query.length > 2,
  });

  return (
    <div className="w-full space-y-4">
      <Input
        type="search"
        placeholder="Search for songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-lg"
      />
      
      {isLoading && (
        <div className="text-center">
          <span className="loading">Searching...</span>
        </div>
      )}

      {results && (
        <Card className="p-4">
          <ul className="space-y-2">
            {results.map((result: any) => (
              <li
                key={result.id}
                className="flex items-center gap-4 p-2 hover:bg-accent rounded-lg cursor-pointer"
                onClick={() => {
                  toast({
                    title: "Added to playlist",
                    description: result.title
                  });
                }}
              >
                <img
                  src={result.thumbnailUrl}
                  alt={result.title}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm text-muted-foreground">{result.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
