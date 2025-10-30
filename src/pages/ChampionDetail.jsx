import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useChampions } from "../store/useChampions";
import {getChampionDetail, splashUrl, loadingUrl, spellIcon, passiveIcon } from "../api/ddragon";
import { motion, AnimatePresence } from "framer-motion";

function SkinButton({ skin, idx, champId, champ, active, onClick, name }) {
  const [imgOk, setImgOk] = useState(true);
  const [triedFallback, setTriedFallback] = useState(false);
  if (!imgOk) return null;
  const splash = splashUrl(champId, idx);
  const loading = loadingUrl(champId, idx);
  const skinImg = skin.mainImg || (skin.image && skin.image.full);
  return (
    <button
      onClick={onClick}
      className={`skin ${active ? "skin-active" : ""}`}
      title={skin.name === "default" ? name : skin.name}
    >
      <img
        src={splash}
        alt={skin.name}
        onError={e => {
          if (!triedFallback) {
            setTriedFallback(true);
            if (skinImg) {
              e.target.src = skinImg.startsWith('http') ? skinImg : `${skinImg}`;
            } else if (loading) {
              e.target.src = loading;
            } else {
              setImgOk(false);
            }
          } else {
            setImgOk(false);
          }
        }}
      />
      <span className="skin-label">{skin.name === "default" ? "Classique" : skin.name}</span>
    </button>
  );
}

export default function ChampionDetail() {
  const { id } = useParams(); 
  const { version, fetchAll } = useChampions();
  const [champ, setChamp] = useState(null);
  const [skinIndex, setSkinIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (!version) await fetchAll();
        const v = version || useChampions.getState().version;
        const data = await getChampionDetail(v, id, "fr_FR");
        setChamp(data);
        console.log("Détails du champion :", data);
      } catch (e) {
        setErr(e?.message ?? "Erreur");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, version, fetchAll]);


  // Scroll en haut lors du changement de skin
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [skinIndex]);

  if (loading) return <p className="p-6 text-lg">Chargement…</p>;
  if (err) return <p className="p-6 text-red-600">Erreur : {err}</p>;
  if (!champ) return <p className="p-6">Champion introuvable.</p>;

  const v = version;
  const { name, title, lore, blurb, tags = [], info = {}, spells = [], passive, skins = [] } = champ;

  return (
    <div>
      {/* Hero avec splash */}
      <div className="hero">
        <AnimatePresence mode="wait">
          <motion.img
            key={skinIndex}
            className="hero-bg"
            src={splashUrl(id, skinIndex)}
            alt={`${name} splash`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55) saturate(1.1)" }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div>
            <Link to="/champions" className="back-btn">← Retour aux champions </Link>
            <h1 className="hero-title">{name}</h1>
            <p className="hero-sub">{title}</p>
            <div className="chips">
              {tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <img className="loading-art" src={loadingUrl(id, skinIndex)} alt={`${name} loading`} />
        </div>
      </div>

      {/* Corps */}
      <div className="container">
        {/* Bio */}
        <section className="card">
          <h2 className="section-title">Histoire</h2>
          <p className="text">{lore || blurb}</p>
        </section>

        {/* Stats rapides */}
        <section className="card">
          <h2 className="section-title">Difficulté & rôles</h2>
          <div className="stats-grid">
            <div><span className="stat-label">Attaque</span><span className="stat-value">{info.attack}</span></div>
            <div><span className="stat-label">Défense</span><span className="stat-value">{info.defense}</span></div>
            <div><span className="stat-label">Magie</span><span className="stat-value">{info.magic}</span></div>
            <div><span className="stat-label">Difficulté</span><span className="stat-value">{info.difficulty}</span></div>
          </div>
        </section>

        {/* Compétences */}
        <section className="card">
          <h2 className="section-title">Compétences</h2>

          {/* Passive */}
          {passive && (
            <div className="ability">
              <img className="ability-icon" src={passiveIcon(v, passive.image.full)} alt={passive.name} />
              <div>
                <h3 className="ability-name">Passive — {passive.name}</h3>
                <p className="text" dangerouslySetInnerHTML={{ __html: passive.description }} />
              </div>
            </div>
          )}

          {/* Spells Q W E R */}
          {spells.map((sp, i) => (
            <div key={sp.id} className="ability">
              <img className="ability-icon" src={spellIcon(v, sp.image.full)} alt={sp.name} />
              <div>
                <h3 className="ability-name">{["A/Q","Z/W","E","R"][i] ?? ""} — {sp.name}</h3>
                <p className="text" dangerouslySetInnerHTML={{ __html: sp.description }} /> 
              </div>
            </div>
          ))}
        </section>

        {/* Skins */}
        {skins?.length > 1 && (
          <section className="card">
            <h2 className="section-title">Skins du champion</h2>
            <div className="skins">
              {skins.map((s, idx) => (
                <SkinButton
                  key={s.id}
                  skin={s}
                  idx={idx}
                  champId={id}
                  champ={champ}
                  active={idx === skinIndex}
                  onClick={() => setSkinIndex(idx)}
                  name={name}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}