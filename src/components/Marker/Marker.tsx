import React from "react";

// https://developers.google.com/maps/documentation/javascript/reference/marker

interface IMarker extends google.maps.MarkerOptions {
  onClick?: (e: google.maps.MapMouseEvent, markerIndex: number) => void;
  markerIndex: number;
}

const Marker: React.FC<IMarker> = ({ onClick, markerIndex, ...options }) => {
  console.log("Render card", markerIndex);
  const [marker, setMarker] = React.useState<google.maps.Marker | null>(null);

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
      return;
    }
    marker.setOptions(options);

    if (onClick && typeof onClick === "function") {
      marker.addListener("click", (e: google.maps.MapMouseEvent) => {
        onClick(e, markerIndex);
      });
    }

    // set null to map when unmount
    return () => {
      marker.setMap(null);
      setMarker(null);
    };
  }, [marker, markerIndex, options, onClick]);

  return null;
};

// Memo because of expandMarkerIndex changes in App.tsx
export default React.memo(Marker);
