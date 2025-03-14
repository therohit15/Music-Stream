import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Player } from "@/components/Player";
import { PlaylistView } from "@/components/PlaylistView";
import type { Song } from "@/components/Player";

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container p-4 flex-grow">
        <div className="max-w-3xl mx-auto space-y-8">
          <SearchBar onSongSelect={setCurrentSong} />
          <Player initialSong={currentSong} />
          <PlaylistView />
        </div>
      </div>

      <footer className="py-4 text-center border-t">
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
  );
}