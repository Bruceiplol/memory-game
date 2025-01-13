import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";
import Select from "./Select";

export default function Form({
  handleSubmit,
  handleChange,
  isFirstRender,
  strings,
  language
}) {
  const divRef = useRef(null);

  useEffect(() => {
    !isFirstRender && divRef.current.focus();
  }, [isFirstRender]);

  return (
    <div className="form-container" ref={divRef} tabIndex={-1}>
      <p className="p--regular">{strings.instructions}</p>
      <form className="wrapper">
        <Select handleChange={handleChange} language={language}/>
        <RegularButton handleClick={handleSubmit}>
          {strings.startGame}
        </RegularButton>
      </form>
    </div>
  );
}
