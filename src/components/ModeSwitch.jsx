import PropTypes from 'prop-types';

const modes = [
  { id: 'ios', label: 'iOS Color Filter', description: 'Static, system-wide adjustments' },
  { id: 'aui', label: 'Adaptive UI', description: 'Learns from usage + per-app tuning' },
];

export default function ModeSwitch({ activeMode, onChange }) {
  return (
    <div className="mode-switch">
      {modes.map((mode) => {
        const isActive = activeMode === mode.id;
        return (
          <button
            key={mode.id}
            className={isActive ? 'mode-switch__button mode-switch__button--active' : 'mode-switch__button'}
            onClick={() => onChange(mode.id)}
            type="button"
          >
            <div>
              <p>{mode.label}</p>
              <small>{mode.description}</small>
            </div>
            <span className="mode-switch__dot" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

ModeSwitch.propTypes = {
  activeMode: PropTypes.oneOf(['ios', 'aui']).isRequired,
  onChange: PropTypes.func.isRequired,
};
