import { Card, Title, BarChart } from '@tremor/react'

//Displays mana values as a bar graph
//Currently not calculated
//Will map counts of mana values from manacost property of cards
const chartdata = [
  {
    name: 0,
    count: 0,
  },
  {
    name: 1,
    count: 6,
  },
  {
    name: 2,
    count: 17,
  },
  {
    name: 3,
    count: 15,
  },
  {
    name: 4,
    count: 10,
  },
  {
    name: 5,
    count: 8,
  },
]
function ManaCurve() {
  return (
    <div>
      <Card style={{ height: 490 }}>
        <Title>Mana Curve</Title>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="name"
          categories={['count']}
          colors={['blue']}
          showLegend={false}
        />
      </Card>
    </div>
  )
}

export default ManaCurve
