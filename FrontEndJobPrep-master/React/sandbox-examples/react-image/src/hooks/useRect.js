import React, { useState, useEffect } from "react";
import { debounce } from "mini-debounce";

const useRect = () => {
  const ref = React.useRef();

  const [rect, setRect] = useState({});

  const setRectWrapper = () => {
    // console.log("Resizing");
    setRect(ref && ref.current ? ref.current.getBoundingClientRect() : {});
  };

  useEffect(() => {
    setRectWrapper();
    let debouncedSetRect = debounce(setRectWrapper, 500);
    window.addEventListener("resize", debouncedSetRect);

    return () => {
      window.removeEventListener("resize", debouncedSetRect);
    };
  }, []);

  return [rect, ref];
};

export default useRect;
