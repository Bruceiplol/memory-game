import { data } from "../data/data";
import Option from "./Option";

export default function Select({ handleChange, language }) {
  const localizedData = data[language]; // Get localized data based on the language prop

  const selectEl = Object.entries(localizedData).map(([key, value]) => (
    <div key={key} className="form__inner-wrapper">
      <label htmlFor={key}>
        {key === "category" ? (language === "en" ? "Category" : "カテゴリー") : language === "en" ? "Number of Cards" : "カード枚数"}
      </label>
      <select name={key} id={key} onChange={handleChange}>
        <Option valueArray={value} />
      </select>
    </div>
  ));

  return <>{selectEl}</>;
}
