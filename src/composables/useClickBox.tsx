import {
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

interface IProps {
  title: string;
  type?: "movie" | "tv";
}

function useClickBox({ title, type }: IProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const keyword = params.get("keyword");

  const match = matchPath({ path: "/:path" }, location.pathname);
  const homeMatch = matchPath({ path: "/" }, location.pathname);

  return (id: number) => {
    navigate(
      `/${homeMatch ? "movies" : match?.params.path}/${
        match?.params.path === "search" && type ? type + "/" : ""
      }${id}${keyword ? "?keyword=" + keyword : ""}`,
      {
        state: { layoutId: title + String(id) },
      }
    );
  };
}

export default useClickBox;
