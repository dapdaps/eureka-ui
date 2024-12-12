import { useEffect, useRef, useState } from 'react';

interface UseInteractiveSoundOptions {
  loop?: boolean;
  volume?: number;
  autoPlay?: boolean;
}

export const useInteractiveSound = (audioPath: string, options?: UseInteractiveSoundOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(audioPath);

    if (options?.loop) {
      audioRef.current.loop = true;
    }

    if (options?.volume !== undefined) {
      audioRef.current.volume = options.volume;
    }

    const enableAutoPlay = () => {
      if (options?.autoPlay) {
        playSound();
      }
      document.removeEventListener('click', enableAutoPlay);
      document.removeEventListener('keydown', enableAutoPlay);
    };

    document.addEventListener('click', enableAutoPlay);
    document.addEventListener('keydown', enableAutoPlay);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', enableAutoPlay);
      document.removeEventListener('keydown', enableAutoPlay);
    };
  }, [audioPath, options?.loop, options?.volume, options?.autoPlay]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error('Audio playback failed:', error));
    }
  };

  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return { playSound, pauseSound, isPlaying };
};
