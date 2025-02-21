import { useState } from "react";
import Cartelera from "./components/Cartelera";

function App() {
  const [imput, setImput] = useState("");

  const cambiarImput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImput(e.target.value);
  };

  const enviarImput = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#061326]">
      <header className="flex flex-col items-center">
        <h1 className="text-white text-5xl mt-7 mb-7 tracking-wider">
          Cartelera
        </h1>
        <form onSubmit={enviarImput}>
          <input
            className="rounded bg-[#061326] border-solid border-2 text-white"
            type="text"
            placeholder="Openheimer, Avengers, ..."
            value={imput}
            onChange={cambiarImput}
          />
          <button className="border-solid border-2 rounded text-white ml-3">
            Search
          </button>
        </form>
      </header>

      <main>
        <Cartelera imput={imput} />
      </main>
    </div>
  );
}

export default App;
