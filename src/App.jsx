import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Note: useCallback hook will be use to memorize/cache the function because it will not re-render function only render on dependecies we mentioned
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    //if number is selected
    if (numberAllowed) {
      string += "0123456789";
    }
    // if special character is allowed
    if (charAllowed) {
      string += "!@#$%^&*()";
    }

    for (let i = 1; i <= length; i++) {
      let character = Math.floor(Math.random() * string.length + 1);

      pass += string.charAt(character);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Call when page load also, when any dependecies changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  //Hold the reference of the value or field
  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = () => {
    // Note: we are using optional chaining because might be the value of password will be zero
    passwordRef.current?.select(); //it will highlight the selected text that you copied
    // passwordRef.current?.setSelectionRange(0, 3); //select only 3 char of password
    window.navigator.clipboard.writeText(password);
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipBoard}
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
