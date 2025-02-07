export function getDemos(): Record<string, () => Promise<any>> {
  const demos = import.meta.glob(['./**/demo/index.tsx'])
  return demos
}

export function getDemoSource(): Record<string, () => Promise<any>> {
  const source = import.meta.glob(['./**/demo/index.tsx'], {
    query: '?raw',
    import: 'default'
  })
  return source
}
