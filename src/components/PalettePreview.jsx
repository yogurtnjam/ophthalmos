import PropTypes from 'prop-types';

const basePalettes = [
  {
    app: 'Instagram',
    description: 'Story ring + reel buttons',
    tokens: ['#f77737', '#c13584', '#5851d8', '#405de6'],
  },
  {
    app: 'Transit',
    description: 'Line badges + alerts',
    tokens: ['#16a34a', '#dc2626', '#facc15', '#2563eb'],
  },
  {
    app: 'Shop',
    description: 'Action buttons and states',
    tokens: ['#ec4899', '#f97316', '#0ea5e9', '#14b8a6'],
  },
];

export default function PalettePreview({ mode, coneValues }) {
  const shift = (channel) => 1 - coneValues[channel] / 100;

  const adjustColor = (hex, channel) => {
    const value = Math.min(1, Math.max(0, shift(channel)));
    const opacity = mode === 'aui' ? 0.55 + value * 0.4 : 0.4;
    return `color-mix(in srgb, ${hex}, #ffffff ${opacity * 40}%)`;
  };

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Color strategy</p>
          <h2>Preview per-app tuning</h2>
        </div>
        <span className="badge">Live simulation</span>
      </header>
      <div className="palette-grid">
        {basePalettes.map((palette) => (
          <article key={palette.app} className="palette-card">
            <div className="palette-card__header">
              <h3>{palette.app}</h3>
              <small>{palette.description}</small>
            </div>
            <div className="swatches">
              {palette.tokens.map((token, index) => (
                <span
                  key={token}
                  className="swatch"
                  style={{
                    background:
                      mode === 'ios'
                        ? token
                        : adjustColor(token, index % 3 === 0 ? 'l' : index % 3 === 1 ? 'm' : 's'),
                  }}
                />
              ))}
            </div>
            {mode === 'aui' ? (
              <p className="swatch-note">
                Auto-balancing hue, saturation, and contrast per participant profile.
              </p>
            ) : (
              <p className="swatch-note">Static tint applied uniformly across all apps.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

PalettePreview.propTypes = {
  mode: PropTypes.oneOf(['ios', 'aui']).isRequired,
  coneValues: PropTypes.shape({
    l: PropTypes.number,
    m: PropTypes.number,
    s: PropTypes.number,
  }).isRequired,
};
