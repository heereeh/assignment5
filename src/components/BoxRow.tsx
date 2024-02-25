import { AnimatePresence, Variants, motion } from "framer-motion";
import useWindowDimensions from "../composables/useWindowDimensions";
import { useState } from "react";
import { IListResult } from "../models/common";
import { useQuery } from "react-query";
import Box from "./Box";
import BoxRowArrow from "./BoxRowArrow";

interface IProps {
  title: string;
  api: () => Promise<IListResult>;
  isLong?: boolean;
}
const OFFSET = 6;

function BoxRow({ title, api, isLong = false }: IProps) {
  const { data, isLoading } = useQuery(["movies", title], api);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [isRight, setIsRight] = useState(true);

  const increaseIndex = (isRight: boolean) => {
    if (leaving) return;
    toggleLeaving();
    setIsRight(isRight);
    if (isRight)
      setIndex((prev) =>
        prev + 2 * OFFSET <= data!.results.length ? prev + OFFSET : 0
      );
    else
      setIndex((prev) =>
        prev - OFFSET >= 0 ? prev - OFFSET : data!.results.length - OFFSET
      );
  };
  const width = useWindowDimensions();

  const increaseVariants: Variants = {
    initial: (isRight: boolean) => ({
      x: width * (isRight ? 1 : -1) + 5,
    }),
    animate: {
      x: 0,
    },
    exit: (isRight: boolean) => ({
      x: -width * (isRight ? 1 : -1) - 5,
    }),
  };

  return (
    <>
      <div
        className={`group/row flex flex-col relative ${
          isLong ? "h-[20rem] 2xl:h-[40rem]" : "h-[12rem] 2xl:h-[15rem]"
        }`}
      >
        <div className="pl-12 text-base font-semibold mb-3">{title}</div>
        {!isLoading && data && (
          <>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={isRight}
              mode="popLayout"
            >
              <motion.div
                variants={increaseVariants}
                custom={isRight}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
                exit="exit"
                key={index}
                className={`w-full flex-auto grid grid-cols-6 gap-2 h-full`}
              >
                {data.results.slice(index, index + OFFSET).map((item, idx) => (
                  <Box
                    item={item}
                    idx={idx}
                    OFFSET={OFFSET}
                    key={item.id}
                    title={title}
                    isLong={isLong}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
            <BoxRowArrow increaseIndex={increaseIndex} />
          </>
        )}
      </div>
    </>
  );
}

export default BoxRow;
