import { SearchBar } from "@/components/SearchBar";
import { Player } from "@/components/Player";
import { PlaylistView } from "@/components/PlaylistView";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <SearchBar />
        <Player />
        <PlaylistView />
      </div>
    </div>
  );
}
