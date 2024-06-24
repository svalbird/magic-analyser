import { useEffect, useState } from 'react'
import { cardInDeck } from '../../../types/cardFull'
import { loadDeck } from '../../api'

//hook for api call to load all deck info into client when a deck is loaded
//contains all card info

function useFetchDecks(deckname: string) {
  const [deck, setDeck] = useState([] as cardInDeck[])
  const [loading, setLoading] = useState(true as boolean)
  const [error, setError] = useState('')

  function fetchDeck(deckTitle: string) {
    setLoading(true)
    setError('')

    loadDeck(deckTitle)
      .then((data) => {
        setDeck(data.deck)
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        setError(error.message)
      })
  }

  useEffect(() => {
    fetchDeck(deckname)
  }, [deckname])

  return { deck, loading, error, fetchDeck }
}

export default useFetchDecks
