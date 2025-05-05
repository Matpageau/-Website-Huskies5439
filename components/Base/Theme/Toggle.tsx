import "./Toggle.css";

// Define the prop types
interface ToggleProps {
  handleChange: () => void;
  isChecked: "dark" | "light";  // Add this to control the checked state
}

const Toggle = ({ handleChange, isChecked }: ToggleProps) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked === "dark"}
      />
      <label htmlFor="check"></label>
    </div>
  );
};

export default Toggle;
