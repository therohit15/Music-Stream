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

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/search", query],
    enabled: query.length > 2,
    queryFn: async () => {
      const searchUrl = `/api/search?q=${encodeURIComponent(query)}`;
      console.log("Making search request to:", searchUrl);

      const response = await fetch(searchUrl);
      console.log("Search response status:", response.status);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Network error" }));
        console.error("Search error response:", errorData);
        throw new Error(errorData.message || "Failed to search");
      }

      const data = await response.json();
      console.log("Search results:", data);

      if (!Array.isArray(data)) {
        throw new Error("Invalid search results format");
      }

      return data;
    },
    retry: false,
  });

  return (
    <div className="w-full space-y-4 ">
      <Input
        type="search"
        placeholder="Search for songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-xl transition-colors"
      />

      {isLoading && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <span className="loading">Searching...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 dark:text-red-400">
          {error instanceof Error
            ? error.message
            : "Failed to search. Please try again."}
        </div>
      )}

      {query.length > 0 && !isLoading && results?.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No songs found matching "{query}"
        </div>
      )}

      {results && results.length > 0 && (
        <Card className="p-4 bg-gray-50 dark:bg-gray-900 transition-colors rounded-xl">
          <ul className="space-y-2">
            {results.map((result) => (
              <li
                key={result.id}
                className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => {
                  onSongSelect?.(result);
                  toast({
                    title: "Added to playlist",
                    description: result.title,
                  });
                }}
              >
                <img
                  src={result.thumbnailUrl}
                  alt={result.title}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {result.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {result.artist}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
