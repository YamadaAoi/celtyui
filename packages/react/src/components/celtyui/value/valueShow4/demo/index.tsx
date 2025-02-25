import ValueShow from 'src/components/celtyui/value/valueShow4'

export default function ValueShow4Demo() {
  const data = {
    label: '投币',
    value: 3,
    unit: '次',
    icon: '/favicon.svg'
  }

  return <ValueShow data={data} />
}
