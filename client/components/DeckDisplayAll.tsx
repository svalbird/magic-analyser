import { Grid, Col, Title } from '@tremor/react'
import { SetStateAction, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CardDisplay from './CardDisplay'
import ColorProps from './ColorProps'
import DeckInfo from './DeckInfo'
import DeckLoad from './DeckLoad'
import useFetchDecks from './hooks/useFetchDecks'
import LandProps from './LandProps'
import ManaCurve from './ManaCurve'

//Main deck info display container - subcomponents are in separate files

function DeckDisplayAll() {
  //grabbing deck name from route
  const deckName = useParams().deckName as string
  //loading hook for deck info, passed to child components
  const { deck, loading, error, fetchDeck } = useFetchDecks(deckName)
  //selected card on hover
  const [selectCard, setSelectCard] = useState('')
  const onMouseover = (cardname: string) => {
    setSelectCard(cardname)
  }

  return (
    <div>
      <Grid numColsLg={8} className="gap-6 mt-6">
        <Col numColSpanLg={1}></Col>
        <Col numColSpanLg={1}>
          <div className="space-y-6">
            {/* <DeckLoad /> */}
            <Link to="/">
              <Title>Magic Analyzer</Title>
            </Link>
            <CardDisplay deck={deck} cardname={selectCard} key={selectCard} />
          </div>
        </Col>
        <Col numColSpanLg={3}>
          <DeckInfo
            deck={deck}
            deckName={deckName}
            isLoading={loading}
            hoverFunction={onMouseover}
          />
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <div className="space-y-6">
            <ColorProps deck={deck} />
            <LandProps />
            <ManaCurve />
          </div>
        </Col>
      </Grid>
    </div>
  )
}

export default DeckDisplayAll
