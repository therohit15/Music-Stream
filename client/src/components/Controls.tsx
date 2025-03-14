import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipBack, SkipForward,
  Volume2, Volume1, VolumeX
} from "lucide-react";

interface ControlsProps {
  currentSong: any;
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function Controls({ 
  currentSong, 
  isPlaying, 
  onPlayPause, 
  volume, 
  onVolumeChange,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: ControlsProps) {
  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          disabled={!hasPrevious}
          onClick={onPrevious}
          className="text-foreground hover:bg-accent disabled:text-muted-foreground"
        >
          <SkipBack className="h-6 w-6" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 bg-foreground text-background hover:bg-foreground/90"
          disabled={!currentSong}
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          disabled={!hasNext}
          onClick={onNext}
          className="text-foreground hover:bg-accent disabled:text-muted-foreground"
        >
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <VolumeIcon className="h-4 w-4 text-foreground" />
        <Slider
          value={[volume]}
          onValueChange={([v]) => onVolumeChange(v)}
          max={100}
          step={1}
          className="[&>span]:bg-foreground"
        />
      </div>
    </div>
  );
}