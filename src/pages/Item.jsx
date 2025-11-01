import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
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

export default Item;
