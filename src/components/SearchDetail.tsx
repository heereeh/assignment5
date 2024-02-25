import { useNavigate, useSearchParams } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import TvDetail from "./TvDetail";

function SearchDetail() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const keyword = params.get("keyword");

  const onOverlayClick = () => navigate(`/search?keyword=${keyword}`);

  return (
    <>
      <MovieDetail onOverlayClick={onOverlayClick} />
      <TvDetail onOverlayClick={onOverlayClick} />
    </>
  );
}

export default SearchDetail;
