import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

export default function ErrorCard({
  handleClick,
  errorText,
  errorDetails,
  restartGameText,
}) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);
  return (
    <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
      <p className="p--large">{errorText}</p>
      <p className="p--regular">{errorDetails}</p>
      <RegularButton handleClick={handleClick}>{restartGameText}</RegularButton>
    </div>
  );
}
