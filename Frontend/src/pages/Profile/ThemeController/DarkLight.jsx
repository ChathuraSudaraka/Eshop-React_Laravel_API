import React, { useState } from "react";
import useThemeSwitcher from "./useThemeSwitcher";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [themeTransition, setThemeTransition] = useState("");
  const [rotation, setRotation] = useState(0);

  const toggleTheme = () => {
    setThemeTransition("transition-all duration-500");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    setRotation((prevRotation) => prevRotation + 360); // Rotate by 360 degrees
  };

  return (
    <div className={`bg-slate-400 rounded-md ${themeTransition}`}>
      <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
        <button
          className={``}
          onClick={toggleTheme}
          style={{
            backgroundColor: mode === "dark" ? "darkblue" : "lightblue",
            borderColor: mode === "dark" ? "darkblue" : "lightblue",
            color: mode === "dark" ? "white" : "black",
            transition:
              "background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease",
            transform: `rotate(${rotation}deg)`, // Apply rotation here
          }}
        >
          {mode === "dark" ? <BsMoonFill /> : <BsSunFill />}
        </button>
      </div>
    </div>
  );
};

export default DarkLight;
