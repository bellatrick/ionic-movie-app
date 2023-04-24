import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonBadge,
  IonButton,
  IonIcon,
  IonLoading,
  IonToast,
} from "@ionic/react";
import {
  arrowBack,
  bookmarkOutline,
  star,
  starHalf,
  starOutline,
} from "ionicons/icons";
import axios from "axios";
import { TMDB_KEY } from "../env";
import { MovieProps } from "../type";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
}

const MovieDetails: React.FC = () => {
  let watchlist: MovieProps[] = localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist")!)
    : [];
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [showSuccessToast, setshowSuccessToast] = useState<boolean>(false);
  const [message, setMessage] = useState({ present: false, message: "" });
  const history = useHistory();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [id]);
  const handleSaveToWatchList = () => {
    const movieId = movieDetails?.id;
    const isMovieInWatchlist = watchlist.find(
      (movie: any) => movie.id === movieId
    );
    setshowSuccessToast(true);
    if (isMovieInWatchlist) {
      setMessage({
        message: "This movie has already been bookmarked",
        present: true,
      });
    }
    if (!isMovieInWatchlist) {
      const newList = [...watchlist, movieDetails];
      localStorage.setItem("watchlist", JSON.stringify(newList));
      setMessage({
        message: "Movie has been successfully bookmarked",
        present: false,
      });
    }
  };

  if (!movieDetails) {
    return (
      <IonLoading
        isOpen={!movieDetails}
        message={"Please wait..."}
        duration={3000}
      />
    );
  }
  let rating = movieDetails.vote_average / 2;
  const starRating = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      starRating.push(<IonIcon key={i} icon={star} />);
      rating--;
    } else if (rating >= 0.5) {
      starRating.push(<IonIcon key={i} icon={starHalf} />);
      rating -= 0.5;
    } else {
      starRating.push(<IonIcon key={i} icon={starOutline} />);
    }
  }
  return (
    <IonPage>
      <IonToast
        isOpen={showSuccessToast}
        message={message.message}
        onDidDismiss={() => setshowSuccessToast(false)}
        duration={5000}
        position="top"
        animated={true}
        color={message.present ? "medium" : "success"}
      ></IonToast>
      <IonHeader>
        <IonToolbar>
          <IonButton onClick={() => history.goBack()} slot="start">
            <IonIcon icon={arrowBack} />
          </IonButton>
          <h1 className="title">{movieDetails.title}</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {movieDetails && (
          <div className="movie-details">
            <div className="img-wrapper">
              {" "}
              <IonIcon
                icon={bookmarkOutline}
                slot="start"
                color={showSuccessToast ? "success" : "medium"}
                onClick={handleSaveToWatchList}
                className="bookmark"
              />
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={`${movieDetails.title} poster`}
              />
            </div>
            <div className="text-wrapper">
              <h2>{movieDetails.title}</h2>
              <p className="release-date">
                Release date: {movieDetails.release_date}
              </p>
              <p className="overview">{movieDetails.overview}</p>
              <div className="rating">{starRating}</div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MovieDetails;
