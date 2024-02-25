import { IEpisode } from "../models/tv";
import { make500ImagePath } from "../utils";

interface IProps {
  episode: IEpisode;
}

function TvEpisode({ episode }: IProps) {
  return (
    <>
      <div className="flex space-x-3 items-center">
        {episode.still_path ? (
          <img
            className="w-60 bg-cover bg-center rounded-md"
            src={make500ImagePath(episode.still_path)}
            alt=""
          />
        ) : (
          <div className="w-60 h-32 bg-slate-400 rounded-md" />
        )}
        <div className="flex flex-col space-y-1 flex-1">
          <div className="flex justify-between">
            <div className="text-base font-bold">{episode.name}</div>
            {episode.runtime && (
              <div className="text-base font-bold">{episode.runtime}m</div>
            )}
          </div>
          <div className="text-slate-400">{episode.air_date}</div>
          <div>{episode.overview}</div>
        </div>
      </div>
    </>
  );
}

export default TvEpisode;
