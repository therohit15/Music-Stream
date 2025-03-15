import { SiYoutube } from "react-icons/si";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 bg-gray-300 dark:bg-gray-800 transition-colors">
        <div className="flex items-center gap-2">
          <SiYoutube className="h-8 w-8 text-black dark:text-white" />
          <span className="text-2xl font-bold text-black dark:text-white">
            DevPlayer
          </span>
        </div>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
