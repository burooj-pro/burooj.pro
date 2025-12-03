import type { MaybeRef } from 'vue'
import { nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGsap = () => {
  const prefersReducedMotion = useState(
    'prefersReducedMotion',
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false)
  )

  const fadeInUp = (target: MaybeRef<HTMLElement | null>, options: gsap.TweenVars = {}) => {
    if (prefersReducedMotion.value) {
      return
    }

    onMounted(() => {
      if (typeof window === 'undefined') return
      
      nextTick(() => {
        const el = unref(target)
        if (!el) return

        // Set initial state
        gsap.set(el, { opacity: 0, y: 30 })

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          ...options,
        })
      })
    })
  }

  const fadeInFromSide = (target: MaybeRef<HTMLElement | null>, direction: 'left' | 'right' = 'left', options: gsap.TweenVars = {}) => {
    if (prefersReducedMotion.value) {
      return
    }

    onMounted(() => {
      if (typeof window === 'undefined') return
      
      nextTick(() => {
        const el = unref(target)
        if (!el) return

        const xValue = direction === 'left' ? -50 : 50

        // Set initial state
        gsap.set(el, { opacity: 0, x: xValue })

        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          ...options,
        })
      })
    })
  }

  const scaleIn = (target: MaybeRef<HTMLElement | null>, options: gsap.TweenVars = {}) => {
    if (prefersReducedMotion.value) {
      return
    }

    onMounted(() => {
      if (typeof window === 'undefined') return
      
      nextTick(() => {
        const el = unref(target)
        if (!el) return

        // Set initial state
        gsap.set(el, { opacity: 0, scale: 0.95 })

        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          ...options,
        })
      })
    })
  }

  const staggerFadeIn = (targets: MaybeRef<HTMLElement[] | null>, options: { stagger?: number; delay?: number } = {}) => {
    if (prefersReducedMotion.value) {
      return
    }

    onMounted(() => {
      if (typeof window === 'undefined') return
      
      nextTick(() => {
        setTimeout(() => {
          const els = unref(targets)
          if (!els || els.length === 0) return

          // Filter out null/undefined elements
          const validEls = els.filter(el => el !== null && el !== undefined)
          if (validEls.length === 0) return

          // Set initial state
          gsap.set(validEls, { opacity: 0, y: 30 })

          gsap.to(validEls, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: options.stagger || 0.1,
            delay: options.delay || 0,
            scrollTrigger: {
              trigger: validEls[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          })
        }, 100)
      })
    })
  }

  const expandImageOnScroll = (target: MaybeRef<HTMLElement | null>, options: { start?: string; end?: string } = {}) => {
    if (prefersReducedMotion.value) {
      return
    }

    onMounted(() => {
      const el = unref(target)
      if (!el) return

      gsap.to(el, {
        width: '100%',
        borderRadius: '0',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 80%',
          end: options.end || 'top 20%',
          scrub: true,
        },
      })
    })
  }

  const animateCounter = (target: MaybeRef<HTMLElement | null>, endValue: number, options: { duration?: number; prefix?: string } = {}) => {
    if (prefersReducedMotion.value) {
      return
    }

    if (typeof window === 'undefined') return

    const el = unref(target)
    if (!el) {
      return
    }

    const duration = options.duration || 2
    const prefix = options.prefix || ''

    // Set initial value to 0
    el.textContent = `${prefix}0`

    const obj = { value: 0 }
    
    // Check if element is already in viewport (might be visible due to fixed hero)
    const checkAndAnimate = () => {
      const rect = el.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isInView) {
        // If already visible, animate immediately
        gsap.to(obj, {
          value: endValue,
          duration,
          ease: 'power2.out',
          onUpdate: function () {
            const currentValue = Math.floor(obj.value)
            if (el) {
              el.textContent = `${prefix}${currentValue}`
            }
          },
        })
      } else {
        // Otherwise, use ScrollTrigger
        gsap.to(obj, {
          value: endValue,
          duration,
          ease: 'power2.out',
          onUpdate: function () {
            const currentValue = Math.floor(obj.value)
            if (el) {
              el.textContent = `${prefix}${currentValue}`
            }
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        })
      }
    }
    
    // Check immediately and also after a short delay to account for hero section pinning
    checkAndAnimate()
    setTimeout(checkAndAnimate, 100)
  }

  const fixedHero = (target: MaybeRef<HTMLElement | null>) => {
    if (prefersReducedMotion.value) {
      return
    }

    onMounted(() => {
      const el = unref(target)
      if (!el) return

      // Pin the hero section while scrolling - sections scroll over it
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
      })
    })
  }

  return { 
    fadeInUp, 
    fadeInFromSide, 
    scaleIn, 
    staggerFadeIn,
    expandImageOnScroll, 
    animateCounter, 
    fixedHero 
  }
}

