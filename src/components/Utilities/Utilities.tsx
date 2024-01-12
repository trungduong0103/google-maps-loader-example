import React from "react";

interface IUtilities {
  onClick: () => void;
  goBack: () => void;
  clearMarkers: () => void;
  putBackMarkers: () => void;
}

export default function Utilities({
  onClick,
  goBack,
  clearMarkers,
  putBackMarkers
}: IUtilities) {
  return (
    <>
      <div>
        <button onClick={onClick}>Go to HCMC, Vietnam</button>
        <button onClick={goBack}>Go back</button>
      </div>
      <div>
        <button onClick={clearMarkers}>Clear markers</button>
        <button onClick={putBackMarkers}>Put back markers</button>
      </div>
    </>
  );
}
