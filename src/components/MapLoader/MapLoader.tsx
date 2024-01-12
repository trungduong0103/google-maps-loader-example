import React, { ReactElement } from "react";
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";

export enum Status {
  LOADING = "LOADING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS"
}

interface IMapLoader extends LoaderOptions {
  children: (status: Status) => JSX.Element | ReactElement | null;
}

export default function MapLoader({ children, ...options }: IMapLoader) {
  const [status, setStatus] = React.useState(Status.LOADING);

  const setStatusAndExecuteCallback = React.useCallback((status: Status) => {
    setStatus(status);
  }, []);

  React.useEffect(() => {
    const loader = new Loader(options);

    loader.load().then(
      () => setStatusAndExecuteCallback(Status.SUCCESS),
      () => setStatusAndExecuteCallback(Status.FAILURE)
    );
  }, [options, setStatusAndExecuteCallback]);

  return children(status);
}
