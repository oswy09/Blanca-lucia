<script setup>
defineProps({ height: { type: Number, default: 64 } })

useHead({
  link: [{
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&display=swap',
  }]
})

// Swoosh geometry — same logic as brand admin
const FS      = 28                                    // font-size px
const SH      = Math.round(FS * 1.1)                  // swoosh height = 31
const SW_BASE = Math.round(SH * (108.19 / 36.1))      // natural width = 93
const CRES    = Math.round(SW_BASE * 0.28)             // text left indent = 26
const OVERLAP = Math.round(SH * 0.5)                  // pull-up = 15
// Extended width so the tip reaches the "u" in "Future"
const SW      = Math.round(SW_BASE * 1.60)            // = 149
</script>

<template>
  <div class="sl" :style="{ height: height + 'px' }">
    <!-- Name text (indented so the C-crescent is visible to the left) -->
    <div class="sl-text" :style="{ paddingLeft: CRES + 'px' }">
      <span class="sl-name">Fluent Future</span>
    </div>

    <!-- Swoosh — wider than natural, stretched with preserveAspectRatio none -->
    <div class="sl-swoosh" :style="{ marginTop: '-' + OVERLAP + 'px' }">
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
          <path d="M.07,20.1c-.51-1.56,2.08-9.88,2.32-4.54,17.11,30.04,77.43,2.51,105.23,6.1-20.09,1.04-39.51,7.23-59.1,11.53C34.03,35.81,1.79,41.27,.08,20.1h0Z" fill="#2e8a93"/>
          <path d="M24.47,.2c-7.64,2.71-15.33,11.05-7.33,18.03,9.95,7.02,22.72,7,34.43,7.58-12.26,2.63-27.92,1.08-39.99,-4.26C-6.4,11.38,11.94,.64,24.43,0c0,.06.03.13.04.2Z" fill="#2e8a93"/>
        </g>
      </svg>
    </div>

    <!-- Tagline -->
    <div class="sl-tag" :style="{ paddingLeft: CRES + 'px' }">
      Your Path to Fluent Communication
    </div>
  </div>
</template>

<style scoped>
.sl {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 1;
  flex-shrink: 0;
}
.sl-text {
  position: relative;
  z-index: 2;
}
.sl-name {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #2e8a93;
  white-space: nowrap;
  display: block;
  line-height: 1.1;
}
.sl-swoosh {
  position: relative;
  z-index: 1;
  line-height: 0;
}
.sl-tag {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 10.5px;
  font-style: italic;
  color: #2e8a93;
  letter-spacing: 0.06em;
  white-space: nowrap;
  margin-top: 3px;
  line-height: 1;
}
</style>
