import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import "./global.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact={true} path="/movies" component={MovieList} />
        <Route exact={true} path="/movies/:id" component={MovieDetails} />
        <Redirect exact from="/" to="/movies" />
        {/* <Route exact path="/watchlist" component={Watchlist} /> */}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
