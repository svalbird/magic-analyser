import { Card, Metric, List, ListItem, Text } from '@tremor/react'
import { cardInDeck } from '../../types/cardFull'

//Displays the list of all cards in the deck w/ name and quantity

interface Props {
  deck: cardInDeck[]
  isLoading: boolean
  deckName: string
  hoverFunction?: any
}
function DeckInfo(props: Props) {
  //loading wheel while loading
  if (props.isLoading) {
    return (
      <div>
        <Card className="h-full">
          <Metric>{props.deckName}</Metric>
          <img
            src="/assets/loading.gif"
            alt="Loading..."
            className="flex-initial content-center justify-self-center"
          />
        </Card>
      </div>
    )
  }
  //after loading
  //uses map to quickly list all cards in deck
  return (
    <div>
      <Card className="h-full">
        <Metric>{props.deckName}</Metric>
        <List>
          <ListItem>
            <span>
              <b>Card Name</b>
            </span>
            <span>
              <b>Quantity</b>
            </span>
          </ListItem>
          {props.deck.map((card, index) => (
            <ListItem
              key={index}
              onMouseEnter={() => props.hoverFunction(card.name)}
            >
              <span>{card.name}</span>
              <span>{card.quantity}</span>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  )
}

export default DeckInfo
