import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

export default function GameOver({ handleClick, strings}) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);

  return (
    <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
      <p className="p--large">{strings.gameOverText}</p>
      <RegularButton handleClick={handleClick}>{strings.playAgain}</RegularButton>
    </div>
  );
}
