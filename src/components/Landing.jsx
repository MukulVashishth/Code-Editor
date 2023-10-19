import { useState } from "react";
import Editor from "@monaco-editor/react";
import "../App.css";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const [isLocked, setIsLocked] = useState(false);

  const handleEditorChange = (value) => {
    if (!isLocked) {
      setValue(value);
      onChange("code", value);
    }
  };

  const handleCopyClick = () => {
    if (!isLocked) {
      navigator.clipboard.writeText(value);
      alert("Code copied to clipboard!");
    }
  };

  const handleSaveClick = () => {
    // You can implement save functionality here.
    // This can involve sending the code to a server or saving it locally.
    alert("Code saved!");
  };

  const handleLockClick = () => {
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
        height="85vh"
        width="100%"
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        options={{
          readOnly: isLocked,
        }}
      />
    </div>
  );
};

export default CodeEditorWindow;
