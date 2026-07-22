import { useState, useEffect } from "react";

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

  return <pre>{mapRows.join("\n")}</pre>;
}

export default App;
