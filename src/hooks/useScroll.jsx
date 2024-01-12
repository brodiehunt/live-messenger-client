import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    scrollToTop();

    return () => {
      scrollToTop();
    };
  }, [location]);
};

export default useScroll;
