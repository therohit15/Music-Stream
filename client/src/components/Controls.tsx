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
          className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
        >
          <SkipBack className="h-6 w-6" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground"
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
          className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
        >
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <VolumeIcon className="h-4 w-4 text-primary dark:text-primary" />
        <Slider
          value={[volume]}
          onValueChange={([v]) => onVolumeChange(v)}
          max={100}
          step={1}
          className="[&>span]:bg-primary [&>span]:dark:bg-primary"
        />
      </div>
    </div>
  );
}