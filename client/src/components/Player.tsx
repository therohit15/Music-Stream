import { useState, useEffect } from "react";
import { Controls } from "./Controls";
import { Card } from "@/components/ui/card";
import { YouTubePlayer } from "./YouTubePlayer";
import { PlaylistView } from "./PlaylistView";

export interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
}

interface PlayerProps {
  initialSong?: Song | null;
  playlist: Song[];
  setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
}

export function Player({ initialSong, playlist, setPlaylist }: PlayerProps) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (initialSong) {
      setCurrentSong(initialSong);
      setIsPlaying(true);
      setPlaylist((prev) => {
        if (!prev.some((s) => s.id === initialSong.id)) {
          return [...prev, initialSong];
        }
        return prev;
      });
      setCurrentIndex(playlist.length);
    }
  }, [initialSong, setPlaylist]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentSong(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  return (
    <Card className="p-8 flex flex-col items-center gap-8 bg-gray-100 dark:bg-gray-800 text-black dark:text-white transition-colors rounded-xl">
      <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        {currentSong ? (
          <img
            src={currentSong.thumbnailUrl}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-48 h-48 text-4xl text-muted-foreground rounded-full border border-black dark:border-white flex items-center justify-center">
            ♪
          </div>
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
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={currentIndex < playlist.length - 1}
        hasPrevious={currentIndex > 0}
      />

      <YouTubePlayer
        videoId={currentSong?.id}
        isPlaying={isPlaying}
        volume={volume}
      />
    </Card>
  );
}
