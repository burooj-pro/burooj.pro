<script setup lang="ts">
useHead({ title: 'About' })
</script>

<template>
  <section class="section-wrapper space-y-8">
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.35em] text-primary">About</p>
      <h1 class="text-4xl font-semibold text-ink">About Burooj</h1>
      <p class="text-lg text-slate-600">
        Burooj is a multi-disciplinary Saudi company offering comprehensive solutions across engineering, construction, property management, and drone cleaning. We combine speed, quality, and
        technology-driven execution to support buildings and properties throughout their lifecycle.
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-2">
      <article class="rounded-3xl border border-slate-100 bg-surface p-6 shadow-soft">
        <h2 class="text-xl font-semibold text-ink">Vision</h2>
        <p class="mt-3 text-slate-600">
          To become the region’s most trusted provider of integrated property, engineering, and cleaning solutions through innovation, quality, and reliability.
        </p>
      </article>
      <article class="rounded-3xl border border-slate-100 bg-surface p-6 shadow-soft">
        <h2 class="text-xl font-semibold text-ink">Mission</h2>
        <p class="mt-3 text-slate-600">
          To deliver modern, high-quality, and technology-driven services that support clients throughout the entire lifecycle of their properties.
        </p>
      </article>
    </div>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-ink">Values</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div class="rounded-2xl border border-slate-100 bg-surface p-4 text-center text-sm font-semibold text-ink">Swiftness</div>
        <div class="rounded-2xl border border-slate-100 bg-surface p-4 text-center text-sm font-semibold text-ink">Reliability</div>
        <div class="rounded-2xl border border-slate-100 bg-surface p-4 text-center text-sm font-semibold text-ink">Simplicity</div>
        <div class="rounded-2xl border border-slate-100 bg-surface p-4 text-center text-sm font-semibold text-ink">Agility</div>
        <div class="rounded-2xl border border-slate-100 bg-surface p-4 text-center text-sm font-semibold text-ink">Holism</div>
      </div>
    </section>
  </section>
</template>

