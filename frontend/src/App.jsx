import { useState, useEffect } from "react";
import MapTile from "./components/MapTile";
import BookingForm from "./components/BookingForm";

function App() {
  const [mapRows, setMapRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCabana, setSelectedCabana] = useState(null);

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
    <main className="min-h-screen bg-stone-100 px-4 py-8">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-stone-900">Resort Map</h1>

          <p className="mt-2 text-stone-600">
            Select an available cabana to make a booking.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-lg">
          <div
            className="mx-auto grid w-fit bg-cover"
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
                  <MapTile
                    symbol={symbol}
                    mapRows={mapRows}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    onCabanaSelect={setSelectedCabana}
                  />
                </div>
              )),
            )}
          </div>
        </div>

        {selectedCabana && (
          <BookingForm
            selectedCabana={selectedCabana}
            onCabanaSelect={setSelectedCabana}
          />
        )}
      </section>
    </main>
  );
}

export default App;
