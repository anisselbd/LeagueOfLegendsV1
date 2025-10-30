import { useEffect, useMemo, useState } from "react";
import { useChampions } from "../store/useChampions";
import regionMap from "../data/championRegions.json";
import { Link } from "react-router-dom";
import '../index.css';




const cardStyle = {
  background: 'rgba(20, 24, 34, 0.98)',
  borderRadius: '22px',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)',
  padding: '2.5rem 2rem',
  maxWidth: 600,
  margin: '2rem auto',
  border: '2.5px solid #c89b3c',
  fontFamily: "'Cinzel', serif"
};

const quizButton = {
  padding: '1.1rem 2.2rem',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '2rem',
  border: '2.5px solid #c89b3c',
  background: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
  color: '#fff',
  textDecoration: 'none',
  boxShadow: '0 4px 18px 0 rgba(0,0,0,0.18)',
  cursor: 'pointer',
  transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s, background 0.15s',
  margin: '0.5rem 0',
  letterSpacing: '1px',
  outline: 'none',
  fontFamily: "'Cinzel', serif",
};




function QuizButton({ children, ...props }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      {...props}
      style={{
        ...quizButton,
        ...(props.style || {}),
        transform: hover ? 'scale(1.07)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
}

const getChoiceStyle = (isSel, isGood, isBad) => ({
  ...quizButton,
  borderColor: isGood ? '#38b000' : isBad ? '#e74c3c' : '#c89b3c',
  color: isGood ? '#38b000' : isBad ? '#e74c3c' : '#fff',
  background: isGood
    ? 'linear-gradient(90deg, #38b000 0%, #a3ffb0 100%)'
    : isBad
      ? 'linear-gradient(90deg, #e74c3c 0%, #ffb3b3 100%)'
      : quizButton.background,
  transform: isSel ? 'scale(0.97)' : 'none',
  boxShadow: isSel ? '0 0 0 3px #c89b3c55' : quizButton.boxShadow,
  pointerEvents: isGood || isBad ? 'none' : 'auto',
});

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

  if (!ready) return <p className="p-6 text-lg" style={{ fontFamily: "'Cinzel', serif" }}>Chargement du quiz…</p>;

  if (!started) {
    return (
      <div className="p-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', position: 'relative' }}>
        <Link to="/" style={{ position: 'absolute', left: 0, top: 0, margin: '1.5rem', zIndex: 2, textDecoration: 'none' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.6rem 1.5rem',
            borderRadius: '2rem',
            border: '2.5px solid #c89b3c',
            background: '#181818cc',
            color: '#c89b3c',
            fontWeight: 700,
            fontFamily: "'Cinzel', serif",
            fontSize: '1rem',
            boxShadow: '0 2px 8px #0002',
            transition: 'transform 0.15s',
            cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            ← Retour
          </span>
        </Link>
        <div style={cardStyle}>
          <h1 style={{ fontSize: '2rem', marginBottom: 12, textAlign: 'center', color: '#fff', textShadow: '0 2px 8px #000, 0 0 2px #c89b3c', fontFamily: "'Cinzel', serif" }}>Quiz League of Legends</h1>
          <p className="text" style={{ marginBottom: 16, textAlign: 'center' }}>
            10 questions aléatoires sur les régions, rôles et titres des champions.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <QuizButton onClick={startQuiz}>▶ Lancer le quiz</QuizButton>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const ratio = Math.round((score / questions.length) * 100);
    const msg = ratio >= 80 ? "Grand maître du lore !" :
      ratio >= 60 ? "Solide connaissance !" :
        ratio >= 40 ? "Pas mal, continue !" : "On s’échauffe 🔥";
    return (
      <div className="p-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: '2rem', marginBottom: 12, textAlign: 'center', color: '#fff', textShadow: '0 2px 8px #000, 0 0 2px #c89b3c', fontFamily: "'Cinzel', serif" }}>Résultats</h1>
          <p className="text" style={{ fontSize: '1.2rem', textAlign: 'center' }}>Score : <strong>{score}/{questions.length}</strong> — {ratio}%</p>
          <p className="text" style={{ marginTop: 8, textAlign: 'center', fontWeight: 600 }}>{msg}</p>
          <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: 'center' }}>
            <QuizButton onClick={startQuiz}>↻ Rejouer</QuizButton>
            <a style={quizButton} href="/quiz">Retour au quiz</a>
            <a style={quizButton} href="/">Retour aux champions</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', background: 'none', position: 'relative' }}>
      <Link to="/" style={{ position: 'absolute', left: 0, top: 0, margin: '1.5rem', zIndex: 2, textDecoration: 'none' }}>
        <span style={{
          display: 'inline-block',
          padding: '0.6rem 1.5rem',
          borderRadius: '2rem',
          border: '2.5px solid #c89b3c',
          background: '#181818cc',
          color: '#c89b3c',
          fontWeight: 700,
          fontFamily: "'Cinzel', serif",
          fontSize: '1rem',
          boxShadow: '0 2px 8px #0002',
          transition: 'transform 0.15s',
          cursor: 'pointer',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          ← Retour
        </span>
      </Link>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 0, fontFamily: "'Cinzel', serif", color: '#fff', fontSize: '1.3rem', textShadow: '0 1px 4px #000, 0 0 2px #c89b3c' }}>
            Question {idx + 1} / {questions.length}
          </h2>
          <div style={{ ...quizButton, fontSize: '1rem', padding: '0.5rem 1.2rem', background: '#232526', border: '2px solid #c89b3c', color: '#c89b3c', boxShadow: 'none' }}>Score : {score}</div>
        </div>

        <p className="text" style={{ fontSize: "1.15rem", marginTop: 18, marginBottom: 18, textAlign: 'center', fontWeight: 600, color: '#fff', fontFamily: "'Cinzel', serif" }}>
          {current.question}
        </p>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", marginTop: 14 }}>
          {current.choices.map((ch) => {
            const isSel = selected === ch;
            const isGood = selected && ch === current.answer;
            const isBad = selected && ch === selected && ch !== current.answer;
            return (
              <QuizButton
                key={ch}
                style={getChoiceStyle(isSel, isGood, isBad)}
                onClick={() => selectChoice(ch)}
                disabled={!!selected}
              >
                {ch}
              </QuizButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}