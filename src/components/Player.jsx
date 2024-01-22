import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    // current trebuie folosit intotdeauna pt useRef

     
  }
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      {/* ??-este o scurtatura in js */}
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}


// Diferente intre useState si useRef: 
// - ori de cate ori se schimba un ref,  functia componenta nu se re-executa

// -ori de cate ori facem update state-ului prin apelarea acelei functii de actualizare
// a starii component function va fi re-executata