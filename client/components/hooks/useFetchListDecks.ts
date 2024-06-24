import { useEffect, useState } from 'react'
import { loadAllDecks } from '../../api'

//hook for api call to load all decknames in client when app is loaded
//only calls decknames

function useFetchListDecks() {
  const [deckList, setDeckList] = useState([] as string[])
  const [loading, setLoading] = useState(true as boolean)
  const [error, setError] = useState('')

  function fetchListDecks() {
    setLoading(true)
    setError('')

    loadAllDecks()
      .then((data) => {
        setDeckList(data)
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        setError(error.message)
      })
  }

  useEffect(() => {
    fetchListDecks()
  }, [])

  return { deckList, loading, error, fetchListDecks }
}

export default useFetchListDecks
