'use client'

import { useCallback } from 'react'

import { Particles, ParticlesProvider } from '@tsparticles/react'
import type { ParticlesPluginRegistrar } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const particlesOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 55 },
    color: { value: ['#009c3b', '#00c44b', '#33d66b', '#ffdf00', '#ffe94d'] },
    size: { value: { min: 1, max: 3.5 } },
    opacity: {
      value: { min: 0.08, max: 0.45 },
      animation: { enable: true, speed: 0.8, sync: false },
    },
    move: {
      enable: true,
      direction: 'top' as const,
      speed: { min: 0.4, max: 1.6 },
      random: true,
      straight: false,
      outModes: { default: 'out' as const },
    },
    shape: { type: 'circle' },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' as const },
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  detectRetina: true,
}

function ParticlesInner() {
  return (
    <Particles
      id="global-brasa-particles"
      className="fixed inset-0 z-0 pointer-events-none"
      options={particlesOptions}
    />
  )
}

export function GlobalParticles() {
  const initEngine = useCallback<ParticlesPluginRegistrar>(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <ParticlesProvider init={initEngine}>
      <ParticlesInner />
    </ParticlesProvider>
  )
}
