<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const fonts = [
  { label: 'Cormorant Garamond', family: 'Cormorant Garamond', style: 'Elegant serif' },
  { label: 'Lora',               family: 'Lora',               style: 'Warm serif' },
  { label: 'Fraunces',           family: 'Fraunces',           style: 'Expressive' },
  { label: 'Playfair Display',   family: 'Playfair Display',   style: 'Classic' },
  { label: 'DM Serif Display',   family: 'DM Serif Display',   style: 'Modern' },
  { label: 'Libre Baskerville',  family: 'Libre Baskerville',  style: 'Traditional' },
  { label: 'Cinzel',             family: 'Cinzel',             style: 'Refined caps' },
  { label: 'Merriweather',       family: 'Merriweather',       style: 'Bold & sturdy' },
  { label: 'Abril Fatface',      family: 'Abril Fatface',      style: 'Display bold' },
]

const palette = [
  { hex: '#2E8A93', label: 'Teal' },
  { hex: '#1E6E76', label: 'Dark teal' },
  { hex: '#0F5562', label: 'Deep teal' },
  { hex: '#3AADA0', label: 'Vivid teal' },
  { hex: '#4EC9C0', label: 'Turquoise' },
  { hex: '#8FC7CC', label: 'Soft teal' },
  { hex: '#1B6B9E', label: 'Teal blue' },
  { hex: '#2C5F8A', label: 'Steel blue' },
  { hex: '#1B4F72', label: 'Deep blue' },
  { hex: '#D9603A', label: 'Coral' },
  { hex: '#F0B450', label: 'Amber' },
  { hex: '#332E2A', label: 'Warm dark' },
  { hex: '#1a2035', label: 'Navy' },
  { hex: '#FEFAF5', label: 'Cream' },
  { hex: '#FFFFFF', label: 'White' },
]

const weights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'SemiBold' },
  { value: '700', label: 'Bold' },
]

const DEFAULTS = {
  line1:         'Fluent Future',
  line2:         'Future',
  twoLines:      false,
  tagline:       'Your Path to Fluent Communication',
  font:          'Libre Baskerville',
  fontWeight:    '400',
  letterSpacing: 0.06,
  fontSize:      44,
  taglineSize:   13,
  mainColor:     '#0F5562',
  taglineColor:  '#0F5562',
  accentColor:   '#2E8A93',
  bgColor:       '#FEFAF5',
  layout:        'left',
  showTagline:   true,
  showSwoosh:    true,
  taglineX:      62,
  taglineY:      130,
  uppercase:     false,
  italic:        false,
  swooshExtend:  1.65,
  swooshOffset:  0,
}

const cfg       = ref({ ...DEFAULTS })
const saving    = ref(false)
const saved     = ref(false)
const loading   = ref(false)
const openPicker = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/content/brand')
    if (data && Object.keys(data).length) cfg.value = { ...DEFAULTS, ...data }
  } catch {}
  loading.value = false
})

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&family=Abril+Fatface&display=swap',
    },
  ],
})

// Swoosh SVG dimensions â€” mark viewBox is 108.19Ã—36.1 (MARK_AR â‰ˆ 3:1 wide)
const MARK_AR = 108.19 / 36.1
const swooshH = computed(() => Math.round(cfg.value.fontSize * (cfg.value.twoLines ? 2 : 1) * 1.1))
const swooshW    = computed(() => Math.round(swooshH.value * MARK_AR))
const swooshWExt   = computed(() => Math.round(swooshW.value * (cfg.value.swooshExtend ?? 1.65)))
const swooshLeftPx = computed(() => Math.round(swooshW.value * (cfg.value.swooshOffset  ?? 0.45)))
// Negative margin to pull swoosh up behind the bottom of the text
const swooshOverlap = computed(() => Math.round(swooshH.value * 0.5))
// Left indent on text so C-crescent appears to the LEFT of the first letter
const cresIndent = computed(() => Math.round(swooshW.value * 0.36))
// Tagline x-indent: start past the C-crescent end (~48% of mark width)
const taglineIndent = computed(() => Math.round(swooshW.value * (cfg.value.taglineX / 100)))
const taglineTop    = computed(() => Math.round(cfg.value.fontSize * (cfg.value.taglineY / 100)))

// Text styles
const mainStyle = computed(() => ({
  fontFamily:    `'${cfg.value.font}', Georgia, serif`,
  fontWeight:    cfg.value.fontWeight,
  letterSpacing: `${cfg.value.letterSpacing}em`,
  fontStyle:     cfg.value.italic ? 'italic' : 'normal',
  textTransform: cfg.value.uppercase ? 'uppercase' : 'none',
  fontSize:      `${cfg.value.fontSize}px`,
  color:         cfg.value.mainColor,
  lineHeight:    1.08,
  display:       'block',
}))

const taglineStyle = computed(() => ({
  fontFamily:    `'${cfg.value.font}', Georgia, serif`,
  fontStyle:     cfg.value.italic ? 'italic' : 'normal',
  fontWeight:    '400',
  fontSize:      `${cfg.value.taglineSize}px`,
  letterSpacing: '0.05em',
  color:         cfg.value.taglineColor,
  display:       'block',
}))

function t(s) { return cfg.value.uppercase ? s.toUpperCase() : s }
function mainText() {
  return cfg.value.twoLines
    ? [t(cfg.value.line1), t(cfg.value.line2)]
    : [t(cfg.value.line1)]
}

function applyColor(field, hex) {
  cfg.value[field] = hex
  openPicker.value = null
}
function togglePicker(id) {
  openPicker.value = openPicker.value === id ? null : id
}

async function save() {
  saving.value = true
  saved.value  = false
  try {
    await $fetch('/api/content/brand', { method: 'POST', body: { ...cfg.value } })
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  } catch (e) {
    if ((e?.statusCode || e?.response?.status) === 401) { navigateTo('/admin'); return }
    console.error(e)
  }
  saving.value = false
}

function reset() {
  if (!confirm('Reset all settings to default?')) return
  cfg.value = { ...DEFAULTS }
}

// â”€â”€ SVG export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildLogoSvg(opts = {}) {
  const c = cfg.value
  const isDark = opts.dark
  const isTeal = opts.teal
  const mainClr  = isDark || isTeal ? '#FEFAF5' : c.mainColor
  const tagClr   = isDark ? 'rgba(255,255,255,0.55)' : isTeal ? 'rgba(255,255,255,0.7)' : c.taglineColor
  const swashClr = isDark ? '#FEFAF5' : isTeal ? '#F0B450' : c.accentColor
  const bgClr    = isDark ? '#1a2035' : isTeal ? '#2E8A93' : c.bgColor

  const fs      = c.fontSize
  const tfs     = c.taglineSize
  const ls      = c.letterSpacing * fs
  const fSty    = c.italic ? 'italic' : 'normal'
  const fW      = c.fontWeight
  const lines   = c.twoLines ? [t(c.line1), t(c.line2)] : [t(`${c.line1} ${c.line2}`)]
  const fontId  = encodeURIComponent(c.font).replace(/%20/g, '+')

  // Swoosh scale â€” mark viewBox is 108.19 Ã— 36.1 (MARK_AR â‰ˆ 2.996)
  const sh    = Math.round(fs * (c.twoLines ? 2 : 1) * 1.1)
  const sw    = Math.round(sh * (108.19 / 36.1))

  // Text starts at x = sw + gap, vertically centered in swoosh
  const gap    = 10
  const tx     = sw + gap
  const lineH  = fs * 1.1
  const totalTextH = lines.length * lineH
  const textStartY = (sh - totalTextH) / 2 + fs * 0.82

  // Overall canvas
  const W = Math.max(tx + lines.reduce((max, l) => Math.max(max, l.length * fs * 0.6), 0), 340)
  const tagW = c.showTagline ? tx + c.tagline.length * tfs * 0.55 : 0
  const totalW = Math.max(W, tagW, 300)
  const H = sh + (c.showTagline ? tfs + 18 : 8)

  let textSvg = ''
  lines.forEach((line, i) => {
    textSvg += `<text x="${tx}" y="${textStartY + i * lineH}" font-family="'${c.font}', Georgia, serif" font-style="${fSty}" font-weight="${fW}" font-size="${fs}" letter-spacing="${ls}" fill="${mainClr}">${line}</text>\n  `
  })

  const tagY = sh + tfs + 4
  const tagSvg = c.showTagline
    ? `<text x="${tx}" y="${tagY}" font-family="'${c.font}', Georgia, serif" font-style="${fSty}" font-size="${tfs}" letter-spacing="${tfs * 0.05}" fill="${tagClr}">${c.tagline}</text>`
    : ''

  // Swoosh â€” scale the actual logo mark paths (viewBox 108.19Ã—36.1 â†’ target shÃ—sw)
  const markScaleX = sw / 108.19
  const markScaleY = sh / 36.1
  const swooshPath = `M${(.07*markScaleX).toFixed(2)},${(20.1*markScaleY).toFixed(2)}c${(-.51*markScaleX).toFixed(2)},${(-1.56*markScaleY).toFixed(2)},${(2.08*markScaleX).toFixed(2)},${(-9.88*markScaleY).toFixed(2)},${(2.32*markScaleX).toFixed(2)},${(-4.54*markScaleY).toFixed(2)},${(17.11*markScaleX).toFixed(2)},${(30.04*markScaleY).toFixed(2)},${(77.43*markScaleX).toFixed(2)},${(2.51*markScaleY).toFixed(2)},${(105.23*markScaleX).toFixed(2)},${(6.1*markScaleY).toFixed(2)},${(-20.09*markScaleX).toFixed(2)},${(1.04*markScaleY).toFixed(2)},${(-39.51*markScaleX).toFixed(2)},${(7.23*markScaleY).toFixed(2)},${(-59.1*markScaleX).toFixed(2)},${(11.53*markScaleY).toFixed(2)}C${(34.03*markScaleX).toFixed(2)},${(35.81*markScaleY).toFixed(2)},${(1.79*markScaleX).toFixed(2)},${(41.27*markScaleY).toFixed(2)},${(.08*markScaleX).toFixed(2)},${(20.1*markScaleY).toFixed(2)}Z`
  const tailPath   = `M${(24.47*markScaleX).toFixed(2)},${(.2*markScaleY).toFixed(2)}c${(-7.64*markScaleX).toFixed(2)},${(2.71*markScaleY).toFixed(2)},${(-15.33*markScaleX).toFixed(2)},${(11.05*markScaleY).toFixed(2)},${(-7.33*markScaleX).toFixed(2)},${(18.03*markScaleY).toFixed(2)},${(9.95*markScaleX).toFixed(2)},${(7.02*markScaleY).toFixed(2)},${(22.72*markScaleX).toFixed(2)},${(7*markScaleY).toFixed(2)},${(34.43*markScaleX).toFixed(2)},${(7.58*markScaleY).toFixed(2)},${(-12.26*markScaleX).toFixed(2)},${(2.63*markScaleY).toFixed(2)},${(-27.92*markScaleX).toFixed(2)},${(1.08*markScaleY).toFixed(2)},${(-39.99*markScaleX).toFixed(2)},${(-4.26*markScaleY).toFixed(2)}C${(-6.4*markScaleX).toFixed(2)},${(11.38*markScaleY).toFixed(2)},${(11.94*markScaleX).toFixed(2)},${(.64*markScaleY).toFixed(2)},${(24.43*markScaleX).toFixed(2)},0Z`

  const clipX = (.19 * markScaleX).toFixed(2)
  const clipY = (.1  * markScaleY).toFixed(2)
  const clipW = (108 * markScaleX).toFixed(2)
  const clipH = (36  * markScaleY).toFixed(2)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${H}" viewBox="0 0 ${totalW} ${H}">
  <defs>
    <clipPath id="lm-ex"><rect x="${clipX}" y="${clipY}" width="${clipW}" height="${clipH}"/></clipPath>
    <style>@import url('https://fonts.googleapis.com/css2?family=${fontId}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&amp;display=swap');</style>
  </defs>
  <rect width="${totalW}" height="${H}" fill="${bgClr}"/>
  <g clip-path="url(#lm-ex)">
    <path d="${swooshPath}" fill="${swashClr}"/>
    <path d="${tailPath}" fill="${swashClr}"/>
  </g>
  ${textSvg}  ${tagSvg}
</svg>`
}

function downloadSvg(opts = {}) {
  const svgStr  = buildLogoSvg(opts)
  const blob    = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
  const url     = URL.createObjectURL(blob)
  const a       = document.createElement('a')
  a.href        = url
  a.download    = opts.dark ? 'fluent-future-logo-dark.svg' : opts.teal ? 'fluent-future-logo-teal.svg' : 'fluent-future-logo.svg'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="bp">
    <!-- â”€â”€ Header â”€â”€ -->
    <header class="bp-hdr">
      <div class="bp-hdr-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        <div>
          <h1 class="bp-hdr-h">Brand / Logo</h1>
          <p class="bp-hdr-sub">Design the logo with live preview</p>
        </div>
      </div>
      <div class="bp-hdr-actions">
        <button class="bpbtn bpbtn--ghost" @click="reset">Reset</button>
        <div class="dl-split">
          <button class="bpbtn bpbtn--outline" @click="downloadSvg({})">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            SVG light
          </button>
          <button class="bpbtn bpbtn--outline" @click="downloadSvg({ dark: true })" style="padding: 7px 10px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            SVG dark
          </button>
        </div>
        <button class="bpbtn bpbtn--primary" :class="{ 'bpbtn--saved': saved }" :disabled="saving" @click="save">
          <svg v-if="saved" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          {{ saving ? 'Saving\u2026' : saved ? 'Saved' : 'Save' }}
        </button>
      </div>
    </header>

    <!-- â”€â”€ Body: 50/50 split â”€â”€ -->
    <div class="bp-body">

      <!-- LEFT â€” preview panel -->
      <div class="pv-panel">
        <p class="pv-panel-label">Logo preview</p>

        <!-- Main preview stage -->
        <div class="pv-stage pv-stage--main" :style="{ background: cfg.bgColor }">
          <div class="logo-comp" :style="{ alignSelf: cfg.layout === 'center' ? 'center' : 'flex-start' }">
            <div class="logo-name-group" :style="{ paddingLeft: `${cresIndent}px` }">
              <span v-for="(line, i) in mainText()" :key="i"
                    class="logo-name-line" :style="mainStyle">{{ line }}</span>
            </div>
            <div v-if="cfg.showSwoosh !== false" class="logo-swoosh-wrap"
                 :style="{ marginTop: `-${swooshOverlap}px`, marginLeft: `${swooshLeftPx}px` }">
              <svg viewBox="0 0 108.19 36.1"
                   :width="swooshWExt" :height="swooshH"
                   preserveAspectRatio="none"
                   overflow="hidden" xmlns="http://www.w3.org/2000/svg">
                <defs><clipPath id="lm-main"><rect x=".19" y=".1" width="108" height="36"/></clipPath></defs>
                <g clip-path="url(#lm-main)">
                  <path d="M.07,20.1c-.51-1.56,2.08-9.88,2.32-4.54,17.11,30.04,77.43,2.51,105.23,6.1-20.09,1.04-39.51,7.23-59.1,11.53C34.03,35.81,1.79,41.27.08,20.1h0Z" :fill="cfg.accentColor"/>
                  <path d="M24.47.2c-7.64,2.71-15.33,11.05-7.33,18.03,9.95,7.02,22.72,7,34.43,7.58-12.26,2.63-27.92,1.08-39.99-4.26C-6.4,11.38,11.94.64,24.43,0c0,.06.03.13.04.2Z" :fill="cfg.accentColor"/>
                </g>
              </svg>
            </div>
            <div v-if="cfg.showTagline" class="logo-tagline-row"
                 :style="{ paddingLeft: `${cresIndent}px`, marginTop: '6px' }">
              <span class="logo-tagline-text" :style="taglineStyle">{{ cfg.tagline }}</span>
            </div>
          </div>
        </div>

        <!-- Mini previews -->
        <div class="pv-mini-row">
          <div class="pv-mini-wrap">
            <div class="pv-label pv-label--sm">Dark background</div>
            <div class="pv-stage pv-stage--mini" style="background:#1a2035">
              <div class="logo-comp">
                <div class="logo-name-group" :style="{ paddingLeft: `${Math.round(cresIndent * 0.52)}px` }">
                  <span v-for="(line, i) in mainText()" :key="i" class="logo-name-line"
                        :style="{ ...mainStyle, fontSize: `${cfg.fontSize * 0.52}px`, color: '#FEFAF5' }">{{ line }}</span>
                </div>
                <div v-if="cfg.showSwoosh !== false" class="logo-swoosh-wrap"
                     :style="{ marginTop: `-${Math.round(swooshOverlap * 0.52)}px`, marginLeft: `${Math.round(swooshLeftPx * 0.52)}px` }">
                  <svg viewBox="0 0 108.19 36.1"
                       :width="swooshWExt * 0.52" :height="swooshH * 0.52"
                       preserveAspectRatio="none"
                       overflow="hidden" xmlns="http://www.w3.org/2000/svg">
                    <defs><clipPath id="lm-dark"><rect x=".19" y=".1" width="108" height="36"/></clipPath></defs>
                    <g clip-path="url(#lm-dark)">
                      <path d="M.07,20.1c-.51-1.56,2.08-9.88,2.32-4.54,17.11,30.04,77.43,2.51,105.23,6.1-20.09,1.04-39.51,7.23-59.1,11.53C34.03,35.81,1.79,41.27.08,20.1h0Z" fill="#FEFAF5"/>
                      <path d="M24.47.2c-7.64,2.71-15.33,11.05-7.33,18.03,9.95,7.02,22.72,7,34.43,7.58-12.26,2.63-27.92,1.08-39.99-4.26C-6.4,11.38,11.94.64,24.43,0c0,.06.03.13.04.2Z" fill="#FEFAF5"/>
                    </g>
                  </svg>
                </div>
                <div v-if="cfg.showTagline" class="logo-tagline-row"
                     :style="{ paddingLeft: `${Math.round(cresIndent * 0.52)}px`, marginTop: '3px' }">
                  <span :style="{ ...taglineStyle, fontSize: `${cfg.taglineSize * 0.52}px`, color: 'rgba(255,255,255,.55)' }">{{ cfg.tagline }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pv-mini-wrap">
            <div class="pv-label pv-label--sm">Teal background</div>
            <div class="pv-stage pv-stage--mini" style="background:#2E8A93">
              <div class="logo-comp">
                <div class="logo-name-group" :style="{ paddingLeft: `${Math.round(cresIndent * 0.52)}px` }">
                  <span v-for="(line, i) in mainText()" :key="i" class="logo-name-line"
                        :style="{ ...mainStyle, fontSize: `${cfg.fontSize * 0.52}px`, color: '#FEFAF5' }">{{ line }}</span>
                </div>
                <div v-if="cfg.showSwoosh !== false" class="logo-swoosh-wrap"
                     :style="{ marginTop: `-${Math.round(swooshOverlap * 0.52)}px`, marginLeft: `${Math.round(swooshLeftPx * 0.52)}px` }">
                  <svg viewBox="0 0 108.19 36.1"
                       :width="swooshWExt * 0.52" :height="swooshH * 0.52"
                       preserveAspectRatio="none"
                       overflow="hidden" xmlns="http://www.w3.org/2000/svg">
                    <defs><clipPath id="lm-teal"><rect x=".19" y=".1" width="108" height="36"/></clipPath></defs>
                    <g clip-path="url(#lm-teal)">
                      <path d="M.07,20.1c-.51-1.56,2.08-9.88,2.32-4.54,17.11,30.04,77.43,2.51,105.23,6.1-20.09,1.04-39.51,7.23-59.1,11.53C34.03,35.81,1.79,41.27.08,20.1h0Z" fill="rgba(255,255,255,0.35)"/>
                      <path d="M24.47.2c-7.64,2.71-15.33,11.05-7.33,18.03,9.95,7.02,22.72,7,34.43,7.58-12.26,2.63-27.92,1.08-39.99-4.26C-6.4,11.38,11.94.64,24.43,0c0,.06.03.13.04.2Z" fill="rgba(255,255,255,0.35)"/>
                    </g>
                  </svg>
                </div>
                <div v-if="cfg.showTagline" class="logo-tagline-row"
                     :style="{ paddingLeft: `${Math.round(cresIndent * 0.52)}px`, marginTop: '3px' }">
                  <span :style="{ ...taglineStyle, fontSize: `${cfg.taglineSize * 0.52}px`, color: 'rgba(255,255,255,.7)' }">{{ cfg.tagline }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!-- /pv-panel -->

      <!-- RIGHT â€” controls panel (scrollable) -->
      <div class="ctrl-panel">

        <!-- â”€â”€ TEXTO PRINCIPAL â”€â”€ -->
        <div class="sec-divider">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
          Main text
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">Name on two lines</label>
            <label class="cs-toggle field-toggle">
              <input type="checkbox" v-model="cfg.twoLines" />
              Split into two lines
            </label>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">{{ cfg.twoLines ? 'Line 1' : 'Full name' }}</label>
            <input class="field-input" v-model="cfg.line1" />
          </div>
          <div v-if="cfg.twoLines" class="field">
            <label class="field-label">Line 2</label>
            <input class="field-input" v-model="cfg.line2" />
          </div>
        </div>

        <div class="field">
          <label class="field-label">Font</label>
          <div class="font-grid">
            <button v-for="f in fonts" :key="f.family"
                    class="font-chip" :class="{ 'font-chip--active': cfg.font === f.family }"
                    @click="cfg.font = f.family">
              <span class="font-chip-sample" :style="{ fontFamily: `'${f.family}', serif` }">Aa</span>
              <span class="font-chip-label">{{ f.label }}</span>
              <span class="font-chip-style">{{ f.style }}</span>
            </button>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">Weight</label>
            <div class="weight-chips">
              <button v-for="w in weights" :key="w.value"
                      class="weight-chip" :class="{ 'weight-chip--active': cfg.fontWeight === w.value }"
                      :style="{ fontWeight: w.value }"
                      @click="cfg.fontWeight = w.value">{{ w.label }}</button>
            </div>
          </div>
          <div class="field">
            <label class="field-label">Style</label>
            <div class="style-toggles">
              <button class="style-toggle" :class="{ 'style-toggle--on': cfg.uppercase }" @click="cfg.uppercase = !cfg.uppercase">ABC</button>
              <button class="style-toggle" :class="{ 'style-toggle--on': cfg.italic }" @click="cfg.italic = !cfg.italic" style="font-style:italic">Italic</button>
            </div>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">Size <span class="field-val">{{ cfg.fontSize }}px</span></label>
            <input type="range" min="24" max="90" step="1" v-model.number="cfg.fontSize" class="cs-slider" />
          </div>
          <div class="field">
            <label class="field-label">Spacing <span class="field-val">{{ cfg.letterSpacing }}em</span></label>
            <input type="range" min="0" max="0.3" step="0.01" v-model.number="cfg.letterSpacing" class="cs-slider" />
          </div>
        </div>

        <div class="field">
          <label class="field-label">Name color</label>
          <div class="color-inline">
            <button class="color-swatch"
                    :style="{ background: cfg.mainColor, border: ['#FFFFFF','#FEFAF5'].includes(cfg.mainColor) ? '1.5px solid #d0d3d8' : 'none' }"
                    @click="togglePicker('mainColor')"></button>
            <input class="field-input field-input--hex" v-model="cfg.mainColor" @input="openPicker = null" />
          </div>
          <div v-if="openPicker === 'mainColor'" class="color-popover">
            <div class="color-dots">
              <button v-for="c in palette" :key="c.hex" class="color-dot"
                      :class="{ selected: cfg.mainColor === c.hex }"
                      :style="{ background: c.hex, border: ['#FFFFFF','#FEFAF5'].includes(c.hex) ? '1px solid #ddd' : 'none' }"
                      :title="c.label" @click="applyColor('mainColor', c.hex)"></button>
            </div>
            <input type="color" class="native-clr" v-model="cfg.mainColor" />
          </div>
        </div>

        <!-- â”€â”€ SWOOSH â”€â”€ -->
        <div class="sec-divider">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9"/><path d="M3 12c2 3 5 5 9 5s7-2 9-5"/></svg>
          Swoosh / Mark
        </div>

        <div class="field">
          <label class="field-label">Show swoosh</label>
          <label class="cs-toggle field-toggle">
            <input type="checkbox" v-model="cfg.showSwoosh" />
            Visible
          </label>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">Swoosh color</label>
            <div class="color-inline">
              <button class="color-swatch"
                      :style="{ background: cfg.accentColor, border: ['#FFFFFF','#FEFAF5'].includes(cfg.accentColor) ? '1.5px solid #d0d3d8' : 'none' }"
                      @click="togglePicker('accentColor')"></button>
              <input class="field-input field-input--hex" v-model="cfg.accentColor" @input="openPicker = null" />
            </div>
            <div v-if="openPicker === 'accentColor'" class="color-popover">
              <div class="color-dots">
                <button v-for="c in palette" :key="c.hex" class="color-dot"
                        :class="{ selected: cfg.accentColor === c.hex }"
                        :style="{ background: c.hex, border: ['#FFFFFF','#FEFAF5'].includes(c.hex) ? '1px solid #ddd' : 'none' }"
                        :title="c.label" @click="applyColor('accentColor', c.hex)"></button>
              </div>
              <input type="color" class="native-clr" v-model="cfg.accentColor" />
            </div>
          </div>
          <div class="field">
            <label class="field-label">← Swoosh length →</label>
            <div class="slider-row">
              <input type="range" min="1.0" max="3.0" step="0.05"
                     :value="cfg.swooshExtend ?? 1.65"
                     @input="cfg.swooshExtend = parseFloat($event.target.value)" />
              <span class="slider-val">{{ (cfg.swooshExtend ?? 1.65).toFixed(2) }}×</span>
            </div>
          </div>
          <div class="field">
            <label class="field-label">← Swoosh position →</label>
            <div class="slider-row">
              <input type="range" min="0" max="1.5" step="0.05"
                     :value="cfg.swooshOffset ?? 0.45"
                     @input="cfg.swooshOffset = parseFloat($event.target.value)" />
              <span class="slider-val">{{ (cfg.swooshOffset ?? 0.45).toFixed(2) }}×</span>
            </div>
          </div>
          <div class="field">
            <label class="field-label">Logo background</label>
            <div class="color-inline">
              <button class="color-swatch"
                      :style="{ background: cfg.bgColor, border: ['#FFFFFF','#FEFAF5'].includes(cfg.bgColor) ? '1.5px solid #d0d3d8' : 'none' }"
                      @click="togglePicker('bgColor')"></button>
              <input class="field-input field-input--hex" v-model="cfg.bgColor" @input="openPicker = null" />
            </div>
            <div v-if="openPicker === 'bgColor'" class="color-popover">
              <div class="color-dots">
                <button v-for="c in palette" :key="c.hex" class="color-dot"
                        :class="{ selected: cfg.bgColor === c.hex }"
                        :style="{ background: c.hex, border: ['#FFFFFF','#FEFAF5'].includes(c.hex) ? '1px solid #ddd' : 'none' }"
                        :title="c.label" @click="applyColor('bgColor', c.hex)"></button>
              </div>
              <input type="color" class="native-clr" v-model="cfg.bgColor" />
            </div>
          </div>
        </div>

        <!-- â”€â”€ ESLOGAN â”€â”€ -->
        <div class="sec-divider">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Tagline
        </div>

        <div class="field">
          <label class="field-label">Show tagline</label>
          <label class="cs-toggle field-toggle">
            <input type="checkbox" v-model="cfg.showTagline" />
            Visible
          </label>
        </div>

        <div v-if="cfg.showTagline">
          <div class="field">
            <label class="field-label">Tagline text</label>
            <input class="field-input" v-model="cfg.tagline" />
          </div>
          <div class="field">
            <label class="field-label">
              ← Horizontal position →
              <span class="field-val">{{ cfg.taglineX }}%</span>
            </label>
            <input type="range" min="0" max="100" step="1" v-model.number="cfg.taglineX" class="cs-slider" />
          </div>
          <div class="field">
            <label class="field-label">
              ↕ Vertical position
              <span class="field-val">{{ cfg.taglineY }}%</span>
            </label>
            <input type="range" min="90" max="200" step="1" v-model.number="cfg.taglineY" class="cs-slider" />
          </div>
          <div class="field-row">
            <div class="field">
              <label class="field-label">Size <span class="field-val">{{ cfg.taglineSize }}px</span></label>
              <input type="range" min="9" max="24" step="1" v-model.number="cfg.taglineSize" class="cs-slider" />
            </div>
            <div class="field">
              <label class="field-label">Color</label>
              <div class="color-inline">
                <button class="color-swatch"
                        :style="{ background: cfg.taglineColor, border: ['#FFFFFF','#FEFAF5'].includes(cfg.taglineColor) ? '1.5px solid #d0d3d8' : 'none' }"
                        @click="togglePicker('taglineColor')"></button>
                <input class="field-input field-input--hex" v-model="cfg.taglineColor" @input="openPicker = null" />
              </div>
              <div v-if="openPicker === 'taglineColor'" class="color-popover">
                <div class="color-dots">
                  <button v-for="c in palette" :key="c.hex" class="color-dot"
                          :class="{ selected: cfg.taglineColor === c.hex }"
                          :style="{ background: c.hex, border: ['#FFFFFF','#FEFAF5'].includes(c.hex) ? '1px solid #ddd' : 'none' }"
                          :title="c.label" @click="applyColor('taglineColor', c.hex)"></button>
                </div>
                <input type="color" class="native-clr" v-model="cfg.taglineColor" />
              </div>
            </div>
          </div>
        </div>

        <div style="height: 40px"></div>

      </div><!-- /ctrl-panel -->
    </div><!-- /bp-body -->
  </div>
</template>

<style scoped>
/* â”€â”€ Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.bp {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Karla', -apple-system, sans-serif;
}

/* â”€â”€ Body: 50/50 split â”€â”€ */
.bp-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
}

/* LEFT â€” preview panel */
.pv-panel {
  width: 50%;
  flex-shrink: 0;
  border-right: 1px solid #e2e8f0;
  background: #eef2f7;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 20px;
  overflow-y: auto;
}
.pv-panel-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  color: #888;
  text-transform: uppercase;
}

/* RIGHT â€” controls panel */
.ctrl-panel {
  width: 50%;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 0 20px 40px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

.sec-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 0 10px;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f8fafc;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #2e8a93;
}
.sec-divider:first-child { padding-top: 6px; }
.sec-divider svg { flex-shrink: 0; }
.sec-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

/* field row â€” two columns for paired fields */
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  position: relative;
}
.field-label {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: .06em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.field-val { font-weight: 400; color: #b0b5bc; font-size: 10px; }
.field-input {
  width: 100%;
  padding: 8px 11px;
  border: 1.5px solid #e2e8f0;
  border-radius: 7px;
  font-size: 14px;
  color: #1a1f2e;
  background: #fff;
  font-family: inherit;
  transition: border-color .15s;
}
.field-input:focus { outline: none; border-color: #2e8a93; }
.field-input--hex { font-family: 'Courier New', monospace; font-size: 12px; }
.field-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  padding: 6px 0;
}
.field-toggle input { accent-color: #2e8a93; cursor: pointer; width: 15px; height: 15px; }
.color-inline { display: flex; align-items: center; gap: 8px; }

/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.bp-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e8eaed;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.bp-hdr-title { display: flex; align-items: center; gap: 12px; color: #2e8a93; }
.bp-hdr-h   { font-size: 17px; font-weight: 700; color: #1a2035; line-height: 1.2; }
.bp-hdr-sub { font-size: 12px; color: #888; margin-top: 1px; }
.bp-hdr-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.dl-split { display: flex; gap: 4px; }

.bpbtn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  border-radius: 7px;
  font-size: 13px; font-weight: 500;
  cursor: pointer; border: 1.5px solid transparent;
  transition: background .15s, color .15s, border-color .15s;
  line-height: 1; white-space: nowrap; font-family: inherit;
}
.bpbtn--ghost   { background: none; color: #666; }
.bpbtn--ghost:hover { background: #f0f2f5; color: #333; }
.bpbtn--outline { background: none; color: #333; border-color: #d0d3d8; }
.bpbtn--outline:hover { background: #f5f6f8; border-color: #b0b5bc; }
.bpbtn--primary { background: #2e8a93; color: #fff; border-color: #2e8a93; }
.bpbtn--primary:hover:not(:disabled) { background: #1e6e76; border-color: #1e6e76; }
.bpbtn--primary:disabled { opacity: .6; cursor: default; }
.bpbtn--saved   { background: #4caf7d !important; border-color: #4caf7d !important; }

/* â”€â”€ Preview area (inside the flat form) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.pv-label    { font-size: 10px; font-weight: 700; letter-spacing: .1em; color: #888; text-transform: uppercase; }
.pv-label--sm { font-size: 9px; }

/* Main stage */
.pv-stage {
  border-radius: 12px;
  overflow: visible;
  box-shadow: 0 2px 16px rgba(0,0,0,.1);
  padding: 40px 44px;
}
.pv-stage--main { padding: 36px 40px; overflow-x: auto; overflow-y: visible; }
.pv-stage--mini { padding: 20px 24px; overflow: hidden; }

/* Mini previews side by side */
.pv-mini-row { display: flex; gap: 14px; }
.pv-mini-wrap { flex: 1; display: flex; flex-direction: column; gap: 6px; }

/* â”€â”€ Logo composition stacked â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.logo-comp {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.logo-name-group {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}
.logo-name-line { display: block; white-space: nowrap; }
.logo-swoosh-wrap {
  position: relative;
  z-index: 1;
  display: block;
  line-height: 0;
}
.logo-tagline-row { margin: 0; }
.logo-tagline-text { display: block; white-space: nowrap; }

/* Slider (shared) */
.cs-slider { width: 100%; accent-color: #2e8a93; cursor: pointer; }

/* Font grid */
.font-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.font-chip {
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
  padding: 8px 10px; border-radius: 7px;
  border: 1.5px solid #e2e5ea; background: #fff;
  cursor: pointer; transition: border-color .15s, background .15s; text-align: left;
}
.font-chip:hover { border-color: #b0b5bc; }
.font-chip--active { border-color: #2e8a93 !important; background: #f0fafb !important; }
.font-chip-sample { font-size: 20px; line-height: 1; color: #1a2035; display: block; }
.font-chip--active .font-chip-sample { color: #2e8a93; }
.font-chip-label { font-size: 10px; font-weight: 600; color: #333; font-family: 'Karla', sans-serif; display: block; margin-top: 3px; }
.font-chip-style { font-size: 9px; color: #999; font-family: 'Karla', sans-serif; display: block; }

/* Weight chips */
.weight-chips { display: flex; flex-wrap: wrap; gap: 5px; }
.weight-chip {
  padding: 4px 9px; border-radius: 5px;
  border: 1.5px solid #e2e5ea; background: #fff;
  font-size: 11px; color: #555; cursor: pointer;
  transition: border-color .15s; font-family: inherit;
}
.weight-chip--active { border-color: #2e8a93; background: #f0fafb; color: #2e8a93; }

/* Style toggles */
.style-toggles { display: flex; gap: 6px; padding: 9px 13px; }
.style-toggle {
  padding: 5px 13px; border-radius: 6px;
  border: 1.5px solid #e2e5ea; background: #fff;
  font-size: 12px; font-weight: 600; color: #666; cursor: pointer;
  transition: border-color .15s, background .15s, color .15s; font-family: 'Karla', sans-serif;
}
.style-toggle--on { border-color: #2e8a93; background: #f0fafb; color: #2e8a93; }

/* Color fields */
.color-grid { display: grid; grid-template-columns: 1fr 1fr; }
.color-field {
  padding: 9px 13px;
  border-bottom: 1px solid #edf0f3;
  border-right: 1px solid #edf0f3;
  position: relative;
}
.color-field:nth-child(2n) { border-right: none; }
.color-field:nth-last-child(-n+2) { border-bottom: none; }
.color-row { display: flex; align-items: center; gap: 8px; margin-top: 5px; }
.color-swatch {
  width: 26px; height: 26px; border-radius: 6px; cursor: pointer;
  flex-shrink: 0; transition: transform .12s;
}
.color-swatch:hover { transform: scale(1.1); }
.color-popover {
  position: absolute; top: 100%; left: 0; z-index: 20;
  background: #fff; border: 1px solid #d8dce3; border-radius: 10px;
  padding: 10px; box-shadow: 0 4px 20px rgba(0,0,0,.12);
  display: flex; flex-direction: column; gap: 8px; min-width: 176px;
}
.color-dots { display: flex; flex-wrap: wrap; gap: 6px; }
.color-dot {
  width: 22px; height: 22px; border-radius: 50%; cursor: pointer;
  border: none; transition: transform .1s, box-shadow .1s; outline-offset: 3px;
}
.color-dot:hover { transform: scale(1.15); }
.color-dot.selected {
  outline: 2.5px solid #2e8a93;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(46,138,147,.18);
}
.native-clr { width: 100%; height: 28px; border: 1.5px solid #d8dce3; border-radius: 6px; cursor: pointer; padding: 2px; }

/* Alignment chips */
.chip-row { display: flex; flex-wrap: wrap; gap: 5px; }
.chip {
  padding: 5px 12px; border-radius: 6px;
  border: 1.5px solid #e2e5ea; background: #fff;
  font-size: 12px; font-weight: 500; color: #555;
  cursor: pointer; transition: border-color .15s, background .15s, color .15s; font-family: inherit;
}
.chip--on { border-color: #2e8a93; background: #f0fafb; color: #2e8a93; }
</style>

