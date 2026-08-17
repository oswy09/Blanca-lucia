<script setup>
import { computed, ref } from 'vue'

const { siteUrl } = useSiteConfig()

useSeoMeta({
  title: 'Contact — Fluent Future · Blanca Derby',
  description: 'Start a conversation for English language consultancy. Request an initial consultation or send a message.',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/contact` }],
})

useRevealOnScroll()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  service: '',
  message: ''
})

const touched = ref({
  firstName: false,
  lastName: false,
  email: false,
  service: false,
  message: false,
})

const isSubmitted = ref(false)
const submitAttempted = ref(false)

// Only letters, spaces, hyphens and apostrophes — no digits
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => ({
  firstName: !form.value.firstName.trim()
    ? 'First name is required.'
    : !nameRegex.test(form.value.firstName)
      ? 'Please use letters only — no numbers.'
      : '',
  lastName: !form.value.lastName.trim()
    ? 'Last name is required.'
    : !nameRegex.test(form.value.lastName)
      ? 'Please use letters only — no numbers.'
      : '',
  email: !form.value.email.trim()
    ? 'Email address is required.'
    : !emailRegex.test(form.value.email)
      ? 'Please enter a valid email address.'
      : '',
  service: !form.value.service ? 'Please select a service.' : '',
  message: !form.value.message.trim() ? 'Message is required.' : '',
}))

const isValid = computed(() => Object.values(errors.value).every(e => e === ''))

// Block numbers from being typed in name fields
const onNameKeydown = (e) => {
  if (/\d/.test(e.key)) e.preventDefault()
}

const showError = (field) => (touched.value[field] || submitAttempted.value) && errors.value[field]

const submitForm = () => {
  submitAttempted.value = true
  if (!isValid.value) return
  isSubmitted.value = true
}
</script>

<template>
  <main class="cn-page">
    <!-- ── 1. HERO BANNER ───────────────────────────────────────── -->
    <section class="cn-hero">
      <div class="wrap cn-hero-inner reveal">
        <span class="eyebrow cn-hero-eyebrow">Get in Touch</span>
        <h1 class="cn-hero-title">Let's start a conversation</h1>
      </div>
    </section>

    <!-- ── 2. QUICK CONNECT CARDS ──────────────────────────────── -->
    <section class="cn-quick wrap reveal">
      <div class="cn-quick-grid">
        <!-- Email -->
        <a href="mailto:blanca.lucia.cardona@gmail.com" class="cn-quick-card q-card--teal">
          <div class="cn-quick-header">
            <div class="cn-quick-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
              </svg>
            </div>
            <span class="cn-quick-label">Email</span>
          </div>
          <span class="cn-quick-value">blanca.lucia.cardona@gmail.com</span>
        </a>

        <!-- Based In -->
        <div class="cn-quick-card q-card--teal">
          <div class="cn-quick-header">
            <div class="cn-quick-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <span class="cn-quick-label">Based In</span>
          </div>
          <span class="cn-quick-value">United Kingdom</span>
          <span class="cn-quick-sub">Working online worldwide</span>
        </div>

        <!-- Sessions -->
        <div class="cn-quick-card q-card--teal">
          <div class="cn-quick-header">
            <div class="cn-quick-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <span class="cn-quick-label">Sessions</span>
          </div>
          <span class="cn-quick-value">100% Online</span>
          <span class="cn-quick-sub">Flexible to your schedule</span>
        </div>

        <!-- Languages -->
        <div class="cn-quick-card q-card--teal">
          <div class="cn-quick-header">
            <div class="cn-quick-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span class="cn-quick-label">Languages</span>
          </div>
          <span class="cn-quick-value">English & Spanish</span>
          <span class="cn-quick-sub">Spoken here</span>
        </div>
      </div>
    </section>

    <!-- ── 3. MAIN FORM & CONSULTATION GRID ─────────────────────── -->
    <section class="cn-main wrap">
      <div class="cn-main-grid">
        
        <!-- Left: Consultation Card -->
        <div class="cn-consult-wrap reveal">
          <div class="cn-consult-card-v2">
            <div class="cn-consult-header-v2">
              <span class="consult-badge">Service Option</span>
              <h3 class="consult-title-v2">Initial Consultation</h3>
              <div class="consult-price-v2">
                <span class="price-val">£25</span>
                <span class="price-dur">/ 30 minutes</span>
              </div>
            </div>
            
            <div class="cn-consult-body-v2">
              <p class="consult-intro-text">A one-to-one conversation to discuss:</p>
              <ul class="consult-bullets-v2">
                <li>
                  <div class="bullet-check-circle">
                    <svg class="bullet-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>Your background and experience</span>
                </li>
                <li>
                  <div class="bullet-check-circle">
                    <svg class="bullet-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>Your current level and challenges</span>
                </li>
                <li>
                  <div class="bullet-check-circle">
                    <svg class="bullet-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>Your goals and expectations</span>
                </li>
              </ul>
            </div>
            
            <div class="cn-consult-footer-v2">
              <p class="consult-footer-text">This allows us to determine whether this consultancy is the right fit for you.</p>
            </div>
          </div>
        </div>

        <!-- Right: Message Form -->
        <div class="cn-form-wrap reveal" style="transition-delay: 80ms">
          <div class="cn-form-card-v2">
            <div class="cn-form-header-v2">
              <h2 class="cn-form-title-v2">I'd love to hear from you</h2>
              <p class="cn-form-subtitle-v2">
                If you feel this approach is right for you, I would be pleased to hear from you. Before we begin, I offer a brief initial consultation to understand your needs and answer any questions you may have.
              </p>
              <p class="cn-form-subtitle-v2 reply-tag">
                I aim to respond within 24–48 hours.
              </p>
            </div>

            <!-- Form -->
            <form v-if="!isSubmitted" @submit.prevent="submitForm" class="cn-form-v2" novalidate>
              <div class="cn-form-row-v2">
                <div class="cn-input-group">
                  <input
                    type="text" id="first-name" v-model="form.firstName"
                    class="cn-input-v2" :class="{ 'cn-input--error': showError('firstName') }"
                    placeholder=" "
                    @keydown="onNameKeydown"
                    @blur="touched.firstName = true"
                  />
                  <label for="first-name" class="cn-label-v2">First Name</label>
                  <span v-if="showError('firstName')" class="cn-field-error">{{ errors.firstName }}</span>
                </div>
                <div class="cn-input-group">
                  <input
                    type="text" id="last-name" v-model="form.lastName"
                    class="cn-input-v2" :class="{ 'cn-input--error': showError('lastName') }"
                    placeholder=" "
                    @keydown="onNameKeydown"
                    @blur="touched.lastName = true"
                  />
                  <label for="last-name" class="cn-label-v2">Last Name</label>
                  <span v-if="showError('lastName')" class="cn-field-error">{{ errors.lastName }}</span>
                </div>
              </div>

              <div class="cn-input-group">
                <input
                  type="email" id="email" v-model="form.email"
                  class="cn-input-v2" :class="{ 'cn-input--error': showError('email') }"
                  placeholder=" "
                  @blur="touched.email = true"
                />
                <label for="email" class="cn-label-v2">Email Address</label>
                <span v-if="showError('email')" class="cn-field-error">{{ errors.email }}</span>
              </div>

              <div class="cn-input-group">
                <div class="cn-select-wrapper-v2">
                  <select
                    id="service" v-model="form.service"
                    class="cn-select-v2" :class="{ 'cn-input--error': showError('service') }"
                    @blur="touched.service = true"
                  >
                    <option value="" disabled selected hidden></option>
                    <option value="Personal Consultancy">Personal Consultancy</option>
                    <option value="English Interview Preparation">English Interview Preparation</option>
                    <option value="Professional Writing & Editing">Professional Writing &amp; Editing</option>
                    <option value="Other / General Inquiry">Other / General Inquiry</option>
                  </select>
                  <label for="service" class="cn-select-label-v2" :class="{ 'has-value': form.service }">Service I'm Interested In</label>
                </div>
                <span v-if="showError('service')" class="cn-field-error">{{ errors.service }}</span>
              </div>

              <div class="cn-input-group">
                <textarea
                  id="message" v-model="form.message"
                  class="cn-textarea-v2" :class="{ 'cn-input--error': showError('message') }"
                  placeholder=" "
                  @blur="touched.message = true"
                ></textarea>
                <label for="message" class="cn-label-v2">Your Message</label>
                <span v-if="showError('message')" class="cn-field-error">{{ errors.message }}</span>
              </div>

              <button type="submit" class="btn btn-primary cn-btn-v2">Send Message</button>
            </form>

            <!-- Success State -->
            <div v-else class="cn-success-state-v2">
              <div class="success-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 class="success-title">Message Sent!</h3>
              <p class="success-message">
                Thank you, {{ form.firstName }}. I have received your message and will respond within 24–48 hours to answer any questions you may have.
              </p>
              <button @click="isSubmitted = false" class="btn cn-btn-reset">Send Another Message</button>
            </div>

          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
.cn-page {
  background: var(--bg);
}

.cn-hero {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  padding-top: clamp(88px, 12vw, 140px);
  padding-bottom: clamp(64px, 10vw, 96px);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cn-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.cn-hero-inner { position: relative; z-index: 1; }

.cn-hero-eyebrow {
  color: rgba(255,255,255,.70);
  margin-bottom: 14px;
}

.cn-hero-title {
  font-family: var(--fd);
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 700;
  color: #fff;
  line-height: 1.12;
}

/* Quick Connect Cards section */
.cn-quick {
  padding-top: 64px;
  padding-bottom: 24px;
}

.cn-quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.cn-quick-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rlg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  box-shadow: var(--sh-sm);
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s;
  min-height: 140px;
}

.cn-quick-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-lg);
}

/* top-border accent removed — uniform 1px border from .cn-quick-card */

.cn-quick-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.cn-quick-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--teal-t1);
  color: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.cn-quick-card:hover .cn-quick-icon {
  background: var(--teal);
  color: #fff;
  transform: scale(1.05);
}

.cn-quick-label {
  font-family: var(--fd);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text2);
}

.cn-quick-value {
  font-size: 14.5px;
  color: var(--text);
  font-weight: 700;
  word-break: break-all;
  line-height: 1.3;
}

.cn-quick-sub {
  font-size: 12.5px;
  color: var(--text2);
  margin-top: 4px;
}

/* Main forms and consultation grid */
.cn-main {
  padding-bottom: var(--spy);
}

.cn-main-grid {
  display: grid;
  grid-template-columns: 1.1fr 1.5fr;
  gap: clamp(40px, 5vw, 64px);
  align-items: start;
  margin-top: 40px;
}

/* Consultation Card V2 styling */
.cn-consult-card-v2 {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--sh-md);
}

.cn-consult-header-v2 {
  background: linear-gradient(135deg, var(--teal-sh) 0%, var(--teal) 100%);
  padding: 32px;
  color: #fff;
  position: relative;
}

.consult-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.16);
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.consult-title-v2 {
  font-family: var(--fd);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
}

.consult-price-v2 {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.price-val {
  font-size: 32px;
  font-weight: 700;
  font-family: var(--fd);
}

.price-dur {
  font-size: 14px;
  opacity: 0.85;
}

.cn-consult-body-v2 {
  padding: 32px;
  border-bottom: 1px solid var(--border);
}

.consult-intro-text {
  font-size: 15px;
  color: var(--text);
  font-weight: 700;
  margin-bottom: 16px;
}

.consult-bullets-v2 {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.consult-bullets-v2 li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.5;
}

.bullet-check-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--teal-t1);
  color: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.cn-consult-footer-v2 {
  padding: 24px 32px;
  background: var(--n0);
}

.consult-footer-text {
  margin: 0;
  font-size: 13.5px;
  color: var(--text2);
  font-style: italic;
  line-height: 1.5;
}

/* Message Form V2 styling with floating labels */
.cn-form-card-v2 {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: clamp(24px, 4vw, 40px);
  box-shadow: var(--sh-md);
}

.cn-form-header-v2 {
  margin-bottom: 32px;
}

.cn-form-title-v2 {
  font-family: var(--fd);
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 14px;
  line-height: 1.25;
}

.cn-form-subtitle-v2 {
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.6;
  margin-bottom: 12px;
}

.reply-tag {
  display: inline-block;
  font-weight: 700;
  color: var(--teal);
  margin-top: 4px;
}

.cn-form-v2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cn-form-row-v2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Floating labels input group */
.cn-input-group {
  position: relative;
  width: 100%;
}

.cn-input-v2,
.cn-textarea-v2,
.cn-select-v2 {
  width: 100%;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--r);
  padding: 16px 18px;
  font-size: 15px;
  font-family: var(--fb);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.cn-textarea-v2 {
  resize: vertical;
  min-height: 130px;
}

/* Floating Label Transition */
.cn-label-v2 {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14.5px;
  color: var(--text2);
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: var(--surface);
  padding-inline: 6px;
}

.cn-textarea-v2 ~ .cn-label-v2 {
  top: 24px;
  transform: none;
}

/* Input focus states */
.cn-input-v2:focus,
.cn-textarea-v2:focus,
.cn-select-v2:focus {
  border-color: var(--teal);
  box-shadow: 0 0 0 3px var(--teal-t1);
}

.cn-input-v2:focus ~ .cn-label-v2,
.cn-input-v2:not(:placeholder-shown) ~ .cn-label-v2,
.cn-textarea-v2:focus ~ .cn-label-v2,
.cn-textarea-v2:not(:placeholder-shown) ~ .cn-label-v2 {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 700;
  color: var(--teal);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Dropdown styling */
.cn-select-wrapper-v2 {
  position: relative;
  width: 100%;
}

.cn-select-v2 {
  appearance: none;
  cursor: pointer;
  padding-right: 44px;
}

/* Arrow indicator */
.cn-select-wrapper-v2::after {
  content: '';
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-left: 2px solid var(--text2);
  border-bottom: 2px solid var(--text2);
  transform: translateY(-70%) rotate(-45deg);
  pointer-events: none;
}

.cn-select-label-v2 {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14.5px;
  color: var(--text2);
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: var(--surface);
  padding-inline: 6px;
}

.cn-select-v2:focus ~ .cn-select-label-v2,
.cn-select-label-v2.has-value {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 700;
  color: var(--teal);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cn-btn-v2 {
  width: 100%;
  padding-block: 15px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Success State V2 */
.cn-success-state-v2 {
  text-align: center;
  padding-block: 36px;
}

.success-icon-wrap {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: var(--teal-t1);
  color: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: var(--sh-sm);
}

.success-title {
  font-family: var(--fd);
  font-size: 22px;
  font-weight: 700;
  color: var(--teal);
  margin-bottom: 12px;
}

.success-message {
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.65;
  margin-bottom: 32px;
}

.cn-btn-reset {
  background: transparent;
  color: var(--teal);
  border: 1.5px solid var(--teal);
  font-weight: 700;
  font-size: 13.5px;
  padding: 10px 24px;
  border-radius: var(--r);
  cursor: pointer;
  transition: background-color 0.2s;
}

.cn-btn-reset:hover {
  background: var(--teal-t1);
}

/* Validation error states */
.cn-input--error {
  border-color: #e53e3e !important;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, .12) !important;
}

.cn-field-error {
  display: block;
  font-size: 12px;
  color: #e53e3e;
  margin-top: 5px;
  padding-left: 4px;
  line-height: 1.4;
}

/* Responsive grid stacking */
@media (max-width: 992px) {
  .cn-quick-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cn-main-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

@media (max-width: 576px) {
  .cn-quick-grid {
    grid-template-columns: 1fr;
  }
  
  .cn-form-row-v2 {
    grid-template-columns: 1fr;
  }
}
</style>
