import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PlaylistView() {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Up Next</h2>
      <ScrollArea className="h-48">
        <div className="space-y-2">
          {/* Playlist items will go here */}
          <div className="text-center text-muted-foreground">
            No songs in playlist
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
