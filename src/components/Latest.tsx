import { useQuery } from "react-query";
import { IListItem } from "../models/common";
import { make500ImagePath } from "../utils";
import { motion } from "framer-motion";
import useClickBox from "../composables/useClickBox";

interface IProps {
  queryKey: string[];
  api: () => Promise<IListItem>;
}

function Latest({ queryKey, api }: IProps) {
  const title = "Latest";
  const { data, isLoading } = useQuery(queryKey, api);
  const onBoxClicked = useClickBox({ title });
  return (
    <>
      {!isLoading && data && (
        <div className="px-12">
          <div className="text-base font-semibold mb-3">Latest</div>
          <div className="flex space-x-3">
            <div className="w-60 h-32">
              {data.backdrop_path || data.poster_path ? (
                <div
                  className="w-full h-full bg-center bg-cover rounded-md"
                  style={{
                    backgroundImage: `url(${make500ImagePath(
                      data.backdrop_path ?? data.poster_path
                    )})`,
                  }}
                />
              ) : (
                <div className="w-full h-full bg-slate-400" />
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3>{data.title ?? data.name}</h3>
              <div>{data.overview}</div>
              <div className="mt-3 space-x-2">
                <button className="primary self-start">Play</button>
                <motion.button
                  layoutId={`${title}${data.id}`}
                  className="secondary self-start"
                  onClick={() => onBoxClicked(data.id)}
                >
                  More Info
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Latest;
