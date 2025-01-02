export interface IDemo {
  label: string
  key: string
  children?: IDemo[]
}

export function getDemos(): Record<string, () => Promise<any>> {
  const demos = import.meta.glob(['./**/index.vue'])
  return demos
}

export function getDemoSource(): Record<string, () => Promise<any>> {
  const source = import.meta.glob(['./**/index.vue'], {
    query: '?raw',
    import: 'default'
  })
  return source
}
