const MOCK_ARTICLES: Record<string, any> = {
  'why-fluency-is-not-just-about-vocabulary': {
    slug: 'why-fluency-is-not-just-about-vocabulary',
    title: 'Why fluency is not just about vocabulary',
    excerpt: 'Many learners focus on building vocabulary, yet still feel something is missing when they speak. The gap is almost never about words.',
    category: 'Language & Communication',
    readTime: '4 min read',
    date: '2026-08-18',
    image: '/imagens/personalized advice.JPG',
    featured: true,
    body: [
      { type: 'p', text: 'When people describe their frustration with English, the most common assumption is that they need more words. More vocabulary. A richer lexicon. And so they study lists, download apps, and read articles — yet when the moment comes to speak, something still feels missing.' },
      { type: 'p', text: 'In my experience working with Spanish-speaking professionals over more than thirty years, the gap is almost never vocabulary. The words are there. What is missing is something subtler: the rhythm of a language, the way it breathes, the pauses that signal thinking rather than hesitation.' },
      { type: 'h2', text: 'The difference between knowing and using' },
      { type: 'p', text: 'There is a well-documented phenomenon in applied linguistics called the gap between receptive and productive knowledge. You may understand a word perfectly when you read it — you may even know three synonyms — but in real-time conversation, you cannot reach for it quickly enough. The word does not feel like yours yet.' },
      { type: 'p', text: 'This is not a vocabulary problem. It is a fluency problem — and fluency is about processing speed, not storage.' },
      { type: 'h2', text: 'What actually builds fluency' },
      { type: 'p', text: 'Fluency develops through repetition in context — through using language in situations that feel real and slightly pressured. Not drilling phrases from a textbook, but navigating actual conversations where the outcome matters. This is why professionals often progress faster when their practice is embedded in their professional world.' },
      { type: 'p', text: 'When I work with a client, we rarely begin with vocabulary exercises. We begin with listening — to how they speak, what they reach for under pressure, where they slow down. That is where the work begins.' },
      { type: 'h2', text: 'A different starting point' },
      { type: 'p', text: 'If you feel that something is missing when you speak English, consider that it might not be knowledge — it might be trust. Trust in the words you already have. Trust in the pauses. Trust in your own voice.' },
      { type: 'p', text: 'That is a different kind of work, and it is the kind I find most rewarding.' },
    ],
  },
  'how-to-sound-confident-in-english-meetings': {
    slug: 'how-to-sound-confident-in-english-meetings',
    title: 'How to sound confident in English meetings',
    excerpt: 'Confidence in a meeting is not just about what you say — it is about pacing, phrasing, and knowing when to hold space.',
    category: 'Professional English',
    readTime: '5 min read',
    date: '2026-07-30',
    image: '/imagens/video call learning.JPG',
    featured: false,
    body: [
      { type: 'p', text: 'A meeting in a foreign language is one of the most pressured communication situations a professional can face. The content is demanding, the stakes are real, and the expectation is that you will be articulate — in real time, without preparation.' },
      { type: 'p', text: 'Many of my clients describe a particular experience: they know exactly what they want to say, but by the time they find the words, the conversation has moved on. Or they speak, but sense that they sound less confident than they feel.' },
      { type: 'h2', text: 'Pacing is more powerful than vocabulary' },
      { type: 'p', text: 'The single most effective change most professionals can make is to slow down. Not because their English is poor, but because deliberate pacing reads as authority. Native speakers who are confident pause. They do not rush. A considered pause before a statement signals that what follows is worth hearing.' },
      { type: 'p', text: 'The instinct when speaking a second language is to fill space quickly — to demonstrate fluency by the pace of output. This instinct works against you. A slower pace with clear phrasing almost always reads as more professional than a rapid, anxious delivery.' },
      { type: 'h2', text: 'Transitional phrases that do real work' },
      { type: 'p', text: 'Certain phrases serve a double function in meetings: they signal that you are about to contribute, and they give you a moment to formulate your thought. Phrases like "What I would add to that is—" or "If I could come back to the earlier point—" are not filler. They are professional navigation tools.' },
      { type: 'p', text: 'Learning a small set of these phrases and making them genuinely yours — not recited, but fluent — changes how you participate in meetings.' },
    ],
  },
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const kv = (event.context.cloudflare as any)?.env?.CONTENT_KV

  if (kv) {
    try {
      const post = await kv.get(`blog:post:${slug}`, { type: 'json' })
      if (post) return post
    } catch {}
  }

  return MOCK_ARTICLES[slug as string] || null
})
