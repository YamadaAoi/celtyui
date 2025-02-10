import ValueShow from 'src/components/celtyui/value/valueShow1'

export default function ValueShow1Demo() {
  const data = {
    label: '投币',
    value: 3,
    unit: '次',
    icon: '/favicon.svg'
  }

  return <ValueShow data={data} />
}
