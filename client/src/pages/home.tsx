import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Player } from "@/components/Player";
import { PlaylistView } from "@/components/PlaylistView";
import type { Song } from "@/components/Player";

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setPlaylist((prev) => {
      if (!prev.some((s) => s.id === song.id)) {
        return [...prev, song];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="container p-4 flex-grow">
        <div className="max-w-3xl mx-auto space-y-8">
          <SearchBar onSongSelect={setCurrentSong} />
          <Player
            initialSong={currentSong}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
          <PlaylistView playlist={playlist} onSongSelect={setCurrentSong} />
        </div>
      </div>
      <div className="w-full border-t border-black dark:border-white">
        <footer className="py-4 text-center bg-gray-300 dark:bg-gray-800 border-t text-black dark:text-white">
          <a
            href="https://rohit-portfolio1.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Created by therohit
          </a>
        </footer>
      </div>
    </div>
  );
}
