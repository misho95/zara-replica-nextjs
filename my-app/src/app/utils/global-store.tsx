import { create } from "zustand";

type useTextColorType = {
  textColor: "white" | "black";
  colorChange: (arg: "white" | "black") => void;
};

export const useTextColor = create<useTextColorType>((set) => ({
  textColor: "white",
  colorChange: (arg) => set({ textColor: arg }),
}));
