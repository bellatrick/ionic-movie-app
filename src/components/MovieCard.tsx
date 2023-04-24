import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonLabel,
  IonToast,
} from "@ionic/react";

import { MovieProps } from "../type";
import { bookmark, bookmarkOutline, trashBin } from "ionicons/icons";
import { useState } from "react";
type props = {
  movie: MovieProps;
  watch?: boolean;
  handleDelete?: (
    event: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    movie: MovieProps
  ) => void;
};
function MovieCard({ movie, watch, handleDelete }: props) {
  const [showSuccessToast, setshowSuccessToast] = useState<boolean>(false);
 

  return (
    <IonCard routerLink={`/movies/${movie.id}`}>
    

      <div className="movie-item">
        {watch && handleDelete && (
          <IonIcon
            icon={trashBin}
            slot="start"
            onClick={(e) => handleDelete(e, movie)}
            className="trash"
          />
        )}
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
