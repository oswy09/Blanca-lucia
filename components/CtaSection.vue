<script setup>
const { whatsappUrl, contactEmail } = useSiteConfig()
</script>

<template>
  <section class="cta-sec" id="contacto">
    <div class="wrap cta-inner">
      <span class="eyebrow cta-eyebrow reveal">Start with a Conversation</span>
      <h2 class="cta-heading reveal" style="transition-delay:80ms">If you would like to explore how I can support you</h2>
      <p class="cta-body reveal" style="transition-delay:160ms">
        You are welcome to get in touch. We can begin with an initial conversation to understand your needs and consider the most appropriate way forward.
      </p>
      <div class="cta-btns reveal" style="transition-delay:240ms">
        <a :href="whatsappUrl" class="btn cta-btn-white" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.34A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.66 0-3.21-.46-4.54-1.26l-.32-.2-3.02.79.82-2.95-.21-.34A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          WhatsApp
        </a>
        <a :href="`mailto:${contactEmail}`" class="btn cta-btn-outline">
          Send an email
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-sec {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: clamp(80px, 12vw, 140px);
  background: var(--teal);
  text-align: center;
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cta-eyebrow { color: rgba(255,255,255,.65); }

.cta-heading {
  font-size: clamp(30px, 4.5vw, 58px);
  font-weight: 700;
  color: #fff;
  margin: 14px 0 12px;
  text-wrap: balance;
}

.cta-body {
  font-size: 17px;
  color: rgba(255,255,255,.8);
  max-width: 480px;
  margin-bottom: 40px;
  line-height: 1.7;
}

.cta-btns { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }

.cta-btn-white {
  background: #fff;
  color: var(--teal);
}
.cta-btn-white:hover { background: var(--teal-t1); }

.cta-btn-outline {
  background: transparent;
  color: #fff;
  border: 1.5px solid rgba(255,255,255,.45);
}
.cta-btn-outline:hover { background: rgba(255,255,255,.12); }
</style>
