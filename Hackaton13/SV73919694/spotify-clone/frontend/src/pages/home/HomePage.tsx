import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
// import { usePlayerStore } from "@/store/usePlayerStore";
// import { Song } from "@/types";
import FeaturedSection from "./components/FeaturedSection";
import { useEffect } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useMusicStore } from "@/store/useMusicStore";
import Topbar from "@/components/Topbar";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900 bg-red-500">
      {/* Header o TOPBAT */}
      <Topbar />

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1>Bienvenido a SpotifyClone</h1>

          {/* Features */}
          <FeaturedSection />

          {/* Grid */}
          <div className="space-y-8">
            <SectionGrid
              title="Para ti"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Tendencias"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
