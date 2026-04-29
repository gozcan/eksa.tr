'use client';

import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/animated-button';
import { AnimatedCard } from '@/components/animated-card';
import { AnimatedText, AnimatedCharacter } from '@/components/animated-text';
import { InteractiveDragCard, HoverReveal } from '@/components/interactive-elements';
import { EnhancedSection, AnimatedList } from '@/components/enhanced-section';
import { useAOS } from '@/lib/animations';

export default function AnimationShowcasePage() {
  useAOS();

  const sampleCards = [
    { id: '1', title: 'Card 1', description: 'Interactive card with hover effects' },
    { id: '2', title: 'Card 2', description: 'Smooth animations on scroll' },
    { id: '3', title: 'Card 3', description: 'Staggered entrance animations' },
  ];

  const listItems = [
    { id: '1', content: 'Framer Motion for interactive animations' },
    { id: '2', content: 'React Use Gesture for drag and touch' },
    { id: '3', content: 'AOS for scroll reveal animations' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold">Animation Libraries Showcase</h1>
        <p className="mt-4 text-xl text-gray-400">
          Framer Motion • React Use Gesture • AOS
        </p>
      </motion.div>

      {/* Animated Text Examples */}
      <EnhancedSection
        className="mb-16 space-y-8"
        aosAnimation="fade-up"
      >
        <div>
          <h2 className="mb-8 text-3xl font-bold">Text Animation Examples</h2>

          <div className="space-y-6">
            <div className="rounded-lg bg-gray-800 p-6">
              <p className="mb-4 text-sm uppercase text-gray-400">Word Stagger Animation</p>
              <AnimatedText
                text="Each word animates in with a staggered effect"
                className="text-2xl font-bold"
              />
            </div>

            <div className="rounded-lg bg-gray-800 p-6">
              <p className="mb-4 text-sm uppercase text-gray-400">Character Animation</p>
              <AnimatedCharacter
                text="ANIMATED"
                className="text-4xl font-bold tracking-wider"
              />
            </div>
          </div>
        </div>
      </EnhancedSection>

      {/* Buttons */}
      <EnhancedSection className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Interactive Buttons</h2>
        <div
          className="space-y-4"
          data-aos="fade-up"
        >
          <AnimatedButton variant="primary">Primary Button</AnimatedButton>
          <AnimatedButton variant="secondary">Secondary Button</AnimatedButton>
          <AnimatedButton variant="outline">Outline Button</AnimatedButton>
        </div>
      </EnhancedSection>

      {/* Animated Cards */}
      <EnhancedSection className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Animated Cards</h2>
        <div
          className="grid gap-6 md:grid-cols-3"
          data-aos="fade-up"
        >
          {sampleCards.map((card, index) => (
            <AnimatedCard
              key={card.id}
              delay={index * 0.1}
              className="rounded-lg border border-gray-700 bg-gray-800 p-6 hover:border-gray-600"
            >
              <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </EnhancedSection>

      {/* Draggable Cards */}
      <EnhancedSection className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Interactive Drag Cards</h2>
        <div
          className="space-y-4"
          data-aos="fade-up"
        >
          <InteractiveDragCard
            title="Drag Me!"
            description="You can drag this card around"
            onDragEnd={(pos) => console.log('Dropped at:', pos)}
          >
            <p className="text-sm text-gray-600">Drop position will be logged to console</p>
          </InteractiveDragCard>
        </div>
      </EnhancedSection>

      {/* Hover Reveal */}
      <EnhancedSection className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Hover Reveal Animation</h2>
        <div data-aos="fade-up">
          <HoverReveal
            className="h-[300px] rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-6"
            revealContent={
              <div className="text-center">
                <p className="text-2xl font-bold">Hidden Content!</p>
              </div>
            }
          >
            <div className="flex h-full items-center justify-center">
              <p className="text-2xl font-bold">Hover Over Me</p>
            </div>
          </HoverReveal>
        </div>
      </EnhancedSection>

      {/* Scroll Reveal List */}
      <EnhancedSection>
        <h2 className="mb-8 text-3xl font-bold">Scroll Reveal List</h2>
        <AnimatedList
          items={listItems}
          className="space-y-0"
          itemClassName="rounded-lg border border-gray-700 bg-gray-800 p-6 hover:border-gray-600 transition-colors"
          staggerDelay={100}
        />
      </EnhancedSection>

      {/* AOS Animation Examples */}
      <div className="mt-20 space-y-20 py-20">
        <h2 className="text-3xl font-bold">AOS Scroll Animations</h2>

        <div
          className="rounded-lg bg-gradient-to-r from-green-600 to-blue-600 p-12 text-center"
          data-aos="fade-up"
        >
          <p className="text-2xl font-bold">Fade Up</p>
        </div>

        <div
          className="rounded-lg bg-gradient-to-r from-pink-600 to-orange-600 p-12 text-center"
          data-aos="flip-left"
          data-aos-duration="1500"
        >
          <p className="text-2xl font-bold">Flip Left (1.5s)</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-center"
              data-aos="zoom-in"
              data-aos-delay={`${(item - 1) * 200}`}
            >
              <p className="text-lg font-bold">Zoom In #{item}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-lg border-2 border-dashed border-gray-600 p-12 text-center"
          data-aos="bounce"
          data-aos-once="false"
        >
          <p className="text-xl font-bold">Bounce Animation (Repeats)</p>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-20 border-t border-gray-700 py-8 text-center text-gray-400"
      >
        <p>All animations use Framer Motion, React Use Gesture, and AOS</p>
        <p className="mt-2">Scroll to see more animations in action</p>
      </motion.div>
    </main>
  );
}
