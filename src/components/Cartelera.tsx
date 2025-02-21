import { useEffect, useState } from "react";

interface ApiMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

interface newMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: number;
}

interface CarteleraProps {
  imput: string;
}

export default function Cartelera({ imput }: CarteleraProps) {
  const [movies, setMovies] = useState<newMovie[]>([]);

  useEffect(() => {
    if (!imput) {
      setMovies([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${imput}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search && data.Search.length > 0) {
            const moviesList = data.Search.map((movie: ApiMovie) => ({
              imdbID: movie.imdbID,
              Title: movie.Title,
              Poster: movie.Poster,
              Year: Number(movie.Year),
            }));
            setMovies(moviesList);
          } else {
            setMovies([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [imput]);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {movies.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
          {movies.map((movie) => (
            <li
              key={movie.imdbID}
              className="bg-gray-800 rounded-lg overflow-hidden max-w-64 hover:scale-105 duration-300"
            >
              <img src={movie.Poster} alt={movie.Title} className="" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white max-w-full">
                  {movie.Title}
                </h3>
                <p className="text-gray-400 mt-2">{movie.Year}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-center">
          No se encontraron películas con ese nombre.
        </p>
      )}
    </div>
  );
}
