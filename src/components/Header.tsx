import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { motion, useAnimation, useScroll } from "framer-motion";
import HeaderSearch from "./HeaderSearch";
import { useEffect } from "react";

interface IMenu {
  label: string;
  link: string;
}

function Header() {
  const menus: IMenu[] = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "TV Shows",
      link: "/tv",
    },
  ];
  const { pathname } = useLocation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() < 80) {
        navAnimation.start("initial");
      } else {
        navAnimation.start("animate");
      }
    });
  }, []);
  const navVariants = {
    initial: {
      backgroundColor: "rgba(220 38 38, 0)",
    },
    animate: {
      backgroundColor: "rgba(220 38 38, 1)",
    },
  };
  return (
    <motion.nav
      variants={navVariants}
      animate={navAnimation}
      transition={{ duration: 0.2 }}
      className="fixed w-full top-0 px-12 py-4 text-xs flex justify-between items-center z-10"
    >
      <div className="w-24 flex justify-center">
        <Logo />
      </div>
      <ul className="flex-1 mx-10 flex items-center space-x-5 text-darker">
        {menus.map((menu) => (
          <Link
            to={menu.link}
            key={menu.link}
            className="relative hover:text-white hover:cursor-pointer transition flex justify-center items-center flex-col"
          >
            {menu.label}
            {pathname === menu.link ? (
              <motion.div
                layoutId="menu-circle"
                className="absolute -bottom-1.5 rounded-full w-1 h-1 bg-white mt-0.5"
              />
            ) : null}
          </Link>
        ))}
      </ul>
      <div>
        <HeaderSearch />
      </div>
    </motion.nav>
  );
}
export default Header;
