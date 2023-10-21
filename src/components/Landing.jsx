import { useState } from "react";
import Editor from "@monaco-editor/react";
import "../App.css";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  // State to hold the code value and lock/unlock status
  const [value, setValue] = useState(code || "");
  const [isLocked, setIsLocked] = useState(false);

  // Handle code changes in the editor
  const handleEditorChange = (newValue) => {
    // Update the value only if the editor is not locked
    if (!isLocked) {
      setValue(newValue);
      onChange("code", newValue); // Notify the parent component about the code change
    }
  };

  // Handle the "Copy" button click
  const handleCopyClick = () => {
    if (!isLocked) {
      // Copy the code to the clipboard
      navigator.clipboard.writeText(value);
      alert("Code copied to clipboard!");
    }
  };

  // Handle the "Save" button click
  const handleSaveClick = () => {
    //Save functionality to save code locally
    alert("Code saved!");
  };

  // Handle the "Lock/Unlock" button click
  const handleLockClick = () => {
    // Toggle the locked state
    setIsLocked(!isLocked);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl code-editor">
      <div className="code-editor__header">
        <button className="code-editor__button" onClick={handleCopyClick}>
          Copy
        </button>
        <button className="code-editor__button" onClick={handleSaveClick}>
          Save
        </button>
        <button
          className={`code-editor__button code-editor__button--${
            isLocked ? "locked" : "unlocked"
          }`}
          onClick={handleLockClick}
        >
          {isLocked ? "Unlock" : "Lock"}
        </button>
      </div>
      <Editor
        height="85vh" // Set the editor's height
        width="100%" // Set the editor's width
        language={language || "javascript"} // Set the code language
        value={value} // Set the code content
        theme={theme} // Set the editor theme
        defaultValue="// some comment" // Default code when empty
        onChange={handleEditorChange} // Handle code changes
        options={{
          readOnly: isLocked, // Set the editor to read-only mode if it's locked
        }}
      />
    </div>
  );
};

export default CodeEditorWindow;
