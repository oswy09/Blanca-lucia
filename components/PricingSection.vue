<script setup>
const { whatsappUrl } = useSiteConfig()

const plans = [
  {
    id: 'single',
    type: 'Individual Session',
    name: 'Single Consultation',
    amount: '£25',
    period: 'per session (30 minutes)',
    featured: false,
    perks: [
      'One-to-one, focused guidance',
      'Tailored to your specific goals and level',
      'Structured around your availability',
    ],
  },
  {
    id: 'long',
    type: 'Block',
    name: 'Block of Sessions',
    amount: '£60',
    period: '60 minutes',
    featured: true,
    perks: [
      'A more structured series of consultations',
      'Progress tracked between sessions',
      'Ideal for those with a defined goal',
    ],
  },
]
</script>

<template>
  <section class="pricing-sec" id="pricing">
    <div class="wrap">
      <div class="pricing-header reveal">
        <span class="eyebrow">Investment</span>
        <h2 class="section-title">A simple, transparent approach to fees</h2>
        <p class="section-desc">
          Fees are straightforward and reflect the personal, focused nature of the work. There are no hidden costs, no packages to choose between, and no pressure to commit before we have spoken.
        </p>
        <p class="section-desc" style="margin-top: 12px;">
          A limited number of clients are accepted at any one time to ensure the highest level of personal attention.
        </p>
      </div>

      <div class="p-grid">
        <article v-for="(p, i) in plans" :key="p.id" class="p-card reveal" :class="{ 'featured-card': p.featured }" :style="{ transitionDelay: `${i * 100}ms` }">
          
          <!-- Featured Badge -->
          <div v-if="p.featured" class="p-badge">Most Popular</div>
          
          <!-- Top portion of the card -->
          <div class="p-card-top">
            <p class="p-type">{{ p.type }}</p>
            <h3 class="p-name">{{ p.name }}</h3>
            
            <div class="p-price-wrap">
              <span class="p-currency">£</span>
              <span class="p-amount">{{ p.amount.replace('£', '') }}</span>
              <span class="p-period-suffix" v-if="p.id === 'single'">/ session</span>
              <span class="p-period-suffix" v-else>/ block</span>
            </div>
            
            <p class="p-period">{{ p.period }}</p>
            
            <a :href="whatsappUrl" class="btn p-btn" target="_blank" rel="noopener">
              Get started
            </a>
          </div>
          
          <!-- Divider -->
          <hr class="p-divider">
          
          <!-- Bottom portion of the card -->
          <div class="p-card-bottom">
            <p class="p-features-label">FEATURES</p>
            <ul class="p-list">
              <li v-for="perk in p.perks" :key="perk" class="p-perk">
                <svg class="p-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ perk }}</span>
              </li>
            </ul>
          </div>
          
        </article>
      </div>

      <p class="pricing-note">
        All sessions are conducted online. Fees are reviewed periodically and confirmed before any commitment is made.
      </p>
    </div>
  </section>
</template>

<style scoped>
.pricing-sec {
  padding-block: var(--spy);
  background: var(--surface);
}
.pricing-header { margin-bottom: 52px; }
.pricing-header .section-desc { max-width: 100%; }
.p-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 820px;
  margin-inline: auto;
}
.p-card {
  position: relative;
  background: #ffffff;
  border: 1.5px solid var(--border);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--sh-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.p-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-lg);
}
.p-card.featured-card {
  border-color: var(--teal);
  box-shadow: var(--sh-md);
}

/* Badge */
.p-badge {
  position: absolute;
  top: -12px;
  right: 28px;
  background: var(--teal);
  color: #ffffff;
  font-family: var(--fb);
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 5px 14px;
  border-radius: 99px;
  box-shadow: 0 4px 12px rgba(46,138,147,.22);
  z-index: 5;
}

.p-card-top {
  padding: 36px 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex: 1;
}

.p-type {
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--text3);
}

.p-card.featured-card .p-type {
  color: var(--teal-sh);
}

.p-name {
  font-family: var(--fd);
  font-size: 23px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

.p-price-wrap {
  display: flex;
  align-items: baseline;
  margin-top: 4px;
  color: var(--text);
}

.p-currency {
  font-family: var(--fd);
  font-size: clamp(24px, 2.5vw, 28px);
  font-weight: 700;
  margin-right: 1px;
}

.p-amount {
  font-family: var(--fd);
  font-size: clamp(48px, 5vw, 58px);
  font-weight: 700;
  line-height: 1;
}

.p-period-suffix {
  font-family: var(--fb);
  font-size: 14px;
  color: var(--text2);
  margin-left: 4px;
}

.p-period {
  font-size: 13.5px;
  color: var(--text2);
  margin-bottom: 18px;
}

.p-btn {
  width: 100%;
  justify-content: center;
  border-radius: 99px;
  padding: 12px 24px;
  font-size: 14.5px;
  font-weight: 700;
}

/* Left card button (secondary brand - Outline Teal) */
.p-card:not(.featured-card) .p-btn {
  background: transparent;
  color: var(--teal);
  border: 1.5px solid var(--teal);
}

.p-card:not(.featured-card) .p-btn:hover {
  background: var(--teal-t1);
  color: var(--teal-sh);
}

/* Right card button (primary brand - Solid Coral) */
.p-card.featured-card .p-btn {
  background: var(--coral);
  color: #ffffff;
  border: none;
}

.p-card.featured-card .p-btn:hover {
  background: var(--coral-sh);
}

.p-divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 0;
}

.p-card-bottom {
  padding: 28px 32px 36px;
}

.p-features-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  color: var(--text3);
  margin-bottom: 14px;
  text-transform: uppercase;
}

.p-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.p-perk {
  font-size: 14px;
  color: var(--text2);
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.45;
}

.p-check-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Icons colors */
.p-card:not(.featured-card) .p-check-icon {
  color: var(--n300);
}

.p-card.featured-card .p-check-icon {
  color: var(--teal);
}

.pricing-note {
  max-width: 820px;
  margin-top: 28px;
  margin-inline: auto;
  font-size: 14px;
  color: var(--text2);
  font-style: italic;
  text-align: center;
}

@media (max-width: 640px) {
  .p-grid {
    grid-template-columns: 1fr;
    max-width: 100%;
    gap: 40px;
  }
  .p-badge {
    top: -12px;
    right: 20px;
  }
}
</style>
