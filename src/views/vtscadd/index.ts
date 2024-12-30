export interface IDemo {
  label: string
  key: string
  children: IDemo[]
}

export function getDemos(): Record<string, any> {
  const demos = import.meta.glob(['./**/index.vue', './**/demo.png'], {
    eager: true
  })
  return demos
}
