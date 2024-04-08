"use client";

import clsx from "clsx";
import { useState } from "react";

const Slider = ({ data }: { data: any }) => {
  const [active, setActive] = useState([1]);
  const [scroll, setScroll] = useState(true);

  const handleListener = (e) => {
    if (!scroll) {
      return;
    }

    const id = active[active.length - 1];
    if (e.deltaY < 0 && active.length > 1) {
      const update = active.slice(0, -1);
      setActive(update);
    } else if (e.deltaY > 0 && id < data.length) {
      setActive([...active, id + 1]);
    }

    setScroll(false);
    setTimeout(() => {
      setScroll(true);
    }, 500);
  };

  return (
    <div onWheel={handleListener} className="w-full h-screen relative">
      {data.map((d: any) => {
        return (
          <div
            key={d.id}
            className={clsx("w-full h-screen absolute top-0 duration-[1s]", {
              "translate-y-full": !active.includes(d.id),
            })}
            style={{ backgroundColor: d.color }}
          >
            {d.id}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
