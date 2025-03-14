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

  const { data: results, isLoading } = useQuery<Song[]>({
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