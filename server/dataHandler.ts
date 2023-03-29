const { default: knex } = require('knex')
const fs = require('node:fs/promises')

const config = require('./db/knexfile').development
const connection = require('knex')(config)

const imports = './server/imports/'

//EXTERNAL FUNCTIONS
async function extractDeck(deckName: string, deckPath = imports) {
  const deck = await fs.readFile(`${deckPath}${deckName}.txt`, 'utf-8')
  const deckObject = formatDeckToArray(deck)
  return await addDeckToDb(deckName, deckObject)
}

async function loadDeck(deckName: string, db = connection) {
  const deckId = await db('decks')
    .where({ name: deckName })
    .returning('id')
    .first().id

  return await db('cards').where({ deckId: deckId })
}

//INTERNAL FUNCTIONS
function formatDeckToArray(deck: string) {
  const newlineSplit: string[] = deck.split(/\r?\n/).slice(1)
  const deckObject: object[] = []
  for (const card of newlineSplit) {
    const dicedCard = card.split('')
    const cardQty = Number(dicedCard[0])
    const cardName = dicedCard.slice(2).join('')
    const cardObject: { name: string; qty: number } = {
      name: cardName,
      qty: cardQty,
    }
    deckObject.push(cardObject)
  }
  return deckObject as { name: string; qty: number }[]
}

async function addDeckToDb(
  deckName: string,
  deckObject: { name: string; qty: number }[],
  db = connection
) {
  const deckId = await db('decks').insert({ name: deckName }).returning('id')
  const trueDeckId = deckId[0].id
  for (let i = 0; i < deckObject.length; i++) {
    await db('cards').insert({
      name: deckObject[i].name,
      quantity: deckObject[i].qty,
      deckId: trueDeckId,
    })
  }
  return { deckId: trueDeckId }
}

export { extractDeck, loadDeck }
