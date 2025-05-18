import { useEffect, useState } from "react";
import "./Toggle.css";

const ToggleTheme = () => {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {   
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    setTheme(document.body.getAttribute("data-theme") || "light")
  }, [])

  useEffect(() => {   
    document.cookie = `theme=${theme}; path=/`;
    document.body.setAttribute("data-theme", theme ? theme : "light");
  }, [theme])

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <label htmlFor="check" className="checkmark-label"></label>
    </div>
  );
};

export default ToggleTheme;
