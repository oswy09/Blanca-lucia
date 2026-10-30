const MOCK_POSTS = [
  {
    slug: 'why-fluency-is-not-just-about-vocabulary',
    title: 'Why fluency is not just about vocabulary',
    excerpt: 'Many learners focus on building vocabulary, yet still feel something is missing when they speak. The gap is almost never about words.',
    category: 'Language & Communication',
    readTime: '4 min read',
    date: '2026-08-18',
    image: '/imagens/personalized advice.JPG',
    featured: true,
  },
  {
    slug: 'how-to-sound-confident-in-english-meetings',
    title: 'How to sound confident in English meetings',
    excerpt: 'Confidence in a meeting is not just about what you say — it is about pacing, phrasing, and knowing when to hold space.',
    category: 'Professional English',
    readTime: '5 min read',
    date: '2026-07-30',
    image: '/imagens/video call learning.JPG',
    featured: false,
  },
  {
    slug: 'the-difference-between-correct-and-natural-english',
    title: 'The difference between correct and natural English',
    excerpt: 'Grammar rules will get you to correct. But natural expression — the kind that earns trust — comes from something deeper.',
    category: 'Language & Communication',
    readTime: '3 min read',
    date: '2026-07-14',
    image: '/imagens/adult learning English.jpg',
    featured: false,
  },
  {
    slug: 'writing-professional-emails-in-english',
    title: 'Writing professional emails in English: what most guides miss',
    excerpt: 'Most advice focuses on grammar and template phrases. What actually makes an email professional is something subtler.',
    category: 'Professional Writing',
    readTime: '6 min read',
    date: '2026-06-22',
    image: '/imagens/woman speechless.JPG',
    featured: false,
  },
  {
    slug: 'preparing-for-english-job-interviews-as-a-native-spanish-speaker',
    title: 'Preparing for English job interviews as a native Spanish speaker',
    excerpt: 'An interview is not a test of your English level. It is a conversation — and preparation changes everything about how you show up.',
    category: 'Interview Preparation',
    readTime: '7 min read',
    date: '2026-06-05',
    image: '/imagens/live-session.webp',
    featured: false,
  },
]

export default defineEventHandler(async (event) => {
  const kv = (event.context.cloudflare as any)?.env?.CONTENT_KV

  let kvPosts: any[] = []
  if (kv) {
    try {
      kvPosts = (await kv.get('blog:index', { type: 'json' })) || []
    } catch {}
  }

  const merged = [
    ...kvPosts,
    ...MOCK_POSTS.filter(m => !kvPosts.some((k: any) => k.slug === m.slug)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return merged
})
