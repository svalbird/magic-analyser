import fs from 'fs'
import JSONStream from 'JSONStream'
const config = require('./server/db/knexfile').development
const connection = require('knex')(config)

//cursed program to import giant scryfall card info file

//streaming used to not overwhelm RAM totally and utterly (it's like 2 gigs of JSON data)
const stream = fs.createReadStream('english-cards.json', { encoding: 'utf8' })

let counter = 1

//setting up knex connection
const db = connection

//will only attempt to pass properties that exist to the db, otherwise it doesn't like that
//This function verifies that the property exists, and if it doesn't then it passes it as a null
function verifyProperty(obj: any, newObj: any, prop: string, propAlt?: string) {
  if (Object.prototype.hasOwnProperty.call(obj, prop)) {
    if (propAlt === undefined) {
      newObj[prop] = obj[prop]
    } else {
      newObj[prop] = obj[propAlt]
    }
  }
}

//i counted.
const fileLines = 81146

//generates chunks for the giant json
const chunk: any[] = []
async function insertChunk() {
  for (let i = 0; i < chunk.length; i++) {
    await db('infos').insert(chunk[i])
  }
  console.log('All done!')
}
//on each line (which is a new card) it passes a new card into the database, adding all 'relevant' properties and only adding optional parameters where they exist
async function parseFile() {
  stream.pipe(JSONStream.parse('*')).on('data', async function (data: any) {
    let newCard: any = {
      unique_id: data.id,
      oracle_id: data.oracle_id,
      name: data.name,
      uri: data.uri,
      description: data.oracle_text,
      oracle_text: data.oracle_text,
      lang: data.lang,
      set_name: data.set_name,
      edhrec_rank: data.edhrec_rank,
      price_usd: data.prices.usd,
    }

    verifyProperty(data, newCard, 'power')
    verifyProperty(data, newCard, 'toughness')
    verifyProperty(data, newCard, 'flavor_text')
    verifyProperty(data, newCard, 'mana_cost')
    verifyProperty(data, newCard, 'cmc')
    verifyProperty(data, newCard, 'type_line')
    verifyProperty(data, newCard, 'rarity')
    verifyProperty(data, newCard, 'artist')

    if (
      Object.prototype.hasOwnProperty.call(data, 'image_uris') &&
      Object.prototype.hasOwnProperty.call(data.image_uris, 'small')
    ) {
      newCard.image_small = data.image_uris.small
    }
    if (
      Object.prototype.hasOwnProperty.call(data, 'image_uris') &&
      Object.prototype.hasOwnProperty.call(data.image_uris, 'normal')
    ) {
      newCard.image_normal = data.image_uris.normal
    }
    if (
      Object.prototype.hasOwnProperty.call(data, 'image_uris') &&
      Object.prototype.hasOwnProperty.call(data.image_uris, 'large')
    ) {
      newCard.image_large = data.image_uris.large
    }
    if (
      Object.prototype.hasOwnProperty.call(data, 'image_uris') &&
      Object.prototype.hasOwnProperty.call(data.image_uris, '.art_crop')
    ) {
      newCard.art_crop = data.image_uris.art_crop
    }
    if (
      Object.prototype.hasOwnProperty.call(data, 'image_uris') &&
      Object.prototype.hasOwnProperty.call(data, 'colors')
    ) {
      newCard.color_id = data.colors.join(',')
    }
    if (
      Object.prototype.hasOwnProperty.call(data, 'image_uris') &&
      Object.prototype.hasOwnProperty.call(data, 'keywords')
    ) {
      newCard.keywords = data.keywords.join(',')
    }
    chunk.push(newCard)
    if (counter === fileLines) {
      insertChunk()
    }
    newCard = {}
    counter++
  })
}

//it begins...
parseFile()

//for reference, the table schema
/* table.increments('id').primary()
    table.string('unique_id')
    table.string('oracle_id')
    table.string('name')
    table.string('uri')
    table.string('description')
    table.string('image_small')
    table.string('image_normal')
    table.string('image_large')
    table.string('art_crop')
    table.string('mana_cost')
    table.number('cmc')
    table.string('type_line')
    table.string('oracle_text')
    table.string('power')
    table.string('toughness')
    table.string('color_id')
    table.string('keywords')
    table.string('set_name')
    table.string('rarity')
    table.string('flavor_text')
    table.string('artist')
    table.number('edhrec_rank')
    table.string('price_usd') */
