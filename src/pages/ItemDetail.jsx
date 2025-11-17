import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getItemById } from "../api/ddragon";
import { useChampions } from "../store/useChampions";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [version, setVersion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getOrFetchVersion } = useChampions();

  useEffect(() => {
    async function fetchItem() {
      try {
        const v = await getOrFetchVersion();
        setVersion(v);
        const found = await getItemById(v, id, "fr_FR");
        setItem(found);
      } catch (err) {
        setError("Erreur lors du chargement de l'item.");
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  if (loading) return <p className="p-6 text-lg">Chargement…</p>;
  if (error) return <p className="p-6 text-red-600">Erreur : {error}</p>;
  if (!item) return <p className="p-6">Item introuvable.</p>;

  return (
    <div className="item-detail-page" style={{ minHeight: '100vh', background: '#181818', color: '#fff', fontFamily: 'Cinzel, serif' }}>
      <div className="item-detail-hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', background: '#222', boxShadow: '0 2px 16px #0006' }}>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image?.full}`}
          alt={item.name}
          style={{ width: 120, height: 120, objectFit: 'contain', background: '#111', borderRadius: 12, marginRight: 32 }}
        />
        <div>
          <Link to="/items" className="back-btn" style={{ color: '#c89b3c', textDecoration: 'none', fontWeight: 700, fontSize: 18 }}>
            ← Retour aux items
          </Link>
          <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0 0.2rem 0', color: '#fff', textShadow: '0 2px 8px #000, 0 0 2px #c89b3c' }}>{item.name}</h1>
          <p style={{ fontSize: 18, color: '#c89b3c', marginBottom: 8 }}>{item.plaintext}</p>
        </div>
      </div>
      <div className="item-detail-content" style={{ maxWidth: 700, margin: '2rem auto', background: '#232323', borderRadius: 16, boxShadow: '0 2px 16px #0004', padding: '2rem' }}>
        <h2 style={{ color: '#c89b3c', fontSize: 22, marginBottom: 12 }}>Description</h2>
        <div style={{ color: '#fff', fontSize: 17 }} dangerouslySetInnerHTML={{ __html: item.description }} />
        {item.gold && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ color: '#c89b3c', fontSize: 18 }}>Coût</h3>
            <p style={{ color: '#fff', fontSize: 16 }}>
              Total : {item.gold.total} PO<br />
              Achat : {item.gold.base} PO<br />
              Vente : {item.gold.sell} PO
            </p>
          </div>
        )}
        {item.tags && item.tags.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ color: '#c89b3c', fontSize: 18 }}>Tags</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {item.tags.map(tag => (
                <span key={tag} style={{ background: '#c89b3c', color: '#181818', borderRadius: 8, padding: '2px 10px', fontWeight: 700, fontSize: 15 }}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
