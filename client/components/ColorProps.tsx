import { Card, Title, Flex, DonutChart, Text } from '@tremor/react'
import { cardInDeck } from '../../types/cardFull'
import { useEffect, useState } from 'react'

//display for color distribution of cards in deck

//NOT COMPLETE YET
//data here is for display purposes only

const mana = [
  { name: 'White', cards: 20 },
  { name: 'Blue', cards: 8 },
  { name: 'Black', cards: 12 },
  { name: 'Red', cards: 0 },
  { name: 'Green', cards: 26 },
  { name: 'Colorless', cards: 30 },
]

//setting up dictionary with data, defualt 0
const defaultColor: [{ [key: string]: number }] = [
  { White: 0, Blue: 0, Black: 0, Red: 0, Green: 0, Colorless: 0 },
]

interface Props {
  deck: cardInDeck[]
}

//dictionary to match letter to words for calculation
//this is because color info is stored as letters in db (e.g. WRG to "white" "Red" "Green")
const convertDict: { [key: string]: string } = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
}

//unpacks colors in database to separate letters and parse them into words with the dictionary above
//some cards are colorless - if empty string will return as colorless
function colorUnpack(colorString: string) {
  const splitString = colorString.split(',')
  if (splitString[0] === '') {
    return ['Colorless']
  }
  return splitString.map((colorMark) => convertDict[colorMark])
}

//on load, calculates color count in a deck
function ColorProps(props: Props) {
  const [colorVals, setColorVals] = useState(defaultColor)

  useEffect(() => {
    const allColors = props.deck
      .map((card) => colorUnpack(card.color_id as string))
      .flat() as string[]

    const setValue = defaultColor
    //debugging tool in console
    console.log(colorVals)
    console.log(allColors)
    console.log(colorVals['Blue'])
    allColors.map((color) => setValue[color]++)
    setColorVals(setValue)
    console.log(colorVals)
  }, [colorVals, props.deck])

  //this is a function to map color count to graphable values
  //it doesn't work yet so i'm using pretend data for display purposes
  // eslint-disable-next-line prefer-const
  /*   let colorBase = defaultColor
  allColors.map((colorsInDeck) => {
    colorBase[colorsInDeck] = colorBase[colorsInDeck] + 1
  })
  setColorVals(colorBase) */

  //using tremor for graphing
  return (
    <div>
      <Card style={{ height: 330 }}>
        <Title>Color Proportions</Title>
        <Flex>
          <Text>Ratio of Color ID</Text>
          <Text>20 | 8 | 12 | 0 | 26</Text>
        </Flex>
        <DonutChart
          className="mt-6"
          data={mana}
          category="cards"
          index="name"
          colors={['yellow', 'blue', 'slate', 'red', 'green', 'gray']}
          showLabel={false}
          variant="pie"
        />
      </Card>
    </div>
  )
}

export default ColorProps
