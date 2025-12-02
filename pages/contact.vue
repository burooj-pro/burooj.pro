<script setup lang="ts">
useHead({ title: 'Contact' })

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  files: [] as File[],
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

const validate = () => {
  errors.name = form.name.length >= 2 ? '' : 'Please enter your full name.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Enter a valid email address.'
  errors.phone = /^(\+966|0)?5\d{8}$/.test(form.phone) ? '' : 'Use a valid Saudi mobile number.'
  errors.service = form.service ? '' : 'Select a service.'
  errors.message = form.message.length >= 10 ? '' : 'Message should be at least 10 characters.'
  const invalidFile = form.files.find((file) => file.size > 5 * 1024 * 1024)
  errors.files = invalidFile ? 'Each file must be under 5MB.' : ''

  return Object.values(errors).every((value) => !value)
}

const handleSubmit = () => {
  if (!validate()) return
  isSubmitting.value = true

  setTimeout(() => {
    // Placeholder for API integration
    // TODO: Replace with actual API call
    // Example: await $fetch('/api/contact', { method: 'POST', body: form })
    isSubmitting.value = false
    // Reset form after successful submission
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      files: [],
    })
  }, 800)
}
</script>

<template>
  <section class="section-wrapper relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
    <!-- Section Title -->
    <div class="mb-16 grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
      <div>
        <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
          Get in Touch
        </h1>
      </div>
      <div>
        <p class="text-base leading-relaxed text-slate-600 md:text-lg">
          Reach out for consultations, proposals, or to learn more about our comprehensive solutions across engineering, construction, property management, and drone cleaning.
        </p>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <!-- Contact Information -->
      <div class="space-y-8">
        <div>
          <h2 class="mb-6 text-2xl font-serif leading-tight text-ink md:text-3xl">Contact Information</h2>
          <div class="space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
            <div>
              <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-ink md:text-sm">Phone</p>
              <a href="tel:+966548366111" class="font-medium text-ink transition-colors hover:text-primary">
                +966 54 836 6111
              </a>
            </div>
            <div>
              <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-ink md:text-sm">Email</p>
              <a href="mailto:contact@burooj.pro" class="font-medium text-ink transition-colors hover:text-primary">
                contact@burooj.pro
              </a>
            </div>
            <div>
              <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-ink md:text-sm">Address</p>
              <p class="font-medium text-ink">Prince Turki Street, Corniche District, Khobar</p>
            </div>
          </div>
          <!-- Social Media Icons -->
          <div class="mt-8">
            <p class="mb-4 text-xs font-semibold uppercase tracking-wide text-ink md:text-sm">Follow Us</p>
            <div class="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/burooj"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/burooj"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://x.com/burooj"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 transition-colors hover:text-primary"
                aria-label="X (formerly Twitter)"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/966548366111"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 transition-colors hover:text-primary"
                aria-label="WhatsApp"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <form class="space-y-6" novalidate @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="mb-2 block text-sm font-medium text-ink">Full Name *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full border-b border-slate-300 bg-transparent px-0 py-3 text-ink placeholder:text-slate-400 focus:border-primary focus:outline-none"
            placeholder="Enter your full name"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-ink">Email *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full border-b border-slate-300 bg-transparent px-0 py-3 text-ink placeholder:text-slate-400 focus:border-primary focus:outline-none"
              placeholder="your.email@example.com"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
          </div>
          <div>
            <label for="phone" class="mb-2 block text-sm font-medium text-ink">Phone *</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full border-b border-slate-300 bg-transparent px-0 py-3 text-ink placeholder:text-slate-400 focus:border-primary focus:outline-none"
              placeholder="+966 5X XXX XXXX"
            />
            <p v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</p>
          </div>
        </div>

        <div>
          <label for="service" class="mb-2 block text-sm font-medium text-ink">Service Required *</label>
          <select
            id="service"
            v-model="form.service"
            class="w-full border-b border-slate-300 bg-transparent px-0 py-3 text-ink focus:border-primary focus:outline-none"
          >
            <option value="" disabled>Select a service</option>
            <option>Construction & Engineering</option>
            <option>Property Management</option>
            <option>Drone Cleaning</option>
            <option>Other</option>
          </select>
          <p v-if="errors.service" class="mt-1 text-xs text-red-500">{{ errors.service }}</p>
        </div>

        <div>
          <label for="message" class="mb-2 block text-sm font-medium text-ink">Message *</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            class="w-full border-b border-slate-300 bg-transparent px-0 py-3 text-ink placeholder:text-slate-400 focus:border-primary focus:outline-none"
            placeholder="Tell us about your project or inquiry..."
          />
          <p v-if="errors.message" class="mt-1 text-xs text-red-500">{{ errors.message }}</p>
        </div>

        <div>
          <label for="files" class="mb-2 block text-sm font-medium text-ink">Upload Brief / RFP (optional)</label>
          <input
            id="files"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.png"
            class="w-full border-b border-dashed border-slate-300 bg-transparent px-0 py-3 text-sm text-slate-600 focus:border-primary focus:outline-none"
            @change="(event: Event) => {
              const input = event.target as HTMLInputElement
              form.files = Array.from(input.files || [])
            }"
          />
          <p v-if="errors.files" class="mt-1 text-xs text-red-500">{{ errors.files }}</p>
          <p class="mt-1 text-xs text-slate-500">PDF, DOC, DOCX, JPG, PNG (max 5MB per file)</p>
        </div>

        <button
          type="submit"
          class="mt-8 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Sending...' : 'Submit' }}
        </button>
      </form>
    </div>
  </section>
</template>

