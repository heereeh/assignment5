import { useQuery } from "react-query";
import { matchPath, useLocation } from "react-router-dom";
import { getTvById } from "../apis/tv";
import Detail from "./Detail";
import { make500ImagePath } from "../utils";
import TvEpisode from "./TvEpisode";

interface IProps {
  onOverlayClick: () => void;
}

function TvDetail({ onOverlayClick }: IProps) {
  const location = useLocation();
  const match = matchPath({ path: "/:path/:tvId" }, location.pathname);
  const searchMatch = matchPath(
    { path: "/:search/tv/:tvId" },
    location.pathname
  );

  const { data, isLoading } = useQuery(
    ["tv", match?.params.tvId ?? searchMatch?.params.tvId],
    () => getTvById(match?.params.tvId ?? searchMatch?.params.tvId)
  );

  return (
    <>
      <Detail
        onOverlayClick={onOverlayClick}
        isLoading={isLoading}
        data={data}
        match={match ?? searchMatch}
        infoComponent={
          <>
            {data && (
              <div className="flex space-x-2 mt-7 items-center">
                <div className="text-green-500">
                  {(data.vote_average * 10).toFixed(0)}%
                </div>
                <div className="text-slate-300">
                  {(data.last_air_date ?? data.air_date ?? "").slice(0, 4)}
                </div>
                <div className="text-slate-300">
                  {data.number_of_seasons} Seasons
                </div>
                {data.genres && (
                  <div className="text-lg">
                    {data.genres.map((genre) => (
                      <span
                        className="bg-lighter rounded-md px-2 ml-1"
                        key={genre.id}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        }
        seasonComponent={
          <>
            <h2 className="mt-8 text-xl font-bold">Last Episodes</h2>
            <div className="flex flex-col space-y-3 mt-3">
              {data?.last_episode_to_air && (
                <TvEpisode episode={data.last_episode_to_air} />
              )}
              {data?.next_episode_to_air && (
                <TvEpisode episode={data.next_episode_to_air} />
              )}
            </div>
            <h2 className="mt-8 text-xl font-bold">Seasons</h2>
            <div className="flex flex-wrap space-x-2">
              {data?.seasons &&
                data.seasons.map((season) => (
                  <div className="w-36 text-center mt-3" key={season.id}>
                    {season.poster_path ? (
                      <img
                        className="w-36 h-52 bg-cover bg-center rounded-sm"
                        src={make500ImagePath(season.poster_path)}
                        alt=""
                      />
                    ) : (
                      <div className="w-36 h-52 bg-slate-400 rounded-sm" />
                    )}
                    <div className="font-bold mt-1.5">{season.name}</div>
                    <div className="text-slate-300">{season.air_date}</div>
                  </div>
                ))}
            </div>
          </>
        }
      />
    </>
  );
}

export default TvDetail;
