'use client';

import { useAOS } from '@/lib/animations';

/**
 * Example component demonstrating AOS (Animate on Scroll)
 * Shows scroll reveal animations with various options
 */
export function AOSExample() {
  // Initialize AOS - call this once at page or app level
  useAOS();

  return (
    <div className="space-y-20 p-8">
      <h2 className="text-2xl font-bold">AOS (Animate On Scroll) Examples</h2>
      <p className="text-gray-600">
        Scroll down to see elements animate as they come into view
      </p>

      {/* Fade In */}
      <div
        data-aos="fade-in"
        className="rounded-lg bg-blue-100 p-6"
      >
        <h3 className="font-bold">Fade In</h3>
        <p>This element fades in as you scroll towards it</p>
      </div>

      {/* Fade Up */}
      <div
        data-aos="fade-up"
        className="rounded-lg bg-green-100 p-6"
      >
        <h3 className="font-bold">Fade Up</h3>
        <p>This element fades and slides up into view</p>
      </div>

      {/* Fade Down */}
      <div
        data-aos="fade-down"
        className="rounded-lg bg-yellow-100 p-6"
      >
        <h3 className="font-bold">Fade Down</h3>
        <p>This element fades and slides down into view</p>
      </div>

      {/* Fade Left */}
      <div
        data-aos="fade-left"
        className="rounded-lg bg-purple-100 p-6"
      >
        <h3 className="font-bold">Fade Left</h3>
        <p>This element fades and slides in from the right</p>
      </div>

      {/* Fade Right */}
      <div
        data-aos="fade-right"
        className="rounded-lg bg-pink-100 p-6"
      >
        <h3 className="font-bold">Fade Right</h3>
        <p>This element fades and slides in from the left</p>
      </div>

      {/* Zoom In */}
      <div
        data-aos="zoom-in"
        className="rounded-lg bg-orange-100 p-6"
      >
        <h3 className="font-bold">Zoom In</h3>
        <p>This element zooms in as it comes into view</p>
      </div>

      {/* Flip */}
      <div
        data-aos="flip-left"
        className="rounded-lg bg-indigo-100 p-6"
      >
        <h3 className="font-bold">Flip Left</h3>
        <p>This element flips in from the left</p>
      </div>

      {/* Bounce */}
      <div
        data-aos="bounce"
        className="rounded-lg bg-red-100 p-6"
      >
        <h3 className="font-bold">Bounce</h3>
        <p>This element bounces as it comes into view</p>
      </div>

      {/* With Delay */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="rounded-lg bg-cyan-100 p-6"
      >
        <h3 className="font-bold">Fade Up (Delayed 200ms)</h3>
        <p>This element has a 200ms delay before animation starts</p>
      </div>

      {/* With Duration */}
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="rounded-lg bg-teal-100 p-6"
      >
        <h3 className="font-bold">Fade Up (Duration 1.5s)</h3>
        <p>This element animates over 1.5 seconds instead of default 1s</p>
      </div>

      {/* Repeat Animation */}
      <div
        data-aos="flip-up"
        data-aos-once="false"
        className="rounded-lg bg-lime-100 p-6"
      >
        <h3 className="font-bold">Flip Up (Repeats)</h3>
        <p>This element animates every time it enters the viewport</p>
      </div>

      {/* Grid of animated items */}
      <div className="space-y-4">
        <h3 className="font-bold">Grid of Staggered Items</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              data-aos="fade-up"
              data-aos-delay={`${(item - 1) * 100}`}
              className="rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 p-6 text-white"
            >
              <p className="font-bold">Item {item}</p>
              <p className="text-sm opacity-80">Delay: {(item - 1) * 100}ms</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to end */}
      <div className="rounded-lg bg-gray-200 p-8 text-center">
        <p className="text-lg font-bold">You&apos;ve reached the bottom!</p>
      </div>
    </div>
  );
}
