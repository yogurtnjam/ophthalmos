import { useMemo, useState } from 'react';
import ConeContrastTest from './components/ConeContrastTest.jsx';
import ModeSwitch from './components/ModeSwitch.jsx';
import PalettePreview from './components/PalettePreview.jsx';
import ParticipantPanel from './components/ParticipantPanel.jsx';
import SessionSummary from './components/SessionSummary.jsx';
import TaskSuite from './components/TaskSuite.jsx';

const qualitativePrompts = [
  'How easy was it to distinguish text from the background? (1–5)',
  'Did the adjusted colours feel natural? Provide an example.',
  'Did any adaptive nudges feel helpful or intrusive?',
  'Which interface did you prefer? (Likert 1–7)',
];

export default function App() {
  const [coneValues, setConeValues] = useState({ l: 55, m: 68, s: 40 });
  const [activeMode, setActiveMode] = useState('ios');
  const [logs, setLogs] = useState([]);

  const adaptiveCopy = useMemo(() => {
    const focusChannel = Object.entries(coneValues).sort((a, b) => a[1] - b[1])[0][0];
    const mapping = {
      l: 'foreground emphasis on cyan-magenta pairs',
      m: 'expanded green spectrum using warmer anchors',
      s: 'replacing blue-yellow codes with shape cues',
    };
    return mapping[focusChannel];
  }, [coneValues]);

  const makeId = () => {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const handleLog = (entry) => {
    setLogs((prev) => [...prev, { ...entry, id: makeId() }]);
  };

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">OPHTHALMOS · Adaptive CVD prototype</p>
          <h1>Plan, pilot, and log your iOS vs. adaptive study</h1>
          <p className="lead">
            Run the cone contrast test, configure per-app tuning, and capture in-situ task metrics for
            the 8-person within-subjects evaluation.
          </p>
          <div className="hero-actions">
            <ModeSwitch activeMode={activeMode} onChange={setActiveMode} />
            <p className="note">
              Currently simulating <strong>{activeMode === 'ios' ? 'static system filter' : 'learning AUI'}</strong>
              — {adaptiveCopy}.
            </p>
          </div>
        </div>
        <aside>
          <h3>Experiment recipe</h3>
          <ul>
            <li>8 CVD participants, 15 min each.</li>
            <li>Randomize iOS vs. AUI order.</li>
            <li>Track time, accuracy, and swipe counts for every task.</li>
            <li>Administer NASA-TLX + Likert + open response.</li>
          </ul>
        </aside>
      </section>

      <ConeContrastTest values={coneValues} onChange={setConeValues} />
      <PalettePreview mode={activeMode} coneValues={coneValues} />
      <ParticipantPanel />
      <TaskSuite mode={activeMode} onLog={handleLog} />
      <SessionSummary logs={logs} />

      <section className="panel">
        <header className="panel__header">
          <div>
            <p className="eyebrow">Questionnaire</p>
            <h2>Qualitative + quantitative prompts</h2>
          </div>
          <span className="badge">5 min</span>
        </header>
        <div className="questionnaire">
          {qualitativePrompts.map((prompt) => (
            <article key={prompt} className="question-card">
              <p>{prompt}</p>
              <div className="scale">
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
