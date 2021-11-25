import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value); //const setText: (value: React.SetStateAction<string>) =>

  const handleKeyDown = (e) => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim();
    if (e.which === 13 && trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch({ type: "todos/todoAdded", payload: trimmedText });
      // And clear out the text input
      setText("");
    }
  };

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="Writing it down... doesn't mean I'll do it"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};

export default Header;
