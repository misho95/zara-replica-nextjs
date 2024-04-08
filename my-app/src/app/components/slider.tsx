"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTextColor } from "../utils/global-store";

const Slider = ({ data }: { data: any }) => {
  const [active, setActive] = useState([1]);
  const [time, setTime] = useState<any>(null);
  const [infinite, setInfinite] = useState(false);
  const refs = useRef<any>({});
  const { colorChange } = useTextColor();

  const handleListener = (e: any) => {
    setInfinite(true);
    if (infinite) {
      clearTimeout(time);
    }

    setTime(
      setTimeout(() => {
        setInfinite(false);
      }, 100)
    );

    if (!infinite) {
      const id = active[active.length - 1];
      if (e.deltaY < 0 && active.length > 1) {
        const update = active.slice(0, -1);
        setActive(update);
      } else if (e.deltaY > 0 && id < data.length) {
        setActive([...active, id + 1]);
      }
    }
  };

  const handleTextColorChange = (id: number) => {
    const img = refs.current[id];
    if (img) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      // Draw the image on the canvas
      context.drawImage(img, 0, 0, img.width, img.height);

      // Get the pixel data of the top-left corner
      const pixelData = context.getImageData(0, 0, 1, 1).data;

      // Calculate luminance
      const luminance =
        0.2126 * pixelData[0] + 0.7152 * pixelData[1] + 0.0722 * pixelData[2];

      // Determine text color based on luminance
      colorChange(luminance > 128 ? "black" : "white");
    }
  };

  useEffect(() => {
    handleTextColorChange(active[active.length - 1]);
  }, [active]);

  return (
    <div onWheel={handleListener} className="w-full h-screen relative">
      {data.map((d: any) => {
        return (
          <div
            key={d.id}
            className={clsx("w-full h-screen absolute top-0 duration-[0.5s]", {
              "translate-y-full": !active.includes(d.id),
            })}
          >
            <Image
              ref={(el) => {
                refs.current[d.id] = el;
              }}
              src={d.url}
              className="w-full h-full object-cover pointer-events-none"
              alt="women-poster"
              width={1920}
              height={1088}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
