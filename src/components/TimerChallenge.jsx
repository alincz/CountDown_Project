import React from "react";
import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  //spre deosebire de variabilele definite in functiile componentei,acest ref
  //nu va fi resetat sau eliminat atunci cand aceasta comp se re-executa,in schimb
  //la fel ca si in cazul valorilor state-ului,react va stoca aceste valori ale
  //cronometrului in spatele scenei si se va asigura ca acestea nu se pierd pe
  //masura ce aceasta component function se re-executa. Spre deosebire de state,
  // setarea acestei valori timer.current = setTimeout(() nu face ca aceasta component function sa se reexecute
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
    //aici este logica pt-cand nu apasam la timp butonul stop,pierdem
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    //setInterval va executa aceasta functie de fiecare data cand acest
    //timp a expirat,deci nu doar o singura data
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
    //aici este logica pt-cand apasam la tim butonul stop,castigam
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge ">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop Challenge" : "Start Challenge"}
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
