import React from "react";

function MapTile({ symbol }) {
  if (symbol === ".") {
    return null;
  }

  if (symbol === "p") {
    return (
      <img
        src="/assets/textureWater.png"
        alt=""
        className="h-full w-full object-cover"
      />
    );
  }

  if (symbol === "W") {
    return (
      <img
        src="/assets/cabana.png"
        alt="Cabana"
        className="h-full w-full object-contain"
      />
    );
  }

  if (symbol === "c") {
    return (
      <img
        src="/assets/houseChimney.png"
        alt="Chalet"
        className="h-full w-full object-contain"
      />
    );
  }

  if (symbol === "#") {
    return (
      <img
        src="/assets/arrowStraight.png"
        alt=""
        className="h-full w-full object-contain"
      />
    );
  }

  return null;
}

export default MapTile;
