export default function AssistiveTechInfo({
  emojisData,
  matchedCards,
  strings
}) {
  return (
    <section className="sr-only" aria-live="polite" aria-atomic="true">
      <h2>Game status</h2>
      <p>
        {strings.matchedPairs} {matchedCards.length / 2}
      </p>
      <p>
        {strings.cardsLeft} {emojisData.length - matchedCards.length}
      </p>
    </section>
  );
}
