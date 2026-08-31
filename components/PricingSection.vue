<script setup>
const { whatsappUrl } = useSiteConfig()

const plans = [
  {
    id: 'focus',
    type: 'Consultation',
    name: '30-minute Focus Session',
    amount: '£35',
    period: 'Single 30-minute consultation',
    featured: false,
    perks: [
      'Focused one-to-one consultation',
      'Ideal for addressing a specific question',
      'Flexible scheduling options',
    ],
  },
  {
    id: 'individual',
    type: 'Consultation',
    name: '60-minute Individual Session',
    amount: '£60',
    period: 'Full 60-minute consultation',
    featured: true,
    perks: [
      'Full-length individual consultation',
      'Tailored to your specific professional goals',
      'Includes feedback notes and materials',
    ],
  },
  {
    id: 'block4',
    type: 'Block Package',
    name: '4 × 60-minute Sessions',
    amount: '£220',
    period: 'Block of 4 consultations (Save £20)',
    featured: false,
    perks: [
      'Structured series of 4 consultations',
      'Progress tracking and feedback between sessions',
      'Ideal for preparing specific task series or documents',
    ],
  },
  {
    id: 'block8',
    type: 'Block Package',
    name: '8 × 60-minute Sessions',
    amount: '£400',
    period: 'Block of 8 consultations (Save £80)',
    featured: false,
    perks: [
      'Comprehensive communication consultancy series',
      'Deep, long-term confidence building',
      'Ongoing support and progressive material tailoring',
    ],
  },
]
</script>

<template>
  <section class="pricing-sec" id="pricing">
    <div class="wrap">
      
      <!-- ==========================================
           LAYOUT OPTION 1: COMPACT TABLE FLOW
           ========================================== -->
      <div class="pricing-header reveal">
        <span class="eyebrow">Investment (Option 1)</span>
        <h2 class="section-title">A simple, transparent approach to fees</h2>
        <p class="section-desc">
          Fees are straightforward and reflect the personal, focused nature of the work. There are no hidden costs, no packages to choose between, and no pressure to commit before we have spoken.
        </p>
        <p class="section-desc" style="margin-top: 12px;">
          A limited number of clients are accepted at any one time to ensure the highest level of personal attention.
        </p>
      </div>

      <!-- Discovery Call Callout Card (New Layout) -->
      <div class="discovery-session-card reveal">
        <div class="discovery-main">
          <div class="discovery-header-inline">
            <span class="discovery-badge">First Step</span>
            <h3 class="discovery-title">Free Discovery Call</h3>
          </div>
          <p class="discovery-duration">Duration: 20–30 minutes · Conducted online via video call</p>
          <p class="discovery-text">
            Every engagement begins with a brief, informal conversation. It is an opportunity to talk about your background, what you want to achieve, and to make sure we are a good fit before deciding to work together.
          </p>
          <ul class="discovery-checklist">
            <li>
              <span class="disc-check">✓</span>
              <span>Discuss your background and objectives</span>
            </li>
            <li>
              <span class="disc-check">✓</span>
              <span>Identify what may have held you back until now</span>
            </li>
            <li>
              <span class="disc-check">✓</span>
              <span>Answer any questions about the sessions</span>
            </li>
          </ul>
        </div>
        <div class="discovery-action-box">
          <p class="discovery-action-text">Ready to get started?</p>
          <a :href="whatsappUrl" class="btn discovery-action-btn" target="_blank" rel="noopener">
            Book a Discovery Call
          </a>
        </div>
      </div>

      <!-- Pricing Table Layout -->
      <div class="p-table-container reveal">
        <h3 class="alt-section-title">Layout Option 1: Compact Table</h3>
        <div class="alt-table-wrap">
          <table class="alt-table">
            <thead>
              <tr>
                <th>Service Option</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in plans" :key="`table-${p.id}`" :class="{ 'table-featured': p.featured }">
                <td class="table-name-td">
                  <strong>{{ p.name }}</strong>
                  <span v-if="p.featured" class="table-rec-badge">Recommended</span>
                </td>
                <td class="table-desc-td">{{ p.period }}</td>
                <td class="table-price-td">
                  <span class="table-price-val">{{ p.amount }}</span>
                  <span class="table-price-period" v-if="p.id.startsWith('block')">/ block</span>
                  <span class="table-price-period" v-else>/ session</span>
                </td>
                <td class="table-btn-td">
                  <a :href="whatsappUrl" class="btn table-btn" target="_blank" rel="noopener">
                    Get started
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ==========================================
           LAYOUT OPTION 2: CLASSIC CARD GRID FLOW
           ========================================== -->
      <div class="alt-pricing-container reveal">
        
        <!-- Header Option 2 -->
        <div class="pricing-header reveal">
          <span class="eyebrow">Investment (Option 2)</span>
          <h2 class="section-title">A simple, transparent approach to fees</h2>
          <p class="section-desc">
            Fees are straightforward and reflect the personal, focused nature of the work. There are no hidden costs, no packages to choose between, and no pressure to commit before we have spoken.
          </p>
          <p class="section-desc" style="margin-top: 12px;">
            A limited number of clients are accepted at any one time to ensure the highest level of personal attention.
          </p>
        </div>

        <!-- Discovery Call Callout Banner (Original Banner Design) -->
        <div class="discovery-callout reveal">
          <div class="discovery-content">
            <div class="discovery-badge-wrap">
              <span class="discovery-callout-badge">Introductory</span>
            </div>
            <h3 class="discovery-callout-title">Free Discovery Call</h3>
            <p class="discovery-callout-desc">
              A free, 20–30 minute conversation to discuss your background, your objectives, and how we can work together.
            </p>
          </div>
          <a :href="whatsappUrl" class="btn discovery-callout-btn" target="_blank" rel="noopener">
            Book a Discovery Call
          </a>
        </div>

        <!-- 4-Card Grid -->
        <h3 class="alt-section-title">Layout Option 2: 4-Card Grid</h3>
        <div class="p-grid">
          <article v-for="(p, i) in plans" :key="`card-${p.id}`" class="p-card reveal" :class="{ 'featured-card': p.featured }" :style="{ transitionDelay: `${i * 100}ms` }">
            <div v-if="p.featured" class="p-badge">Recommended</div>
            
            <!-- Top portion -->
            <div class="p-card-top">
              <p class="p-type">{{ p.type }}</p>
              <h3 class="p-name">{{ p.name }}</h3>
              
              <div class="p-price-wrap">
                <span class="p-currency">£</span>
                <span class="p-amount">{{ p.amount.replace('£', '') }}</span>
                <span class="p-period-suffix" v-if="p.id.startsWith('block')">/ block</span>
                <span class="p-period-suffix" v-else>/ session</span>
              </div>
              
              <p class="p-period">{{ p.period }}</p>
              
              <a :href="whatsappUrl" class="btn p-btn" target="_blank" rel="noopener">
                Get started
              </a>
            </div>
            
            <hr class="p-divider">
            
            <!-- Bottom portion -->
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

/* Discovery Session Card Layout (Option 1) */
.discovery-session-card {
  max-width: 960px;
  margin: 0 auto 48px;
  background: #ffffff;
  border: 1.5px solid rgba(46,138,147,.22);
  border-radius: 24px;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  overflow: hidden;
  box-shadow: var(--sh-sm);
}

.discovery-main {
  padding: 40px 44px;
}

.discovery-header-inline {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.discovery-badge {
  background: var(--teal-t1);
  color: var(--teal-sh);
  font-family: var(--fb);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 4px 12px;
  border-radius: 99px;
}

.discovery-title {
  font-family: var(--fd);
  font-size: 23px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.discovery-duration {
  font-size: 13.5px;
  color: var(--teal-sh);
  font-weight: 600;
  margin: 0 0 16px;
}

.discovery-text {
  font-size: 15px;
  color: var(--text2);
  line-height: 1.7;
  margin-bottom: 24px;
}

.discovery-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.discovery-checklist li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text2);
}

.disc-check {
  color: var(--teal);
  font-weight: 700;
  font-size: 15px;
}

.discovery-action-box {
  background: var(--teal-t1);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-left: 1px solid rgba(46,138,147,.15);
}

.discovery-action-text {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
}

.discovery-action-btn {
  background: var(--coral);
  color: #fff;
  border: none;
  font-weight: 700;
  padding: 12px 32px;
  border-radius: 99px;
  box-shadow: 0 4px 12px rgba(217,96,58,.25);
  transition: background .15s, transform .15s;
  width: 100%;
  justify-content: center;
}

.discovery-action-btn:hover {
  background: var(--coral-sh);
  transform: translateY(-1px);
}

/* Original Callout Banner Layout (Option 2) */
.discovery-callout {
  max-width: 960px;
  margin: 0 auto 48px;
  background: var(--teal-t1);
  border: 1.5px solid rgba(46,138,147,.25);
  border-radius: 24px;
  padding: 32px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: var(--sh-sm);
}

.discovery-callout-badge {
  background: var(--teal);
  color: #fff;
  font-family: var(--fb);
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 4px 12px;
  border-radius: 99px;
}

.discovery-callout-title {
  font-family: var(--fd);
  font-size: 23px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
}

.discovery-callout-desc {
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.6;
  margin: 0;
}

.discovery-callout-btn {
  background: var(--teal);
  color: #fff;
  border: none;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 99px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(46,138,147,.18);
  transition: background .15s, transform .15s;
}

.discovery-callout-btn:hover {
  background: var(--teal-sh);
  transform: translateY(-1px);
}

/* Pricing Table Layout styling */
.p-table-container {
  max-width: 960px;
  margin: 0 auto;
}

.alt-table-wrap {
  background: #ffffff;
  border: 1.5px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--sh-sm);
}

.alt-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.alt-table th {
  background: var(--surface);
  color: var(--text2);
  font-family: var(--fb);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
}

.alt-table td {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.alt-table tr:last-child td {
  border-bottom: none;
}

.alt-table tr.table-featured {
  background: rgba(46, 138, 147, 0.02);
}

.table-name-td {
  font-size: 15px;
  color: var(--text);
}

.table-name-td strong {
  display: block;
  font-weight: 700;
}

.table-rec-badge {
  background: var(--teal-t1);
  color: var(--teal-sh);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  padding: 2px 8px;
  border-radius: 99px;
  display: inline-block;
  margin-top: 4px;
}

.table-desc-td {
  font-size: 14px;
  color: var(--text2);
  line-height: 1.5;
}

.table-price-td {
  font-family: var(--fd);
  white-space: nowrap;
}

.table-price-val {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.table-price-period {
  font-family: var(--fb);
  font-size: 12px;
  color: var(--text2);
  margin-left: 2px;
}

.table-btn-td {
  text-align: right;
  width: 150px;
}

.table-btn {
  font-size: 13.5px;
  font-weight: 700;
  padding: 8px 20px;
  border-radius: 99px;
  background: transparent;
  color: var(--teal);
  border: 1.2px solid var(--teal);
  justify-content: center;
  transition: all 0.15s;
  width: 100%;
}

.alt-table tr.table-featured .table-btn {
  background: var(--teal);
  color: #fff;
  border-color: var(--teal);
}

.table-btn:hover {
  background: var(--teal-sh);
  color: #fff;
  border-color: var(--teal-sh);
}

/* 4-Card Grid styles */
.p-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 960px;
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
  font-size: 20px;
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
  font-size: 24px;
  font-weight: 700;
  margin-right: 1px;
}

.p-amount {
  font-family: var(--fd);
  font-size: 48px;
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

.p-card:not(.featured-card) .p-btn {
  background: transparent;
  color: var(--teal);
  border: 1.5px solid var(--teal);
}

.p-card:not(.featured-card) .p-btn:hover {
  background: var(--teal-t1);
  color: var(--teal-sh);
}

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

.p-card:not(.featured-card) .p-check-icon {
  color: var(--n300);
}

.p-card.featured-card .p-check-icon {
  color: var(--teal);
}

/* Alternative container for side-by-side or stacked choices */
.alt-pricing-container {
  max-width: 960px;
  margin: 64px auto 0;
  border-top: 1px dashed var(--border);
  padding-top: 56px;
}
.alt-section-title {
  font-family: var(--fd);
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 32px;
  text-align: center;
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

@media (max-width: 820px) {
  .discovery-session-card {
    grid-template-columns: 1fr;
  }
  .discovery-main {
    padding: 32px 24px;
  }
  .discovery-action-box {
    border-left: none;
    border-top: 1px solid rgba(46,138,147,.15);
    padding: 32px 24px;
  }
}

@media (max-width: 768px) {
  .discovery-header-inline {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .discovery-callout {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    padding: 28px 24px;
  }
  .discovery-callout-btn {
    width: 100%;
    justify-content: center;
  }
  .alt-table, .alt-table thead, .alt-table tbody, .alt-table th, .alt-table td, .alt-table tr {
    display: block;
  }
  .alt-table thead {
    display: none;
  }
  .alt-table tr {
    border-bottom: 1px solid var(--border);
    padding: 20px 16px;
  }
  .alt-table tr:last-child {
    border-bottom: none;
  }
  .alt-table td {
    padding: 0;
    border: none;
    margin-bottom: 10px;
  }
  .alt-table td:last-child {
    margin-bottom: 0;
  }
  .table-name-td {
    font-size: 15px;
  }
  .table-desc-td {
    font-size: 13.5px;
  }
  .table-price-td {
    margin-top: 4px;
  }
  .table-btn-td {
    width: 100%;
    text-align: left;
    margin-top: 14px;
  }
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
