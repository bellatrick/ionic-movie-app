import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
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
import WatchList from "./pages/WatchList";
import { list, person, videocam } from "ionicons/icons";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/movies" component={MovieList} exact={true} />
            <Route path="/movies/:id" component={MovieDetails} exact={true} />
            <Route path="/watchlist" component={WatchList} exact={true} />
            <Redirect exact from="/" to="/movies" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="movies" href="/movies">
              <IonIcon icon={videocam} />
              <IonLabel>Movies</IonLabel>
            </IonTabButton>
            <IonTabButton tab="watchlist" href="/watchlist">
              <IonIcon icon={list} />
              <IonLabel>Watch List</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon icon={person} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
);

export default App;
