import { participantRoster, sessionPlan } from '../data/participants.js';

export default function ParticipantPanel() {
  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Participants & flow</p>
          <h2>8-person within-subjects study</h2>
        </div>
        <span className="badge">15 min</span>
      </header>
      <div className="participant-grid">
        {participantRoster.map((participant) => (
          <article key={participant.name} className="participant-card">
            <p>{participant.name}</p>
            <small>{participant.affiliation}</small>
          </article>
        ))}
      </div>
      <ol className="session-plan">
        {sessionPlan.map((item) => (
          <li key={item.phase}>
            <strong>{item.phase}</strong>
            <span>{item.duration} min</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
