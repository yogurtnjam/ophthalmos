import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const goalConfig = {
  taps: 8,
  swipes: 12,
};

const baseColors = {
  ios: {
    tap: '#ef4444',
    swipe: '#2563eb',
    tilePrimary: '#ef4444',
    tileOdd: '#f97316',
  },
  aui: {
    tap: '#f97316',
    swipe: '#22c55e',
    tilePrimary: '#22d3ee',
    tileOdd: '#facc15',
  },
};

export default function TaskSuite({ mode, onLog }) {
  const colors = baseColors[mode];

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Task battery</p>
          <h2>Run study tasks in {mode === 'ios' ? 'iOS filter' : 'Adaptive'} mode</h2>
        </div>
        <span className="badge">Collect metrics</span>
      </header>
      <div className="task-grid">
        <ColorTapTask mode={mode} colors={colors} onLog={onLog} />
        <SwipeTask mode={mode} colors={colors} onLog={onLog} />
        <OddTileTask mode={mode} colors={colors} onLog={onLog} />
      </div>
    </section>
  );
}

TaskSuite.propTypes = {
  mode: PropTypes.oneOf(['ios', 'aui']).isRequired,
  onLog: PropTypes.func.isRequired,
};

function ColorTapTask({ mode, colors, onLog }) {
  const [tapCount, setTapCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('Tap the color button 8 times.');

  const handleStart = () => {
    setTapCount(0);
    setStartTime(Date.now());
    setIsRunning(true);
    setMessage('Clock started. Tap away!');
  };

  const handleTap = () => {
    if (!isRunning) return;
    const updatedCount = tapCount + 1;
    setTapCount(updatedCount);
    if (updatedCount === goalConfig.taps) {
      const duration = (Date.now() - startTime) / 1000;
      setIsRunning(false);
      setMessage(`Finished in ${duration.toFixed(1)}s.`);
      onLog({
        task: 'Color Button',
        condition: mode,
        time: duration,
        accuracy: 1,
        extra: `${goalConfig.taps} taps`,
      });
    }
  };

  return (
    <article className="task-card">
      <header>
        <h3>Colored Button</h3>
        <small>Time to complete</small>
      </header>
      <p>{message}</p>
      <div className="task-actions">
        <button type="button" className="ghost" onClick={handleStart}>
          Reset & start timer
        </button>
        <button
          type="button"
          className="tap-button"
          style={{ background: colors.tap }}
          onClick={handleTap}
        >
          Tap me ({tapCount}/{goalConfig.taps})
        </button>
      </div>
    </article>
  );
}

ColorTapTask.propTypes = {
  mode: PropTypes.oneOf(['ios', 'aui']).isRequired,
  colors: PropTypes.shape({
    tap: PropTypes.string.isRequired,
  }).isRequired,
  onLog: PropTypes.func.isRequired,
};

function SwipeTask({ mode, colors, onLog }) {
  const [startPoint, setStartPoint] = useState(null);
  const [swipes, setSwipes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('Swipe across the pad 12 times.');

  const begin = () => {
    setSwipes(0);
    setStartTime(Date.now());
    setIsRunning(true);
    setMessage('Tracking swipes…');
  };

  const finish = () => {
    const duration = (Date.now() - startTime) / 1000;
    setIsRunning(false);
    setMessage(`Complete in ${duration.toFixed(1)}s with ${swipes} swipes.`);
    onLog({
      task: 'Swipe Tracker',
      condition: mode,
      time: duration,
      accuracy: 1,
      extra: `${swipes} swipes`,
    });
  };

  const handlePointerDown = (event) => {
    if (!isRunning) return;
    setStartPoint({ x: event.clientX, y: event.clientY });
  };

  const handlePointerUp = (event) => {
    if (!isRunning || !startPoint) return;
    const distance = Math.hypot(event.clientX - startPoint.x, event.clientY - startPoint.y);
    if (distance > 30) {
      const updated = swipes + 1;
      setSwipes(updated);
      if (updated === goalConfig.swipes) {
        finish();
      }
    }
  };

  return (
    <article className="task-card">
      <header>
        <h3>Swipe Pad</h3>
        <small>Counts gestures</small>
      </header>
      <p>{message}</p>
      <div className="task-actions">
        <button type="button" className="ghost" onClick={begin}>
          Reset & start timer
        </button>
      </div>
      <div
        className="swipe-pad"
        style={{ borderColor: colors.swipe }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <span>{swipes}/{goalConfig.swipes} swipes</span>
      </div>
    </article>
  );
}

SwipeTask.propTypes = {
  mode: PropTypes.oneOf(['ios', 'aui']).isRequired,
  colors: PropTypes.shape({
    swipe: PropTypes.string.isRequired,
  }).isRequired,
  onLog: PropTypes.func.isRequired,
};

function OddTileTask({ mode, colors, onLog }) {
  const [tiles, setTiles] = useState(() => generateTiles(colors));
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 9));
  const [startTime, setStartTime] = useState(null);
  const [message, setMessage] = useState('Find the odd tile.');
  const [attempts, setAttempts] = useState(0);

  const regenerate = () => {
    setTiles(generateTiles(colors));
    const index = Math.floor(Math.random() * 9);
    setTarget(index);
    setStartTime(Date.now());
    setAttempts(0);
    setMessage('Timer running…');
  };

  const handlePick = (index) => {
    if (!startTime) return;
    setAttempts((prev) => prev + 1);
    const isCorrect = index === target;
    if (isCorrect) {
      const duration = (Date.now() - startTime) / 1000;
      const accuracy = attempts === 0 ? 1 : 1 - attempts * 0.1;
      setMessage(`Correct! ${duration.toFixed(1)}s, ${attempts + 1} taps.`);
      setStartTime(null);
      onLog({
        task: 'Odd Tile',
        condition: mode,
        time: duration,
        accuracy: Math.max(0, accuracy),
        extra: `${attempts + 1} taps`,
      });
    } else {
      setMessage('Try again — look for contrast cues.');
    }
  };

  const tileSet = useMemo(() => tiles.map((tile, index) => ({ ...tile, isOdd: index === target })), [tiles, target]);

  return (
    <article className="task-card">
      <header>
        <h3>Odd Tile Search</h3>
        <small>Accuracy + time</small>
      </header>
      <p>{message}</p>
      <div className="task-actions">
        <button type="button" className="ghost" onClick={regenerate}>
          Start new round
        </button>
      </div>
      <div className="tile-grid">
        {tileSet.map((tile, index) => (
          <button
            type="button"
            key={tile.id}
            className="tile"
            style={{ background: tile.isOdd ? colors.tileOdd : colors.tilePrimary, opacity: tile.opacity }}
            onClick={() => handlePick(index)}
          />
        ))}
      </div>
    </article>
  );
}

OddTileTask.propTypes = {
  mode: PropTypes.oneOf(['ios', 'aui']).isRequired,
  colors: PropTypes.shape({
    tilePrimary: PropTypes.string.isRequired,
    tileOdd: PropTypes.string.isRequired,
  }).isRequired,
  onLog: PropTypes.func.isRequired,
};

function generateTiles(colors) {
  return Array.from({ length: 9 }, (_, index) => ({
    id: `${colors.tilePrimary}-${index}-${Math.random()}`,
    opacity: 0.7 + (index % 3) * 0.1,
  }));
}
