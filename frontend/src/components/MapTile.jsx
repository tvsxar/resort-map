function getPathTile(mapRows, rowIndex, columnIndex) {
  function isConnection(symbol) {
    return symbol === "#";
  }

  const hasTop = isConnection(mapRows[rowIndex - 1]?.[columnIndex]);

  const hasRight = isConnection(mapRows[rowIndex]?.[columnIndex + 1]);

  const hasBottom = isConnection(mapRows[rowIndex + 1]?.[columnIndex]);

  const hasLeft = isConnection(mapRows[rowIndex]?.[columnIndex - 1]);

  const connections = [hasTop, hasRight, hasBottom, hasLeft].filter(
    Boolean,
  ).length;

  let image = "/assets/arrowStraight.png";
  let rotation = 0;

  if (connections === 4) {
    image = "/assets/arrowCrossing.png";
  }

  if (connections === 3) {
    image = "/assets/arrowSplit.png";

    if (!hasLeft) rotation = 0;
    else if (!hasTop) rotation = 90;
    else if (!hasRight) rotation = 180;
    else if (!hasBottom) rotation = 270;
  }

  if (connections === 2) {
    if (hasTop && hasBottom) {
      image = "/assets/arrowStraight.png";
      rotation = 0;
    } else if (hasLeft && hasRight) {
      image = "/assets/arrowStraight.png";
      rotation = 90;
    } else {
      image = "/assets/arrowCornerSquare.png";

      if (hasTop && hasRight) rotation = 0;
      else if (hasRight && hasBottom) rotation = 90;
      else if (hasBottom && hasLeft) rotation = 180;
      else if (hasLeft && hasTop) rotation = 270;
    }
  }

  if (connections === 1) {
    image = "/assets/arrowEnd.png";

    if (hasBottom) rotation = 0;
    else if (hasLeft) rotation = 90;
    else if (hasTop) rotation = 180;
    else if (hasRight) rotation = 270;
  }

  return { image, rotation };
}

function MapTile({ symbol, mapRows, rowIndex, columnIndex, onCabanaSelect }) {
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
      <button className="cursor-pointer hover:scale-103" onClick={() => onCabanaSelect(`${rowIndex}-${columnIndex}`)}>
        <img
          src="/assets/cabana.png"
          alt="Cabana"
          className="h-full w-full object-contain"
        />
      </button>
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
    const { image, rotation } = getPathTile(mapRows, rowIndex, columnIndex);

    return (
      <img
        src={image}
        alt=""
        className="h-full w-full object-contain"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      />
    );
  }

  return null;
}

export default MapTile;
