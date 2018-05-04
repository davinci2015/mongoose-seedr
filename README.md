# mongoose-seedr

_mongoose-seedr_ lets you seed your database with fake data. <br>
In case when you need to insert data into a database that is linked to another data you can easily set references and it will automatically connect collections and populate database. This way, we don't have to manually link them together.

## Installation
```
$ npm install mongoose-seedr --save-dev
```

## Usage example

```js
// seedDatabase.js
const seedr = require('mongoose-seedr');
const path = require('path');

seedr.seed({
    databaseURL: 'mongodb://localhost:27017/seed-test',
    seed: [
        {
            documents: path.join(__dirname, 'users.js'),
            collection: 'users'
        },
        {
            documents: path.join(__dirname, 'pets.js'),
            collection: 'pets'
        }
    ]
});

```
Run script and _voila_, you seeded your database.
```
$ node seedDatabase.js
```

### Fake data example
`users.js` and `pets.js` are _JS_ files with fake data that will be inserted into database. <br>

**users.js** <br>
```js
module.exports = [
    {
        firstName: 'Terrence',
        lastName: 'Hudnall',
        pets: [
            'ref:pets._id',
            'ref:pets._id'
        ]
    },
    {
        firstName: 'Jordan',
        lastName: 'Kelly',
        pets: [
            {
                size: 'ref:pets.size',
                name: 'ref:pets.name'
            }
        ]
    }
]
```

**pets.js** <br>
```js
module.exports = [
    {
        name: 'Nacho',
        size: 'small'
    },
    {
        name: 'Pepper',
        size: 'big'
    }
]
```

As we can see in the previous example, `users.js` file holds the list of users. An user have _pets_ array that have references to documents in _pets_ collection. <br>
In this case, we're using `ref:` followed by collection name and property that we want to get from document in another collection. _mongoose-seedr_ will pick random document from that collection and pull out property that you've specified. <br>

### Configuration
Configuration object that you pass into the _seed_ method: <br>

| Prop name  | Description | Type | Default | Required |
| ---------- | ----------- | :--: | :-----: | :------: |
| `databaseURL` | url to database | `String` | - | `true`
| `seed` | array of seed objects | `Array` | - | `true`
| `seed[].documents` | File path to the _JS_ file that contains fake documents | `String` | - | `true`
| `seed[].collection` | Name of a collection that will be inserted into a database | `String` | - | `true`
| `dropDatabase` | Defines if script should drop a database before inserting a fake data | `Boolean` | `true` | `false`
| `referenceKey` | Prefix key which you're using to link documents between collections | `String` | `"ref:"` | `false`

## Contributors

- Danijel Vincijanović (Author) [<danijel.vincijanovic@gmail.com>]
