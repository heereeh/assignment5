import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchMovies, searchTvs } from "../apis/search";
import Box from "../components/Box";
import SearchDetail from "../components/SearchDetail";

const OFFSET = 6;

function Search() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword");

  const SEARCH_MOVIES = "search-movies";
  const SEARCH_TVS = "search-tvs";

  const useMultipleQuery = () => {
    const movies = useQuery([SEARCH_MOVIES, keyword], () =>
      keyword ? searchMovies(keyword) : null
    );
    const tvs = useQuery([SEARCH_TVS, keyword], () =>
      keyword ? searchTvs(keyword) : null
    );
    return [movies, tvs];
  };

  const [
    { isLoading: loadingMovies, data: movies },
    { isLoading: loadingTvs, data: tvs },
  ] = useMultipleQuery();

  return (
    <>
      <div className="px-12 pt-16">
        <h3 className="text-xl my-3">Movies</h3>
        {loadingMovies ? (
          "Loading"
        ) : movies?.results.length ? (
          <div
            style={{
              height: `${10 * Math.floor(movies.results.length / 6 + 1)}rem`,
            }}
          >
            <div className={`w-full h-full grid grid-cols-6 gap-2`}>
              {movies.results.map((movie, idx) => (
                <Box
                  key={movie.id}
                  item={movie}
                  idx={idx % OFFSET}
                  title={SEARCH_MOVIES}
                  OFFSET={OFFSET}
                  type="movie"
                />
              ))}
            </div>
          </div>
        ) : (
          "Nothing to show"
        )}
      </div>
      <div className="px-12 py-8 flex flex-col relative">
        <h3 className="text-xl my-3">TV Shows</h3>
        {loadingTvs ? (
          "Loading"
        ) : tvs?.results.length ? (
          <div
            style={{
              height: `${10 * Math.floor(tvs.results.length / 6 + 1)}rem`,
            }}
          >
            <div className={`w-full h-full grid grid-cols-${OFFSET} gap-2`}>
              {tvs.results.map((tv, idx) => (
                <Box
                  key={tv.id}
                  item={tv}
                  idx={idx % OFFSET}
                  title={SEARCH_MOVIES}
                  OFFSET={OFFSET}
                  type="tv"
                />
              ))}
            </div>
          </div>
        ) : (
          "Nothing to Show"
        )}
      </div>
      <SearchDetail />
    </>
  );
}
export default Search;
