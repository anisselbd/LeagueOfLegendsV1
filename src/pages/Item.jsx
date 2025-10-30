import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useChampions } from "../store/useChampions";


const Item = () => {
  const [items, setItems] = useState([]);
  const [version, setVersion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 40;
  const { getOrFetchVersion } = useChampions();

  useEffect(() => {
    async function fetchItems() {
      try {
        const v = await getOrFetchVersion();
        setVersion(v);
        
        const url = `https://ddragon.leagueoflegends.com/cdn/${v}/data/fr_FR/item.json`;
        const res = await fetch(url);
        const data = await res.json();
        
        let itemsData = Object.entries(data.data).map(([id, item]) => ({ ...item, id }));
        const seen = new Set();
        itemsData = itemsData.filter(item => {
          if (seen.has(item.name)) return false;
          seen.add(item.name);
          return true;
        });
        itemsData = itemsData.sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
        setItems(itemsData);
      } catch (err) {
        setError("Erreur lors du chargement des items.");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="item-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ textAlign: 'center', width: '100%', fontFamily: 'Cinzel, serif', fontWeight: 700, letterSpacing: 1 }}>Page des Items</h1>
      <p style={{ textAlign: 'center', width: '100%', fontFamily: 'Cinzel, serif', fontWeight: 600, fontSize: 20, marginTop: 6 }}>Bienvenue sur la page des items de League of Legends !</p>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '18px 0' }}>
        <input
          type="text"
          placeholder="Rechercher un item..."
          className="search-bar rounded"
          style={{ width: '100%', maxWidth: 500, height: 40, fontSize: 17, padding: '0 14px', margin: '0 auto' }}
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      {loading && <p style={{ textAlign: 'center', width: '100%' }}>Chargement...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</p>}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Pagination
          items={items}
          itemsPerPage={itemsPerPage}
          page={page}
          setPage={setPage}
          version={version}
          search={search}
        />
      </div>
    </div>
  );
};

// Pagination component
function Pagination({ items, itemsPerPage, page, setPage, version, search }) {
  const filtered = items.filter(item =>
    item.name &&
    item.name.trim() !== '' &&
    !item.name.includes('<') &&
    !item.name.includes('>') &&
    item.image && item.image.full &&
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  return (
    <>
      <div className="item-list" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 24,
        width: '100%'
      }}>
            {pageItems.map((item) => (
              <Link
                to={`/items/${item.id}`}
                key={item.image?.full || item.name}
                style={{
                  textDecoration: 'none',
                  transition: 'transform 0.18s, box-shadow 0.18s, border-color 0.18s',
                  borderRadius: 8,
                }}
                className="item-card-link"
              >
                <div
                  style={{
                    border: '1px solid #333',
                    borderRadius: 8,
                    padding: 8,
                    width: 110,
                    minHeight: 120,
                    background: '#181818',
                    color: '#fff',
                    boxShadow: '0 2px 8px #0002',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    transition: 'transform 0.18s, box-shadow 0.18s, border-color 0.18s',
                  }}
                  className="item-card"
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image?.full}`}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: 100, height: 100, objectFit: 'contain', background: '#111', borderRadius: 4, marginBottom: 6 }}
                  />
                  <div style={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center', fontSize: 13 }}>{item.name}</div>
                </div>
              </Link>
            ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0', gap: 8 }}>
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#222', color: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
        >
          ⏮ Début
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#222', color: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
        >
          Précédent
        </button>
        <span style={{ color: '#fff', fontWeight: 500, fontSize: 16, minWidth: 90, textAlign: 'center' }}>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#222', color: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}
        >
          Suivant
        </button>
      </div>
      {filtered.length === 0 && (
        <p style={{ color: '#fff', textAlign: 'center', marginTop: 24 }}>
          Aucun résultat pour “{search}”.
        </p>
      )}
    </>
  );
}
export default Item;
