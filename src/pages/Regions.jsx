import { useEffect, useState } from "react";
import regionsData from "../data/regions.json";
import { useNavigate } from "react-router-dom";

export default function Regions() {
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRegions(regionsData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ textAlign: 'center', fontFamily: 'Cinzel, serif' }}>Régions de Runeterra</h1>
      <div className="regions-grid">
        {regions.map((r) => (
          <article
            key={r.id}
            className="region-card"
            onClick={() => navigate(`/region/${r.id}`)}
          >
            {r.image && (
              <>
                <img
                  className="region-img"
                  src={import.meta.env.BASE_URL + 'src/assets/' + r.image}
                  alt={r.id}
                />
                <div className="region-overlay" />
              </>
            )}
            <h2 className="region-title">{r.id}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}