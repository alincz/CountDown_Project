import React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
//un modal este o fereastra pop-up care apare in partea de sus a ecranului
// forwardRef il folosim pt a transmite un ref dintr-o comp in alta comp,
// acum trasmit din TimerChallenge in ResultModal
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  //se foloseste pt a defeni proprietatile si metodele care ar trebui sa fie
  //accesibile in aceasta componenta din afara acesteia
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime}seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
//createPortal necesita 2 argumente : -primul este codul jsx(de unde incepe dialog-ul,
//pana unde se termina
// -si al 2 lea este un element html in care codul trebuie teleportat,
// adica aici document.getElementById('modal')
// )
export default ResultModal;
