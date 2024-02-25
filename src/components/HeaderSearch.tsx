import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IForm {
  keyword: string;
}

function HeaderSearch() {
  const navigate = useNavigate();
  const inputAnimation = useAnimation();
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const keyword = data.keyword;
    navigate(`/search?keyword=${keyword}`, { state: { keyword } });
  };
  return (
    <form
      className="flex items-center justify-end mr-6"
      onSubmit={handleSubmit(onValid)}
    >
      <motion.input
        {...register("keyword", { required: true, minLength: 2 })}
        className="origin-right absolute right-15 bg-transparent border rounded-md p-2 pl-9 w-64 border-solid border-white"
        initial={{
          scaleX: 0,
        }}
        transition={{
          ease: "linear",
        }}
        animate={inputAnimation}
        placeholder="Search for movie or tv show..."
      />
      <motion.svg
        animate={{
          x: searchOpen ? -200 : 0,
        }}
        transition={{
          ease: "linear",
        }}
        whileTap={{
          scale: 1.5,
        }}
        onClick={toggleSearch}
        className="w-4 fill-white outline-0 relative hover:cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </motion.svg>
    </form>
  );
}

export default HeaderSearch;
