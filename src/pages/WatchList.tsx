import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import MovieCard from "../components/MovieCard";
import { MovieProps } from "../type";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";

const WatchList: React.FC = () => {
  const history = useHistory();
  const [list, setList] = useState<MovieProps[]>(() => {
    const watchlist: MovieProps[] = localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist")!)
      : [];
    return watchlist;
  });

  useEffect(() => {
    const watchlist: MovieProps[] = localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist")!)
      : [];
    setList(watchlist);
  }, [localStorage.getItem("watchlist")]);
console.log(list)
  const handleClear = () => {
    localStorage.clear();
    setList([]);
  };
  
  const handleDelete = (
    event: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    movie: MovieProps
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const updatedWatchList = list && list.filter((i) => i.id !== movie.id);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
    setList && setList(updatedWatchList);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton onClick={() => history.goBack()} slot="start">
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonTitle>Watch List</IonTitle>
        </IonToolbar>
        <IonButton onClick={handleClear}>Clear all</IonButton>
      </IonHeader>
      <IonContent fullscreen>
        <div className="movie-container">
          {list &&
            list.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                watch={true}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WatchList;
