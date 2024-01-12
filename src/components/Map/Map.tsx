import React from "react";

// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
// https://developers.google.com/maps/documentation/javascript/best-practices
interface IMap extends google.maps.MapOptions {
  markers?: Array<google.maps.MarkerOptions>;
  style?: { [key: string]: string };
  className?: string;
  onLoad: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: any;
}

const Map = ({
  markers,
  style,
  className,
  onLoad,
  onClick,
  onIdle,
  children,
  ...mapProps
}: IMap) => {
  console.log("render");
  // Why is it rendering twice ?
  console.log("render");
  const mapRef = React.useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = React.useState<google.maps.Map>();

  // TODO: Should separate effects ???
  React.useEffect(() => {
    // Load Google Maps
    if (!mapInstance) {
      if (mapRef.current) {
        // Passing mapProps (map options here) will prevent Google Maps from reacting to prop changes
        const instance = new window.google.maps.Map(mapRef.current);
        setMapInstance(instance);
        onLoad(instance);
      }
      return;
    }

    mapInstance.setValues({ ...mapProps });

    if (onClick) {
      google.maps.event.clearListeners(mapInstance, "click");
      mapInstance.addListener("click", onClick);
    }

    if (onIdle) {
      google.maps.event.clearListeners(mapInstance, "idle");
      mapInstance.addListener("idle", onIdle);
    }
  }, [mapInstance, mapProps, onClick, onIdle, onLoad]);

  return (
    <div className={className} style={style} ref={mapRef} id="map">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // @ts-ignore
          return React.cloneElement(child, { map: mapInstance });
        }
      })}
    </div>
  );
};

export default Map;
