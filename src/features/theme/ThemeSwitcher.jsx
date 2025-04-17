import { useState } from "react";
import { useTheme } from "../../features/theme/context/ThemeContext";
import { Settings, Sun, Moon } from "lucide-react";

const ThemeSwitcher = () => {
  const [showOptions, setShowOptions] = useState(false);

  const { theme, dispatch } = useTheme();

  const switchTheme = (mode) => {
    dispatch({ type: "TOGGLE" });

    setShowOptions(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {showOptions && (
          <div className="absolute bottom-14 right-0 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg flex space-x-2">
            <button
              onClick={() => switchTheme("light")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Light Mode"
            >
              <Sun className="text-yellow-500 w-5 h-5" />
            </button>
            <button
              onClick={() => switchTheme("dark")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Dark Mode"
            >
              <Moon className="text-gray-900 dark:text-gray-100 w-5 h-5" />
            </button>
          </div>
        )}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-md hover:scale-110 transition-transform"
          title="Theme Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
