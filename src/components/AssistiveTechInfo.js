export default function AssistiveTechInfo({
  emojisData,
  matchedCards,
  matchedPairsText,
  cardsLeftText,
}) {
  return (
    <section className="sr-only" aria-live="polite" aria-atomic="true">
      <h2>Game status</h2>
      <p>
        {matchedPairsText} {matchedCards.length / 2}
      </p>
      <p>
        {cardsLeftText} {emojisData.length - matchedCards.length}
      </p>
    </section>
  );
}
