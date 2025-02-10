import { useMemo } from 'react'

interface WordHighlightProps {
  text: string
  keywords?: string
}

export default function WordHighlight(props: WordHighlightProps) {
  const filterText = useMemo(() => {
    const origin = props.keywords ? `${props.keywords}` : ''
    let str = origin
    if (/(\+|-|&|\||!|\(|\)|\{|\}|\[|\]|\^|”|~|\*|\?|:|\\)/g.test(origin)) {
      // 把匹配到的特殊字符 替换成 转义符+原来的字符
      str = origin.replace(
        /(\+|-|&|\||!|\(|\)|\{|\}|\[|\]|\^|”|~|\*|\?|:|\\)/g,
        `\\${
          origin.match(
            /(\+|-|&|\||!|\(|\)|\{|\}|\[|\]|\^|”|~|\*|\?|:|\\)/g
          )?.[0]
        }`
      )
    }
    return str
  }, [props.keywords])

  return props.text && filterText
    ? props.text
        .split(new RegExp(`(?<=${filterText})|(?=${filterText})`, 'i'))
        .map((str: string, i: number) => {
          if (str.toLowerCase() === props.keywords?.toLowerCase()) {
            return (
              <mark key={i} style={{ color: 'red' }}>
                {str}
              </mark>
            )
          } else {
            return str
          }
        })
    : (props.text ?? '')
}
