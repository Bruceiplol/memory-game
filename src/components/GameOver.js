import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

export default function GameOver({ handleClick, playAgainText, gameOverText }) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);

  return (
    <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
      <p className="p--large">{gameOverText}</p>
      <RegularButton handleClick={handleClick}>{playAgainText}</RegularButton>
    </div>
  );
}
