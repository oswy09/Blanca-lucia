export default defineEventHandler((event) => {
  if (process.env.MAINTENANCE_MODE !== 'true') return

  const path = getRequestPath(event)

  // Let admin, API, and static assets through
  if (
    path.startsWith('/admin') ||
    path.startsWith('/api') ||
    path.startsWith('/_nuxt') ||
    path.includes('.')
  ) return

  setResponseStatus(event, 200)
  setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coming Soon — Fluent Future</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100svh;
      background: #FEFAF5;
      color: #332E2A;
      font-family: 'Karla', -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      text-align: center;
    }
    .logo-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      margin-bottom: 48px;
    }
    .logo-name {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(36px, 6vw, 54px);
      font-weight: 600;
      color: #2E8A93;
      letter-spacing: 0.04em;
      line-height: 1;
    }
    .logo-tagline {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 13px;
      font-style: italic;
      color: #2E8A93;
      letter-spacing: 0.08em;
      opacity: 0.75;
    }
    .swoosh {
      width: clamp(120px, 18vw, 180px);
      height: auto;
      margin-bottom: 4px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(46,138,147,0.10);
      color: #2E8A93;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 999px;
      margin-bottom: 28px;
    }
    .badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #2E8A93;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.75); }
    }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(28px, 5vw, 48px);
      font-weight: 600;
      color: #1a2035;
      line-height: 1.2;
      margin-bottom: 20px;
      max-width: 540px;
    }
    p {
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.75;
      color: #6b7280;
      max-width: 480px;
      margin-bottom: 40px;
    }
    .divider {
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, #2E8A93, #4EC9C0);
      border-radius: 2px;
      margin: 0 auto 40px;
    }
    .contact {
      font-size: 13.5px;
      color: #9ca3af;
    }
    .contact a {
      color: #2E8A93;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid rgba(46,138,147,0.3);
      transition: border-color 0.2s;
    }
    .contact a:hover { border-color: #2E8A93; }
  </style>
</head>
<body>
  <div class="logo-wrap">
    <svg class="swoosh" viewBox="0 0 340 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M.2,33.5c-.8-2.6,3.5-16.5,3.9-7.6,28.6,50.2,129.4,4.2,175.9,10.2-33.6,1.7-66,12.1-98.8,19.3C55.2,59.9,3,68.9.2,33.5Z" fill="#2E8A93"/>
      <path d="M40.9.3c-12.8,4.5-25.6,18.5-12.2,30.1,16.6,11.7,38,11.7,57.6,12.7-20.5,4.4-46.7,1.8-66.9-7.1C-10.7,19,20,1.1,40.8,0c0,.1.05.22.1.3Z" fill="#2E8A93"/>
      <text x="118" y="44" font-family="'Cormorant Garamond', Georgia, serif" font-size="42" font-weight="600" fill="#2E8A93" letter-spacing="2">Fluent Future</text>
    </svg>
    <span class="logo-tagline">Your Path to Fluent Communication</span>
  </div>

  <div class="badge">
    <span class="badge-dot"></span>
    Almost there
  </div>

  <h1>We're putting the finishing touches</h1>

  <div class="divider"></div>

  <p>The Fluent Future website is being carefully prepared.<br>
  We'll be ready to welcome you very soon.</p>

  <p class="contact">
    In the meantime, feel free to reach out at<br>
    <a href="mailto:blanca.lucia.cardona@gmail.com">blanca.lucia.cardona@gmail.com</a>
  </p>
</body>
</html>`
})
