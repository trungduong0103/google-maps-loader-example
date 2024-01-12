import React from "react";
import "./styles.css";
import MapLoader, { Status } from "./components/MapLoader";
import Map from "./components/Map";
import Marker from "./components/Marker";
import CardList, { ICardData } from "./components/CardList";
import Utilities from "./components/Utilities";
import styles from "./CSS.module.scss";

import { CARD_DATA } from "./Data";

const mapKey = "AIzaSyDCKqoqz2cC0cBrSaA-5YISiEBT5XXCmDE";

// Idea for Codesandbox: Add comment mode, instead of commenting lol

// TODOs:
// [x] Create Loader component to handle Google Maps script loading
// [x] Create Maps component
// [x] Create Marker component
// [x] Create Mock cards component
// [ ] Check for memo opportunity
// [-] Data interface
// [ ] Check for Marker noop when no mapInstance is provided

// Functional
// [x] When one card is expanded, other cards must NOT be expanded
// [x] Maps have to "span" to the exact marker position of the card, provided by card data
// [x] Optional ??? Expand the appropriate card when Marker is clicked
// [x] Expose hook to access map instance -> onLoad, is using context too much ?

// Is this too reliant on index ?

export default function App() {
  // Need to expose Google Maps instance create interaction between Marker and Card
  // TODO: Check https://www.npmjs.com/package/react-google-maps how they do this
  // https://react-google-maps-api-docs.netlify.app/ -> use hook, but need context
  // useRef here because onCardExpand uses mapInstance and using useState will make it stale
  const mapRef = React.useRef<google.maps.Map | null>(null);

  // reactive props
  const [center, setCenter] = React.useState({ lat: -34.397, lng: 150.644 });
  const [positions, setPositions] = React.useState<
    { lat: number; lng: number }[] | []
  >(CARD_DATA.map(({ position }) => ({ ...position })));

  // cards list
  const [expandIndex, setExpandIndex] = React.useState<number | null>(null);

  // google.maps.MapMouseEvent has 2 properties domEvent and latLng
  // Accessing domEvent is slow
  // const onMarkerClick = React.useCallback(
  //   (_e: google.maps.MapMouseEvent, markerIndex: number) => {
  //     setExpandIndex(markerIndex);
  //   },
  //   []
  // );

  const onMarkerClick = (_e: google.maps.MapMouseEvent, markerIndex: number) =>
    setExpandIndex(markerIndex);

  // TODO: Check unecessary call
  const onCardExpand = (card: Omit<ICardData, "onExpand">) => {
    if (mapRef.current) {
      console.log("Pan to...", JSON.stringify(card.position));
      mapRef.current.panTo(card.position);
    }
  };

  // BEGIN UTILITIES
  const onClick = () => {
    setCenter({ lat: 10.732, lng: 106.7352008 });
  };

  const goBack = () => {
    setCenter({ lat: -34.397, lng: 150.644 });
  };

  const clearMarkers = () => {
    setPositions([]);
  };

  const putBackMarkers = () => {
    setPositions(CARD_DATA.map(({ position }) => ({ ...position })));
  };
  // END UTILITIES

  // Should MapLoader and Map be combined ?
  return (
    <MapLoader apiKey={mapKey}>
      {(status) => {
        switch (status) {
          case Status.LOADING:
            return <h1>Loading...</h1>;
          case Status.FAILURE:
            return <h1>Load failed..</h1>;
          case Status.SUCCESS:
            return (
              <div>
                <div className={styles.disFlex__row}>
                  <Map
                    className={styles.map}
                    center={center}
                    zoom={8}
                    // maxZoom={10}
                    // disableDefaultUI={true}
                    onLoad={(map) => (mapRef.current = map)}
                  >
                    {positions.map((position, index) => (
                      <Marker
                        key={index}
                        markerIndex={index}
                        position={position}
                        onClick={onMarkerClick}
                      />
                    ))}
                  </Map>
                  <CardList
                    expandIndex={expandIndex}
                    expandCb={onCardExpand}
                    dataList={CARD_DATA}
                  />
                </div>
                <Utilities
                  onClick={onClick}
                  goBack={goBack}
                  clearMarkers={clearMarkers}
                  putBackMarkers={putBackMarkers}
                />
              </div>
            );
          default:
            return null;
        }
      }}
    </MapLoader>
  );
}
