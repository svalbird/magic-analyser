# Magic Analyzer
![Magic Analyzer Screenshot](/images/gh2.png)

## Intro
This is a react.js/tailwind driven app that takes in a Magic: the Gathering deck and derives stats and information from those cards.
Decks are imported as .json files, and are compared with a pre-existing database of card information imported from [scryfall](scryfall.com).

## Tech involved
The web app is react.js driven, using tailwind for CSS styling. Tremor is used for graphing tools, and heroicons are used for icons throughout the app.
On the backend, the database system is driven by SQLite 3 and knex. API routing is done with react-router-dom.
The card info is imported from an ENORMOUS .json file from scryfall into the db. a script (transfer-cards.ts) is used (with JSONstream) to parse the giant json.

## How to run
Don't, because the JSON transfer script takes 20-30 minutes and involves parsing a 2 gb json file (and can easily crash).
But if you really wanted to:
 - clone the repository
 - use ```npm install``` to install dependencies
 - download the json file from scryfall [here](https://scryfall.com/docs/api/bulk-data) - save it in the repo directory
 - use ```knex seed:run``` and ```knex migrate:latest``` to set up databases
 - run tsconfig.json to import the json file into the database
 - use ```npm run dev``` to run the client on port 3000

## TO DO LIST
 - Move importing system to API-driven rather than JSON-driven (can use scryfall API)
 - Complete color analytics/land vs. non-land/mana curve with actual calculated data
 - Rename files to be less confusing (useFetchDecks vs. useFetchListDecks)
 - Tighten up typescript typing (clear any types/reduce ambiguity)
 - Figure out what to do with double-faced cards -_-
 - Move Deck type to separate type file (currently separately referenced per component - ew.)
 - Setup jest testing suite with api hooks/react component testing/db handler testing
