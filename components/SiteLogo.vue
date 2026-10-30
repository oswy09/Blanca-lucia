<script setup>
const props = defineProps({
  dark:  { type: Boolean, default: false },
  scale: { type: Number,  default: 0.62 },  // 44px base × 0.62 ≈ 27px nav size
})

const DEFAULTS = {
  line1: 'Fluent Future', line2: 'Future', twoLines: false,
  tagline: 'Your Path to Fluent Communication',
  font: 'Libre Baskerville', fontWeight: '400',
  letterSpacing: 0.06, fontSize: 44, taglineSize: 13,
  mainColor: '#0F5562', taglineColor: '#0F5562', accentColor: '#2E8A93',
  showTagline: true, showSwoosh: true, uppercase: false, italic: false,
  swooshExtend: 1.65,
  swooshOffset: 0,
}

// Fetched once and cached — updates on next page load after a brand save
const { data: raw } = useFetch('/api/content/brand', {
  key: 'site-brand',
  default: () => ({}),
})
const cfg = computed(() => ({ ...DEFAULTS, ...(raw.value || {}) }))

// Geometry (same logic as brand admin, scaled for nav)
const FS      = computed(() => Math.round(cfg.value.fontSize    * props.scale))
const tagFS   = computed(() => Math.round(cfg.value.taglineSize * props.scale))
const SH      = computed(() => Math.round(FS.value * 1.1))
const SW_BASE = computed(() => Math.round(SH.value * (108.19 / 36.1)))
const CRES    = computed(() => Math.round(SW_BASE.value * 0.36))
const OVERLAP = computed(() => -Math.round(SH.value * 0.28))
const SW      = computed(() => Math.round(SW_BASE.value * (cfg.value.swooshExtend ?? 1.65)))
const SWOFF   = computed(() => Math.round(SW_BASE.value * (cfg.value.swooshOffset  ?? 0)))

// Colors — dark mode: everything white
const WHITE = '#FEFAF5'
const mainClr   = computed(() => props.dark ? WHITE                       : cfg.value.mainColor)
const accentClr = computed(() => props.dark ? WHITE                       : cfg.value.accentColor)
const tagClr    = computed(() => props.dark ? 'rgba(255,255,255,0.72)'    : cfg.value.taglineColor)

const textStyle = computed(() => ({
  fontFamily:    `'${cfg.value.font}', Georgia, serif`,
  fontWeight:    cfg.value.fontWeight,
  fontSize:      `${FS.value}px`,
  letterSpacing: `${cfg.value.letterSpacing}em`,
  fontStyle:     cfg.value.italic    ? 'italic'     : 'normal',
  textTransform: cfg.value.uppercase ? 'uppercase'  : 'none',
  color:         mainClr.value,
  lineHeight:    1.1,
  display:       'block',
  whiteSpace:    'nowrap',
}))

const tagStyle = computed(() => ({
  fontFamily:    `'${cfg.value.font}', Georgia, serif`,
  fontStyle:     'italic',
  fontSize:      `${tagFS.value}px`,
  letterSpacing: '0.06em',
  color:         tagClr.value,
  display:       'block',
  whiteSpace:    'nowrap',
}))

const lines = computed(() => {
  const t = (s) => cfg.value.uppercase ? s.toUpperCase() : s
  return cfg.value.twoLines
    ? [t(cfg.value.line1), t(cfg.value.line2)]
    : [t(cfg.value.line1)]
})

// Load the active font
const fontUrl = computed(() => {
  const f = encodeURIComponent(cfg.value.font).replace(/%20/g, '+')
  return `https://fonts.googleapis.com/css2?family=${f}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap`
})
useHead({ link: [{ rel: 'stylesheet', href: fontUrl }] })
</script>

<template>
  <div class="sl">
    <!-- Name -->
    <div class="sl-text" :style="{ paddingLeft: CRES + 'px' }">
      <span v-for="(line, i) in lines" :key="i" :style="textStyle">{{ line }}</span>
    </div>

    <!-- Swoosh: always below text (marginTop fixed), no font-dependent overlap -->
    <div v-if="cfg.showSwoosh !== false" class="sl-swoosh"
         :style="{ marginTop: OVERLAP + 'px', marginLeft: SWOFF + 'px' }">
      <svg viewBox="0 0 108.19 36.1"
           :width="SW" :height="SH"
           preserveAspectRatio="none"
           overflow="hidden"
           xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="sl-clip">
            <rect x=".19" y=".1" width="108" height="36"/>
          </clipPath>
        </defs>
        <g clip-path="url(#sl-clip)">
          <!-- Main sweep (bottom trail) -->
          <path d="M.07,20.1c-.51-1.56,2.08-9.88,2.32-4.54,17.11,30.04,77.43,2.51,105.23,6.1-20.09,1.04-39.51,7.23-59.1,11.53C34.03,35.81,1.79,41.27,.08,20.1h0Z"
                :fill="accentClr"/>
          <!-- C-crescent (top trail) -->
          <path d="M24.47,.2c-7.64,2.71-15.33,11.05-7.33,18.03,9.95,7.02,22.72,7,34.43,7.58-12.26,2.63-27.92,1.08-39.99,-4.26C-6.4,11.38,11.94,.64,24.43,0c0,.06.03.13.04.2Z"
                :fill="accentClr"/>
        </g>
      </svg>
    </div>

    <!-- Tagline -->
    <div v-if="cfg.showTagline" class="sl-tag"
         :style="{ paddingLeft: CRES + 'px', marginTop: '2px' }">
      <span :style="tagStyle">{{ cfg.tagline }}</span>
    </div>
  </div>
</template>

<style scoped>
.sl {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
  flex-shrink: 0;
}
.sl-text   { position: relative; z-index: 2; }
.sl-swoosh { position: relative; z-index: 1; line-height: 0; }
.sl-tag    { line-height: 1; }
</style>
