import { Variants, motion } from "framer-motion";
import { IListItem } from "../models/common";
import { make500ImagePath } from "../utils";
import useClickBox from "../composables/useClickBox";

interface IProps {
  title: string;
  item: IListItem;
  idx: number;
  OFFSET: number;
  isLong?: boolean;
  type?: "movie" | "tv";
}

function Box({ title, item, idx, OFFSET, isLong = false, type }: IProps) {
  const boxVariants: Variants = {
    normal: {
      scale: 1,
    },
    hover: (idx) => ({
      scale: 1.5,
      x: ((OFFSET - 1) / 2 - idx) * 35,
      y: -30,
      zIndex: 10,
      transition: {
        delay: 0.3,
        duration: 0.2,
        type: "tween",
      },
    }),
  };

  const infoVariants: Variants = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.2,
        type: "tween",
      },
    },
  };

  const onBoxClicked = useClickBox({ title, type });

  return (
    <>
      <motion.div
        className="relative rounded-md bg-cover bg-center hover:shadow-md hover:shadow-black cursor-pointer bg-slate-400"
        key={item.id}
        custom={idx}
        layoutId={title + String(item.id)}
        variants={boxVariants}
        initial="normal"
        whileHover="hover"
        transition={{ type: "tween", duration: 0.2 }}
        style={{
          backgroundImage: `url(${make500ImagePath(
            (isLong ? item.poster_path : item.backdrop_path) ?? item.poster_path
          )})`,
        }}
        onClick={() => onBoxClicked(item.id)}
      >
        {!isLong && (
          <>
            {item.backdrop_path || item.poster_path ? (
              <motion.div
                key={item.id}
                className="absolute w-full opacity-0 bottom-0 bg-gradient-to-b from-transparent from-20% to-black/90 rounded-b-md"
                variants={infoVariants}
              >
                <h4 className="text-center text-xs py-5 px-2">
                  {item.title ?? item.name}
                </h4>
              </motion.div>
            ) : (
              <div className="absolute bottom-0 text-center w-full px-3 py-5">
                {item.title ?? item.name}
              </div>
            )}
          </>
        )}
      </motion.div>
    </>
  );
}

export default Box;
