'use client';

import { useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

/**
 * Example component demonstrating React Use Gesture
 * Shows mouse/touch gesture detection: drag, hover, click
 */
export function ReactUseGestureExample() {
  const [{ x, y }, springsApi] = useSpring(() => ({ x: 0, y: 0 }));
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  // Gesture detection with @use-gesture/react
  const bind = useGesture({
    // Drag gesture
    onDrag: ({ offset: [ox, oy] }) => {
      springsApi.start({ x: ox, y: oy });
      setPosition({ x: ox, y: oy });
    },

    // Hover gesture
    onHover: ({ hovering }) => {
      setIsHovered(hovering ?? false);
    },

    // Click gesture
    onClick: () => {
      setClickCount((c) => c + 1);
    },

    // Wheel gesture (scroll)
    onWheel: ({ movement: [, my] }) => {
      springsApi.start({ y: y.get() - my });
    },
  });

  const resetPosition = () => {
    springsApi.start({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setClickCount(0);
  };

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold">React Use Gesture Examples</h2>

      {/* Draggable element */}
      <div className="rounded-lg bg-gray-100 p-6">
        <h3 className="mb-4 font-bold">Draggable Element</h3>
        <p className="mb-4 text-sm text-gray-600">
          Drag this box around using your mouse or touch
        </p>
        <animated.div
          ref={ref}
          {...bind()}
          style={{
            x,
            y,
            touchAction: 'none',
          }}
          className={`rounded-lg p-6 transition-colors ${isHovered ? 'bg-blue-400' : 'bg-blue-500'} cursor-grab`}
        >
          <p className="text-center font-medium text-white">Drag me!</p>
          <p className="text-center text-sm text-blue-100">
            Position: ({position.x.toFixed(0)}, {position.y.toFixed(0)})
          </p>
        </animated.div>
      </div>

      {/* Gesture stats */}
      <div className="rounded-lg bg-green-100 p-6">
        <h3 className="mb-4 font-bold">Gesture Stats</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Current X:</span> {position.x.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Current Y:</span> {position.y.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Hovering:</span> {isHovered ? '✓ Yes' : '✗ No'}
          </p>
          <p>
            <span className="font-medium">Clicks:</span> {clickCount}
          </p>
        </div>
      </div>

      {/* Multi-touch example */}
      <div className="rounded-lg bg-purple-100 p-6">
        <h3 className="mb-4 font-bold">Touch Friendly</h3>
        <p className="mb-4 text-sm text-gray-600">
          This component works with both mouse and touch events
        </p>
        <div className="rounded-lg bg-purple-500 p-8 text-center text-white">
          <p>Try dragging with your mouse or touch</p>
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={resetPosition}
        className="rounded-lg bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600"
      >
        Reset Position & Count
      </button>
    </div>
  );
}
