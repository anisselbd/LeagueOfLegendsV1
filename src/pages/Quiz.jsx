import { useEffect, useMemo, useState } from "react";
import { useChampions } from "../store/useChampions";
import regionMap from "../data/championRegions.json";

const pick = (arr, n) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
};

function buildQuestions(champions) {

  const pool = [];

  const champsOK = champions.filter(c => c && c.id && c.name);
  const roles = Array.from(
    new Set(champsOK.flatMap(c => (c.tags && c.tags.length ? c.tags : [])))
  );
  const regions = Array.from(new Set(Object.values(regionMap)));

  // Q1: Région ?
  champsOK.forEach(c => {
    const correct = regionMap[c.id];
    if (!correct) return;
    const wrongs = pick(regions.filter(r => r !== correct), 3);
    pool.push({
      type: "region",
      question: `De quelle région vient ${c.name} ?`,
      choices: pick([correct, ...wrongs], 4),
      answer: correct,
    });
  });

  // Q2: Rôle principal ?
  champsOK.forEach(c => {
    const correct = c.tags?.[0];
    if (!correct) return;
    const wrongs = pick(roles.filter(r => r !== correct), 3);
    pool.push({
      type: "role",
      question: `Quel est le rôle principal de ${c.name} ?`,
      choices: pick([correct, ...wrongs], 4),
      answer: correct,
    });
  });

  // Q3: Titre / épithète ?
  champsOK.forEach(c => {
    const correct = c.title; // ex: "la Renarde à neuf queues"
    if (!correct) return;
    // prendre 3 autres titres aléatoires
    const others = pick(
      champsOK.filter(x => x.id !== c.id && x.title).map(x => x.title),
      3
    );
    if (others.length < 3) return;
    pool.push({
      type: "title",
      question: `Quel est le titre de ${c.name} ?`,
      choices: pick([correct, ...others], 4),
      answer: correct,
    });
  });

  // Mélange global + on prend 10
  return pick(pool, 10);
}

export default function Quiz() {
  const { champions, fetchAll, loading } = useChampions();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!champions.length) fetchAll();
  }, [champions.length, fetchAll]);

  const ready = useMemo(() => champions.length > 0 && !loading, [champions, loading]);

  const startQuiz = () => {
    const q = buildQuestions(champions);
    setQuestions(q);
    setIdx(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(true);
  };

  const current = questions[idx];

  const selectChoice = (choice) => {
    if (selected) return;
    setSelected(choice);
    if (choice === current.answer) setScore(s => s + 1);
    // passage auto à la question suivante après 900ms
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx(i => i + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 900);
  };

  if (!ready) return <p className="p-6 text-lg">Chargement du quiz…</p>;

  if (!started) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Quiz League of Legends</h1>
        <p className="text" style={{ marginBottom: 16 }}>
          10 questions aléatoires sur les régions, rôles et titres des champions.
        </p>
        <button className="chip" onClick={startQuiz}>▶ Lancer le quiz</button>
      </div>
    );
  }

  if (finished) {
    const ratio = Math.round((score / questions.length) * 100);
    const msg = ratio >= 80 ? "Grand maître du lore !" :
                ratio >= 60 ? "Solide connaissance !" :
                ratio >= 40 ? "Pas mal, continue !" : "On s’échauffe 🔥";
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Résultats</h1>
        <p className="text">Score : <strong>{score}/{questions.length}</strong> — {ratio}%</p>
        <p className="text" style={{ marginTop: 8 }}>{msg}</p>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button className="chip" onClick={startQuiz}>↻ Rejouer</button>
          <a className="chip" href="/quiz">Retour au quiz</a>
          <a className="chip" href="/">Retour aux champions</a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            Question {idx + 1} / {questions.length}
          </h2>
          <div className="chip">Score : {score}</div>
        </div>

        <p className="text" style={{ fontSize: "1.05rem", marginTop: 8 }}>
          {current.question}
        </p>

        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", marginTop: 14 }}>
          {current.choices.map((ch) => {
            const isSel = selected === ch;
            const isGood = selected && ch === current.answer;
            const isBad = selected && ch === selected && ch !== current.answer;
            return (
              <button
                key={ch}
                className="chip"
                style={{
                  borderColor: isGood ? "#38b000" : isBad ? "#e74c3c" : "var(--line)",
                  color: isGood ? "#38b000" : isBad ? "#e74c3c" : "var(--muted)",
                  pointerEvents: selected ? "none" : "auto",
                  transform: isSel ? "scale(0.98)" : "none"
                }}
                onClick={() => selectChoice(ch)}
              >
                {ch}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}