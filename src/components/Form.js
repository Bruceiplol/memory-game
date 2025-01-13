import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";
import Select from "./Select";

export default function Form({
  handleSubmit,
  handleChange,
  isFirstRender,
  instructions,
  startGameText,
  language
}) {
  const divRef = useRef(null);

  useEffect(() => {
    !isFirstRender && divRef.current.focus();
  }, [isFirstRender]);

  return (
    <div className="form-container" ref={divRef} tabIndex={-1}>
      <p className="p--regular">{instructions}</p>
      <form className="wrapper">
        <Select handleChange={handleChange} language={language}/>
        <RegularButton handleClick={handleSubmit}>
          {startGameText}
        </RegularButton>
      </form>
    </div>
  );
}
