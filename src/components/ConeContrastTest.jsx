import PropTypes from 'prop-types';

const sliderConfig = [
  { key: 'l', label: 'L-cone (red)', description: 'Protan sensitivity' },
  { key: 'm', label: 'M-cone (green)', description: 'Deutan sensitivity' },
  { key: 's', label: 'S-cone (blue)', description: 'Tritan sensitivity' },
];

export default function ConeContrastTest({ values, onChange }) {
  const insights = [
    values.l <= 40 && 'Reduce reliance on pure reds; boost outline contrast.',
    values.m <= 70 && 'Fine-tune green shades so adjacent hues stay distinct.',
    values.s <= 35 && 'Limit blue-yellow differentials; lean on magenta cues.',
  ].filter(Boolean);

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Cone Contrast</p>
          <h2>Measure and adapt sensitivities</h2>
        </div>
        <span className="badge">3–5 min</span>
      </header>
      <div className="grid grid--three">
        {sliderConfig.map((config) => (
          <label key={config.key} className="slider-card">
            <div className="slider-card__label">
              <p>{config.label}</p>
              <span>{values[config.key]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values[config.key]}
              onChange={(event) =>
                onChange({ ...values, [config.key]: Number(event.target.value) })
              }
            />
            <small>{config.description}</small>
          </label>
        ))}
      </div>
      <div className="insight">
        <h3>Adaptive recommendations</h3>
        {insights.length === 0 ? (
          <p>All cone classes are near baseline—use presets or pilot new blends.</p>
        ) : (
          <ul>
            {insights.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

ConeContrastTest.propTypes = {
  values: PropTypes.shape({
    l: PropTypes.number,
    m: PropTypes.number,
    s: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
