import React, { useState, useEffect } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  SearchbarChangeEventDetail,
  IonPage,
  IonLoading,
} from "@ionic/react";
import axios from "axios";
import { MovieProps } from "../type";
import MovieCard from "../components/MovieCard";
import debounce from "lodash.debounce";
const App = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    };

    fetchData();
  }, []);

  const searchMovies = async (searchText: string) => {
    setLoading(true)
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${searchText}`
    );
    const data = await response.json();
    setLoading(false)
    return data.results;
  };

  const handleSearch = debounce(
    async (event: CustomEvent<SearchbarChangeEventDetail>) => {
      const text = event.detail.value || "";
      if (text.length === 0) {
        return;
      }
      try {
        const results = await searchMovies(text);
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    },
    100
  );

  return (
    <IonPage>
      <IonLoading isOpen={loading} message={"Searching..."} duration={2000} />
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <div className="toolbar-container">
              <IonTitle>Latest Movies</IonTitle>
              <IonSearchbar
                placeholder="Search movies..."
                onIonChange={handleSearch}
                className="search-input"
              ></IonSearchbar>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="movie-container">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </IonContent>
      </IonApp>
    </IonPage>
  );
};

export default App;
