import { useState, useEffect } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";
import localization from "./localization";

export default function App() {
  const initialFormData = { category: "animals-and-nature", number: 10 };

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [language, setLanguage] = useState("en");
  const strings = localization[language];

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0].name === selectedCards[1].name) {
        setMatchedCards((prevMatchedCards) => [
          ...prevMatchedCards,
          ...selectedCards,
        ]);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards, emojisData.length]);

  function getRandomIndices(data) {
    const randomIndicesArray = [];

    for (let i = 0; i < formData.number / 2; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }

    return randomIndicesArray;
  }

  async function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);

    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index]);
      return array;
    }, []);

    return dataSlice;
  }

  async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];

    // Fisher-Yates algorithm
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }

    return pairedEmojisArray;
  }

  function handleFormChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  async function startGame(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://emojihub.yurace.pro/api/all/category/${formData.category}`
      );

      if (!res.ok) {
        throw new Error("Could not fetch data from API");
      }

      const data = await res.json();
      const dataSlice = await getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);

      setEmojisData(emojisArray);
      setIsGameOn(true);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsFirstRender(false);
    }
  }

  function turnCard(name, index) {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function resetGame() {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
  }

  function resetError() {
    setIsError(false);
  }

  return (
    <main>
      <h1>{strings.title}</h1>
      <button onClick={() => setLanguage(language === "en" ? "ja" : "en")}>
        {language === "en" ? "日本語" : "English"}
      </button>
      {!isGameOn && !isError && (
        <Form
          handleSubmit={startGame}
          handleChange={handleFormChange}
          isFirstRender={isFirstRender}
          instructions={strings.instructions}
          startGameText={strings.startGame}
          categories={strings.categories}
          numbers={strings.numbers}
          categoryLabel={strings.categoryLabel}
          numberLabel={strings.numberLabel}
          language={language}
        />
      )}
      {isGameOn && !areAllCardsMatched && (
        <AssistiveTechInfo
          emojisData={emojisData}
          matchedCards={matchedCards}
          matchedPairsText={strings.matchedPairs}
          cardsLeftText={strings.cardsLeft}
        />
      )}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      )}
      {areAllCardsMatched && (
        <GameOver
          handleClick={resetGame}
          playAgainText={strings.playAgain}
          gameOverText={strings.gameOverText}
        />
      )}
      {isError && (
        <ErrorCard
          handleClick={resetError}
          errorText={strings.error}
          errorDetails={strings.errorDetails}
          restartGameText={strings.restartGame}
        />
      )}
    </main>
  );
}
