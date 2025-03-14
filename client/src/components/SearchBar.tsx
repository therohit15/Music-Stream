import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Song } from "./Player";

interface SearchBarProps {
  onSongSelect?: (song: Song) => void;
}

export function SearchBar({ onSongSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const { data: results, isLoading, error } = useQuery({
    queryKey: ['/api/search', query],
    enabled: query.length > 2,
    queryFn: async () => {
      const searchUrl = `/api/search?q=${encodeURIComponent(query)}`;
      console.log('Making search request to:', searchUrl);

      const response = await fetch(searchUrl);
      console.log('Search response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Search error response:', errorData);
        throw new Error(errorData.message || 'Failed to search');
      }

      const data = await response.json();
      console.log('Search results:', data);
      return data;
    },
    retry: false,
    onError: (error) => {
      console.error('Search error:', error);
      toast({
        variant: "destructive",
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search songs"
      });
    }
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
        <div className="text-center text-muted-foreground">
          <span className="loading">Searching...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-destructive">
          {error instanceof Error ? error.message : 'Failed to search. Please try again.'}
        </div>
      )}

      {query.length > 0 && !isLoading && results?.length === 0 && (
        <div className="text-center text-muted-foreground">
          No songs found matching "{query}"
        </div>
      )}

      {results && results.length > 0 && (
        <Card className="p-4">
          <ul className="space-y-2">
            {results.map((result) => (
              <li
                key={result.id}
                className="flex items-center gap-4 p-2 hover:bg-accent rounded-lg cursor-pointer"
                onClick={() => {
                  if (onSongSelect) {
                    onSongSelect(result);
                  }
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