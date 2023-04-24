import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonLabel,
} from "@ionic/react";
import { MovieProps } from "../type";
type props = {
  movie: MovieProps;
};
function MovieCard({ movie }: props) {
  return (
    <IonCard routerLink={`/movies/${movie.id}`}>
      <div className="movie-item">
        <IonImg
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <IonLabel>
          <h2 className="movie-title">{movie.title}</h2>
        </IonLabel>
      </div>
    </IonCard>
  );
}
export default MovieCard;
