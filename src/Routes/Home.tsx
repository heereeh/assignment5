import { useQuery } from "react-query";
import {
  getLatest,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../apis/movie";
import { motion } from "framer-motion";
import HomeBanner from "../components/HomeBanner";
import BoxRow from "../components/BoxRow";
import MovieDetail from "../components/MovieDetail";
import Latest from "../components/Latest";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IListItem } from "../models/common";

function Home() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );
  const [bannerData, setBannerData] = useState<IListItem>();
  useEffect(() => {
    if (data)
      setBannerData(
        data.results[Math.floor(Math.random() * data.results.length)]
      );
  }, [data]);
  const onOverlayClick = () => navigate("/");
  return (
    <>
      <div className="flex flex-col overflow-x-hidden">
        {isLoading ? (
          <motion.div
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="flex flex-auto text-white justify-center items-center text-xl"
          >
            LOADING
          </motion.div>
        ) : (
          <>
            <HomeBanner item={bannerData} />
            <div className="relative -top-56 space-y-7">
              <div>
                <Latest api={getLatest} queryKey={["movies", "Latest"]} />
              </div>
              <div>
                {data && (
                  <BoxRow
                    title="Popular on Netflix"
                    api={getNowPlayingMovies}
                  />
                )}
              </div>
              <div>
                <BoxRow title="Trending Now" api={getPopularMovies} isLong />
              </div>
              <div>
                <BoxRow title="Rop Rated" api={getTopRatedMovies} />
              </div>
              <div>
                <BoxRow title="Upcoming" api={getUpcomingMovies} />
              </div>
            </div>
          </>
        )}
      </div>
      <MovieDetail onOverlayClick={onOverlayClick} />
    </>
  );
}
export default Home;
