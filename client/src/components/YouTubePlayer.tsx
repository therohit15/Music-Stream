import { useEffect, useRef } from 'react';
import Player from 'youtube-player';
import type { YouTubePlayer as YTPlayer } from 'youtube-player/dist/types';

interface YouTubePlayerProps {
  videoId?: string;
  onStateChange?: (event: { data: number }) => void;
  isPlaying?: boolean;
  volume?: number;
}

export function YouTubePlayer({ videoId, onStateChange, isPlaying, volume = 50 }: YouTubePlayerProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    playerRef.current = Player(containerRef.current, {
      width: '0',
      height: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
      },
    });

    if (onStateChange) {
      playerRef.current.on('stateChange', onStateChange);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!playerRef.current || !videoId) return;
    playerRef.current.loadVideoById(videoId);
  }, [videoId]);

  useEffect(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(volume);
  }, [volume]);

  return <div ref={containerRef} className="hidden" />;
}