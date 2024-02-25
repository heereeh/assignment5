import { AnimatePresence, motion } from "framer-motion";
import { PathMatch, useLocation } from "react-router-dom";
import { ICommon } from "../models/common";
import { makeOriginalImagePath } from "../utils";
import { ReactNode, useEffect } from "react";

interface IProps {
  onOverlayClick: () => void;
  data: ICommon | null | undefined;
  isLoading: boolean;
  infoComponent: ReactNode;
  match: PathMatch | null;
  seasonComponent?: ReactNode;
}

function Detail({
  onOverlayClick,
  data,
  isLoading,
  match,
  infoComponent,
  seasonComponent,
}: IProps) {
  const location = useLocation();

  useEffect(() => {
    if (match) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [match]);

  return (
    <>
      <AnimatePresence>
        <>
          {match && (
            <motion.div
              className="fixed w-full h-full top-0 z-20 overflow-y-auto bg-black/75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="fixed top-0 w-full h-full"
                onClick={onOverlayClick}
              />
              <motion.div
                transition={{ duration: 0.2 }}
                layoutId={location.state?.layoutId}
                className="absolute w-4/5 min-h-[40rem] max-h-fit max-w-[60rem] rounded-lg z-10 my-8 bg-darker shadow-2xl shadow-black top-0 left-0 right-0 bottom-0 m-auto"
              >
                {isLoading ? (
                  <div className="text-center mt-10">Loading</div>
                ) : data ? (
                  <>
                    <div
                      className="w-full h-[450px] bg-center bg-cover rounded-t-lg"
                      style={{
                        backgroundImage: `url(${makeOriginalImagePath(
                          data.backdrop_path ?? data.poster_path
                        )})`,
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-b from-slate-800/30 from-30% to-slate-900 to-100%" />
                    </div>
                    <div className="absolute top-5 right-5">
                      <button
                        className="bg opacity-70 hover:opacity-100 fill-white rounded-full p-3.5 pt-3 w-10 h-10"
                        onClick={onOverlayClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                        </svg>
                      </button>
                    </div>
                    <div className="relative -top-40 px-24 text">
                      <h2 className="text-8xl">{data.title ?? data.name}</h2>
                      {data.tagline && (
                        <h4 className="mt-3 text-lg text-center font-serif text-slate-200">
                          " {data.tagline} "
                        </h4>
                      )}
                      <div className="flex mt-3 items-end space-x-3">
                        <button className="primary mt-4">Play</button>
                        <button className="round-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                          </svg>
                        </button>
                        <button className="round-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                          </svg>
                        </button>
                      </div>
                      {infoComponent}
                      <div className="flex mt-8">
                        <div>{data.overview}</div>
                      </div>
                      {seasonComponent}
                    </div>
                  </>
                ) : (
                  "Cannot find detail"
                )}
              </motion.div>
            </motion.div>
          )}
        </>
      </AnimatePresence>
    </>
  );
}

export default Detail;
