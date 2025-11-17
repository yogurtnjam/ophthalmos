import PropTypes from 'prop-types';

export default function SessionSummary({ logs }) {
  const grouped = logs.reduce((acc, log) => {
    const key = `${log.condition}-${log.task}`;
    acc[key] = acc[key] || [];
    acc[key].push(log);
    return acc;
  }, {});

  const rows = Object.entries(grouped).map(([key, attempts]) => {
    const [condition, task] = key.split('-');
    const meanTime = average(attempts.map((item) => item.time));
    const meanAccuracy = average(attempts.map((item) => item.accuracy));
    return { condition, task, meanTime, meanAccuracy, trials: attempts.length };
  });

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Study log</p>
          <h2>Quantitative snapshot</h2>
        </div>
        <span className="badge">Exports soon</span>
      </header>
      {logs.length === 0 ? (
        <p className="empty-state">Complete at least one task to populate the table.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Condition</th>
                <th>Trials</th>
                <th>Mean time (s)</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.task}-${row.condition}`}>
                  <td>{row.task}</td>
                  <td>{row.condition.toUpperCase()}</td>
                  <td>{row.trials}</td>
                  <td>{row.meanTime.toFixed(1)}</td>
                  <td>{(row.meanAccuracy * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

SessionSummary.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      condition: PropTypes.oneOf(['ios', 'aui']).isRequired,
      time: PropTypes.number.isRequired,
      accuracy: PropTypes.number.isRequired,
    })
  ).isRequired,
};

function average(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
