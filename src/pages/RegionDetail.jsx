import React from "react";
import { useParams, Link } from "react-router-dom";
import regionsData from "../data/regions.json";
import championRegions from "../data/championRegions.json";
import { useChampions } from "../store/useChampions";
import { splashUrl } from "../api/ddragon";

export default function RegionDetail() {
  const { id } = useParams();
  const region = regionsData.find(r => r.id === id);
  const { champions, version, loading, fetchAll } = useChampions();

  // S'assurer que les champions sont chargés au montage
  React.useEffect(() => {
    if (!champions || champions.length === 0) {
      fetchAll();
    }
  }, []);

  // Filtrer les champions associés à la région
  const regionChampions = champions.filter(c => championRegions[c.id] === id);

  if (!region) return <p>Région inconnue.</p>;
  if (loading || !champions || champions.length === 0) {
    return <div className="p-6"><p className="text-lg">Chargement des champions…</p></div>;
  }

  return (
    <div>
      {region.image && (
        <div
          style={{
            width: "100%",
            height: "320px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 0,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,.32)"
          }}
        >
          <img
            src={import.meta.env.BASE_URL + 'src/assets/' + region.image}
            alt={region.id}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(17,22,28,0.92) 0%, rgba(17,22,28,0.45) 60%, rgba(17,22,28,0.08) 100%)"
            }}
          />
          <h1
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 24,
              textAlign: "center",
              color: "#fff",
              fontSize: "2.8rem",
              fontWeight: 800,
              textShadow: "0 2px 12px rgba(0,0,0,.45)",
              margin: 0
            }}
          >
            {region.id}
          </h1>
        </div>
      )}
      <div className="p-6">
        <p className="text mb-6" style={{ fontSize: "1.15rem" }}>{region.description}</p>
        <h2 className="text-2xl font-bold mb-4">Champions associés</h2>
        <div className="champions-grid">
          {regionChampions.map(c => (
            <Link key={c.id} to={`/champion/${c.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="champ-card" style={{ flexDirection: "column", alignItems: "center" }}>
                <img
                  src={splashUrl(c.id)}
                  alt={c.name}
                  style={{ width: 220, height: 124, objectFit: "cover", borderRadius: 12, marginBottom: 8 }}
                />
                <h3 className="champ-name" style={{ textAlign: "center" }}>{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
