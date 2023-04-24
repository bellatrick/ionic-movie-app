import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const WatchList: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Watch List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p>This is the watch list page!</p>
      </IonContent>
    </IonPage>
  );
};

export default WatchList;
