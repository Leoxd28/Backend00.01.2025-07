import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/store/usePlayerStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore();

  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <footer className="h-20 sm:h-34 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between w-full items-center h-full max-w-[1800px] mx-auto">
        {/* playing song */}

        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* playback controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%] w-full">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400 hover:bg-zinc-900"
            >
              <Shuffle className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 hover:bg-zinc-900"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 hover:bg-zinc-900"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 hover:bg-zinc-900"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="w-4-h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 hover:bg-zinc-900"
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Slider Main control */}
          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">{formatTime(currentTime)}</div>

            <Slider
              defaultValue={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />

            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 hover:bg-zinc-900"
          >
            <Mic2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 hover:bg-zinc-900"
          >
            <ListMusic className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 hover:bg-zinc-900"
          >
            <Laptop2 className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 hover:bg-zinc-900"
            >
              <Volume1 className="w-4 h-4" />
            </Button>

            <Slider
              defaultValue={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
