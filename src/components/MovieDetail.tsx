import { matchPath, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieById } from "../apis/movie";
import Detail from "./Detail";

interface IProps {
  onOverlayClick: () => void;
}

function MovieDetail({ onOverlayClick }: IProps) {
  const location = useLocation();
  const bigMovieMatch = matchPath(
    { path: "/:path/:movieId" },
    location.pathname
  );
  const searchMatch = matchPath(
    { path: "/:search/movie/:movieId" },
    location.pathname
  );

  const { data, isLoading } = useQuery(
    ["movie", bigMovieMatch?.params.movieId ?? searchMatch?.params.movieId],
    () =>
      getMovieById(bigMovieMatch?.params.movieId ?? searchMatch?.params.movieId)
  );

  return (
    <>
      <Detail
        onOverlayClick={onOverlayClick}
        isLoading={isLoading}
        data={data}
        match={bigMovieMatch ?? searchMatch}
        infoComponent={
          <>
            {data && (
              <div className="flex space-x-2 mt-7 items-center">
                {data.vote_average > 0 && (
                  <div className="text-green-500">
                    {(data.vote_average * 10).toFixed(0)}%
                  </div>
                )}
                <div className="text-slate-300">
                  {(data.release_date ?? "").slice(0, 4)}
                </div>
                {data.runtime > 0 && (
                  <div className="text-slate-300">
                    {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                  </div>
                )}
                <div className="text-lg">
                  {(data.genres ?? []).map((genre) => (
                    <span
                      className="bg-lighter rounded-md px-2 ml-1"
                      key={genre.id}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        }
      />
    </>
  );
}

export default MovieDetail;
