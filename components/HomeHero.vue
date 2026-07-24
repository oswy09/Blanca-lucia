<script setup>
const { whatsappUrl } = useSiteConfig()
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">

      <div class="hero-content">
        <div class="hero-pill reveal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          Personal Language Consultancy for Adults
        </div>

        <!-- Storyblok: blok.title -->
        <h1 class="hero-title reveal" style="transition-delay:80ms">Hello, I'm Blanca Derby</h1>

        <!-- Storyblok: blok.tagline -->
        <p class="hero-tagline reveal" style="transition-delay:140ms">Personal Language Consultancy by Blanca Derby</p>

        <!-- Storyblok: blok.subtitle -->
        <p class="hero-sub reveal" style="transition-delay:200ms">
          <strong>A consultancy for Spanish-speaking adults seeking to improve how they
          express themselves in English in real-life and professional contexts.</strong>
        </p>

        <div class="hero-ctas reveal" style="transition-delay:280ms">
          <a :href="whatsappUrl" class="btn btn-primary" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.34A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.66 0-3.21-.46-4.54-1.26l-.32-.2-3.02.79.82-2.95-.21-.34A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            Message me on WhatsApp
          </a>
          <a href="#servicios" class="btn btn-secondary">View services</a>
        </div>
      </div>

      <div class="hero-visual reveal" style="transition-delay:160ms">
        <HeroAvatars />
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(72px, 10vw, 120px);
  padding-bottom: clamp(140px, 16vw, 180px);
}
.hero-grid {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}
.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--teal-t1);
  color: var(--teal-sh);
  font-size: 13px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 999px;
  margin-bottom: 28px;
}
.hero-title {
  font-size: clamp(38px, 5.5vw, 68px);
  font-weight: 700;
  line-height: 1.06;
  margin-bottom: 24px;
}
.hero-title .accent { color: var(--teal); }
.hero-tagline {
  font-size: 15px;
  font-weight: 600;
  color: var(--teal);
  margin-bottom: 16px;
  letter-spacing: .01em;
}
.hero-sub {
  font-size: clamp(16px, 1.8vw, 18px);
  color: var(--text);
  max-width: 460px;
  margin-bottom: 36px;
  line-height: 1.7;
}
.hero-sub strong { font-weight: 700; }
.hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }

/* Visual */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(ellipse at 55% 45%, rgba(16,185,129,.07) 0%, transparent 68%);
  border-radius: 24px;
  min-height: 340px;
}

@media (max-width: 800px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-visual { order: -1; min-height: 280px; }
}
</style>
