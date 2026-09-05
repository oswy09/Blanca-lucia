export function useStoryblokGlobal() {
  return useState<Record<string, string>>('sb-global', () => ({}))
}
