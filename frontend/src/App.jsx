import { useState, useEffect } from "react";
import MapTile from './components/MapTile';

function App() {
  const [mapRows, setMapRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMap() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/map");

        if (!response.ok) {
          throw new Error("Failed to load map");
        }

        const data = await response.json();

        setMapRows(data.map);
      } catch {
        setError("Error loading map");
        console.log("Error loading map");
      } finally {
        setLoading(false);
      }
    }

    fetchMap();
  }, []);

  if (loading) {
    return <p>Loading map...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div
        className="grid w-fit bg-cover"
        style={{
          backgroundImage: 'url("/assets/parchmentBasic.png")',
          gridTemplateColumns: `repeat(${mapRows[0]?.length ?? 1}, 32px)`,
        }}
      >
        {mapRows.map((row, rowIndex) =>
          row.split("").map((symbol, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className="flex h-8 w-8 items-center justify-center"
            >
              <MapTile symbol={symbol} />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default App;
