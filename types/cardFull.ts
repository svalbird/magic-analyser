/*TYPES FOR CARDS*/

/*Full card type - card properties are mandatory - used for passing in card data from scryfall jsons (will pass in empty strings on null data so provides error detection on json reading)*/

export interface cardFull {
  unique_id: string
  oracle_id: string
  name: string
  uri: string
  description: string
  image_small: string
  image_normal: string
  image_large: string
  art_crop: string
  mana_cost: string
  cmc: number
  type_line: string
  oracle_text: string
  power: string
  toughness: string
  color_id: string
  keywords: string
  set_name: string
  rarity: string
  flavor_text: string
  artist: string
  edhrec_rank: number
  price_usd: string
}

/*card typing will optional types - used for calls from client-side as some properties are optional on cards*/
export interface cardInDeck {
  unique_id: string
  oracle_id: string
  name: string
  uri: string
  description?: string
  image_small?: string
  image_normal?: string
  image_large?: string
  art_crop?: string
  mana_cost?: string
  cmc?: number
  type_line?: string
  oracle_text?: string
  power?: string
  toughness?: string
  color_id?: string
  keywords?: string
  set_name?: string
  rarity?: string
  flavor_text?: string
  artist?: string
  edhrec_rank?: number
  price_usd?: string
  quantity: number
  deckId: number
  lang: string
}

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
