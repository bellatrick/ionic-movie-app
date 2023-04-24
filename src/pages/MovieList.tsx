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
} from "@ionic/react";
import axios from "axios";
import { MovieProps } from "../type";
import MovieCard from "../components/MovieCard";
import { TMDB_KEY } from "../env";
import debounce from "lodash.debounce";
const App = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    };

    fetchData();
  }, []);

  const searchMovies = async (searchText: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${searchText}`
    );
    const data = await response.json();
    return data.results;
  };

  const handleSearch = debounce(
    async (event: CustomEvent<SearchbarChangeEventDetail>) => {
      const text = event.detail.value || "";
      if (text.length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const results = await searchMovies(text);
        setSearchResults(results);
      } catch (error) {
        console.log(error);
      }
    },
    500
  );

  return (
  <IonPage>
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
