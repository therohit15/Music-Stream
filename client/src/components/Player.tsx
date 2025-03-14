import { useState } from "react";
import { Controls } from "./Controls";
import { Card } from "@/components/ui/card";

export function Player() {
  const [currentSong, setCurrentSong] = useState<any>(null);

  return (
    <Card className="p-8 flex flex-col items-center gap-8">
      <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        {currentSong ? (
          <img
            src={currentSong.thumbnailUrl}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl text-muted-foreground">♪</div>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {currentSong?.title || "No song playing"}
        </h2>
        <p className="text-muted-foreground">
          {currentSong?.artist || "Select a song to play"}
        </p>
      </div>

      <Controls currentSong={currentSong} />
    </Card>
  );
}
