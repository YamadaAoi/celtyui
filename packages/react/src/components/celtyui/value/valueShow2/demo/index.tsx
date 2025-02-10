import ValueShow from 'src/components/celtyui/value/valueShow2'

export default function ValueShow2Demo() {
  const data = {
    label: '下次一定',
    value: 999,
    unit: '次',
    icon: '/favicon.svg'
  }

  return <ValueShow data={data} />
}
