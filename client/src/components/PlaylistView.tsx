import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Song } from "./Player";

interface PlaylistViewProps {
  playlist?: Song[];
  onSongSelect?: (song: Song) => void;
}

export function PlaylistView({ playlist = [], onSongSelect }: PlaylistViewProps) {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Up Next</h2>
      <ScrollArea className="h-48">
        <div className="space-y-2">
          {playlist.length > 0 ? (
            playlist.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-2 hover:bg-accent rounded-lg cursor-pointer"
                onClick={() => onSongSelect?.(song)}
              >
                <img
                  src={song.thumbnailUrl}
                  alt={song.title}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No songs in playlist
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}