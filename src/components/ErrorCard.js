import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

export default function ErrorCard({
  handleClick,
  strings
}) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);
  return (
    <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
      <p className="p--large">{strings.error}</p>
      <p className="p--regular">{strings.errorDetails}</p>
      <RegularButton handleClick={handleClick}>{strings.restartGame}</RegularButton>
    </div>
  );
}
