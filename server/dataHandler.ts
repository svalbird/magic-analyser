//db handling functions
//db structure can be found at /planning/database plan.png

const fs = require('node:fs/promises')

const config = require('./db/knexfile').development
const connection = require('knex')(config)

//folder has .txt files with deck info
//Check.txt for format - used by many deck editing sites (e.g. archidekt)
const imports = './server/imports/'

//EXTERNAL FUNCTIONS (called by api)
//uses formatDeckToArray to read txt file in imports to import deck
async function extractDeck(deckName: string, deckPath = imports) {
  const deck = await fs.readFile(`${deckPath}${deckName}.txt`, 'utf-8')
  const deckObject = formatDeckToArray(deck)
  return await addDeckToDb(deckName, deckObject)
}

//loads all info of cards within deck with a join between cardnames and the master card info db
async function loadFullDeck(deckName: string, db = connection) {
  const deckId = await db('decks').where({ name: deckName }).returning('id')
  const trueDeckId = deckId[0].id
  const loadedDeck = await db('cards')
    .whereLike('deckId', trueDeckId)
    .join('infos', 'cards.name', '=', 'infos.name')
    .groupBy('infos.name')

  return { deckName: deckName, deck: loadedDeck }
}

//loads all deck names
async function loadListOfDecks(db = connection) {
  return await db('decks').select('name')
}

//INTERNAL FUNCTIONS (called by other db functions)
//Reads a .txt file and reads data to extrace names and quantity of cards for a deck
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

//Adds a deck to the database - used by deck import function
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

export { extractDeck, loadFullDeck, loadListOfDecks }
