import React, { ChangeEvent } from "react";

interface HeaderProps {
  imput: string;
  setImput: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ imput, setImput }) => {
  const cambiarImput = (e: ChangeEvent<HTMLInputElement>) => {
    setImput(e.target.value);
  };

  return (
    <header className="bg-gradient-to-b from-[#ffffff] to-[#f0f0f0] py-8 sm:py-12 px-4 shadow-xl 
                     border-b-4 border-[#c9082a]">
      <div className="max-w-7xl mx-auto">
        <div className="animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] text-center mb-2 
                       tracking-tight leading-none hover:scale-105 transition-transform duration-300">
            Equipos de la NBA
          </h1>
          <p className="text-[#4a4a4a] text-center text-lg sm:text-xl mb-6 sm:mb-8 
                      animate-slideDown">
            Temporada 2025
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} 
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 
                       max-w-2xl mx-auto px-4 sm:px-6 animate-slideUp">
          <input
            className="w-full px-4 sm:px-6 py-3 rounded-lg bg-white border border-gray-300 
                     text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-[#c9082a] focus:border-transparent transition-all text-base sm:text-lg
                     hover:bg-gray-50"
            type="text"
            placeholder="Buscar equipo..."
            value={imput}
            onChange={cambiarImput}
          />
          <button 
            className="px-6 sm:px-8 py-3 bg-[#c9082a] text-white font-semibold rounded-lg 
                     hover:bg-[#e60932] focus:outline-none focus:ring-2 focus:ring-[#c9082a] 
                     focus:ring-offset-2 focus:ring-offset-white transition-all 
                     text-base sm:text-lg whitespace-nowrap transform hover:scale-105
                     active:scale-95 shadow-lg"
            type="submit"
          >
            Buscar
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;