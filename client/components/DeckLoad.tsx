import { Dropdown, DropdownItem, Button, Card } from '@tremor/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchListDecks from './hooks/useFetchListDecks'

//dropdown for selecting decks in database
function DeckLoad() {
  //calls hook for loading list of decks
  const { deckList, loading, error, fetchListDecks } = useFetchListDecks()
  const [deckName, setDeckName] = useState('')
  const navigate = useNavigate()

  const routeChange = () => {
    const path = deckName
    navigate(path)
  }

  //maps deck names into dropdown
  return (
    <div className="deckLoad absolute">
      <Card>
        <Dropdown
          onValueChange={(value) => setDeckName(value)}
          placeholder="Select deck..."
        >
          {deckList.map((deck, index) => {
            return <DropdownItem value={deck} text={deck} key={index} />
          })}
        </Dropdown>
        <div>
          <Button size="xs" onClick={routeChange}>
            Load Deck
          </Button>
        </div>
        <div>
          <Button size="xs" onClick={() => console.log('clicked')} color="gray">
            Import Deck...
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default DeckLoad
