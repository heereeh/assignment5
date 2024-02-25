import { motion } from "framer-motion";
import HomeBanner from "../components/HomeBanner";
import BoxRow from "../components/BoxRow";
import {
  getAiringToday,
  getLatest,
  getOnTheAir,
  getPopular,
  getTopRated,
} from "../apis/tv";
import { useQuery } from "react-query";
import TvDetail from "../components/TvDetail";
import Latest from "../components/Latest";
import { useNavigate } from "react-router-dom";
import { IListItem } from "../models/common";
import { useEffect, useState } from "react";

function TV() {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/tv");

  const { data, isLoading } = useQuery(["tv", "Popular"], getPopular);
  const [bannerData, setBannerData] = useState<IListItem>();
  useEffect(() => {
    if (data)
      setBannerData(
        data.results[Math.floor(Math.random() * data.results.length)]
      );
  }, [data]);
  return (
    <>
      <div className="lex flex-col overflow-x-hidden">
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
                <Latest api={getLatest} queryKey={["tv", "Latest"]} />
              </div>
              <div>
                {data && <BoxRow title="Airing Today" api={getAiringToday} />}
              </div>
              <div>
                <BoxRow title="On the Air" api={getOnTheAir} isLong />
              </div>
              <div>
                <BoxRow title="Rop Rated" api={getTopRated} />
              </div>
              <div>
                <BoxRow title="Popular" api={getPopular} />
              </div>
            </div>
          </>
        )}
      </div>
      <TvDetail onOverlayClick={onOverlayClick} key="detail" />
    </>
  );
}
export default TV;
