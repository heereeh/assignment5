import { motion } from "framer-motion";
import useClickBox from "../composables/useClickBox";
import { IListItem } from "../models/common";
import { makeOriginalImagePath } from "../utils";

interface IProps {
  item?: IListItem;
}

function HomeBanner({ item }: IProps) {
  const title = "Banner";
  const onBoxClicked = useClickBox({ title });
  return (
    <div
      className="flex min-h-[700px] xl:min-h-[900px] flex-col justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0),rgb(17 24 39)), url(${makeOriginalImagePath(
          item?.backdrop_path ?? item?.poster_path ?? ""
        )})`,
      }}
    >
      <div className="pl-12">
        <div className="text-lg">
          <b className="text-primary">N</b> Series
        </div>
        {item && (
          <>
            <h2 className="text-6xl mb-5">{item.title ?? item.name}</h2>
            <div className="w-1/2 max-w-[40rem] line-clamp-3">
              {item.overview}
            </div>
            <div className="mt-3 space-x-2">
              <button className="primary self-start">Play</button>
              <motion.button
                layoutId={`${title}${item.id}`}
                className="secondary self-start"
                onClick={() => onBoxClicked(item.id)}
              >
                More Info
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeBanner;
