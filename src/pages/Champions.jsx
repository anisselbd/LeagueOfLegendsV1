import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useChampions } from "../store/useChampions";
import { championSquare } from "../api/ddragon";
import regionMap from "../data/championRegions.json";

export default function Champions() {
  const { fetchAll, champions, version, loading } = useChampions();
  const [search, setSearch] = useState("");
  const [params] = useSearchParams();
  const regionFilter = params.get("region"); // ex: "Ionia"

  useEffect(() => {
    fetchAll(); // charge version + champions
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return champions.filter((c) => {
      const nameMatch = c.name.toLowerCase().includes(q);
      if (!regionFilter) return nameMatch;
      // regionMap utilise c.id (ex. "Ahri", "JarvanIV")
      const champRegion = regionMap[c.id];
      return nameMatch && champRegion === regionFilter;
    });
  }, [champions, search, regionFilter]);

  if (loading) return <p className="p-4 text-lg">Chargement...</p>;

  return (
    <div className="p-6">
      <div className="flex mb-4" style={{ gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <h1 className="text-3xl font-bold mb-6" style={{textAlign: 'center', fontFamily: 'Cinzel, serif'}}>Champions League of Legends</h1>

        {/* Affichage du filtre actif (si présent) */}
        {regionFilter && (
          <span className="chip" title="Filtre région actif">
            Région&nbsp;: <strong>{regionFilter}</strong>
          </span>
        )}
        {regionFilter && (
          <Link to="/" className="chip" style={{ textDecoration: "none" }}>
            ✕ Effacer le filtre
          </Link>
        )}
      </div>


      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Rechercher un champion..."
          className="search-bar rounded mb-4"
          style={{ width: "100%", maxWidth: 900, height: 48, fontSize: 20, padding: '0 18px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <p className="text" style={{ marginBottom: 12 }}>
          Aucun résultat {regionFilter ? `pour la région “${regionFilter}”` : ""} avec la recherche “{search}”.
        </p>
      )}

      <div className="champions-grid">
          {filtered.map((c) => {
            // Image splash officielle : https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championName}_0.jpg
            const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${c.id}_0.jpg`;
            return (
              <Link
                key={c.id}
                to={`/champion/${c.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="champ-card">
                  <img
                    src={splashUrl}
                    alt={c.name}
                    className="champ-img"
                    loading="lazy"
                    style={{ objectFit: "cover", width: "100%", height: "180px", borderRadius: "8px" }}
                  />
                  <div className="champ-body">
                    <h3 className="champ-name">{c.name}</h3>
                    <p className="champ-title">{c.title}</p>
                    <p className="champ-region">Région : {regionMap[c.id] ?? "—"}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}