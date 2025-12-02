<template>
  <div class="flex min-h-screen flex-col bg-white">
    <Navigation />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

