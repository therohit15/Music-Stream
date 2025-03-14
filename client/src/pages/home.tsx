import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Player } from "@/components/Player";
import { PlaylistView } from "@/components/PlaylistView";
import type { Song } from "@/components/Player";

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <div className="container p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <SearchBar onSongSelect={setCurrentSong} />
        <Player initialSong={currentSong} />
        <PlaylistView />
      </div>
    </div>
  );
}