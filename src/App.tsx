import { useEffect, useState } from "react";
import "./App.css";
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";

function App() {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * moles.length);
    const interval = setInterval(() => {
      setMoleVisibility(randomIndex, true);
      setTimeout(() => {
        setMoleVisibility(randomIndex, false);
      }, 700);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  function setMoleVisibility(index: number, isVisible: boolean) {
    const newMoles = [...moles];
    newMoles[index] = isVisible;
    setMoles(newMoles);
  }

  function handleClick(index: number) {
    if (!moles[index]) return;
    setMoleVisibility(index, false);
    setScore((prev) => prev + 1);
  }

  return (
    <>
      <h1>Score: {score}</h1>
      <div className="grid">
        {moles.map((isMole, index) => (
          <img
            key={index}
            alt="mole"
            src={isMole ? mole : hole}
            onClick={() => handleClick(index)}
          ></img>
        ))}
      </div>
    </>
  );
}

export default App;
