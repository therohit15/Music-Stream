import { useState, useEffect } from "react";
import { Controls } from "./Controls";
import { Card } from "@/components/ui/card";
import { YouTubePlayer } from "./YouTubePlayer";

export interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
}

interface PlayerProps {
  initialSong?: Song | null;
}

export function Player({ initialSong }: PlayerProps) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  useEffect(() => {
    if (initialSong) {
      setCurrentSong(initialSong);
      setIsPlaying(true);
      if (!playlist.find(s => s.id === initialSong.id)) {
        setPlaylist([...playlist, initialSong]);
      }
    }
  }, [initialSong]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (!playlist.find(s => s.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

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

      <Controls 
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        currentSong={currentSong}
      />

      <YouTubePlayer
        videoId={currentSong?.id}
        isPlaying={isPlaying}
        volume={volume}
      />
    </Card>
  );
}