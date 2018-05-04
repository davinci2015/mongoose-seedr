# mongoose-seedr

_mongoose-seedr_ lets you seed your database with fake data that you provided. <br>
In case when you need to insert data into database that is linked to another data you can easily set references and it will automatically connect collections and populate database. This way, you don't have do manually create dummy data and link them together.

## Installation
```
$ npm install --save-dev mongoose-seedr
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

**users.json** <br>
```js
module.exports = [
    {
      firstName: "Terrence",
      lastName: "Hudnall",
      pets: [
        "ref:pets._id",
        "ref:pets._id"
      ]
    },
    {
      firstName: "Jordan",
      lastName: "Kelly",
      pets: [
        {
          "size": "ref:pets.size",
          "name": "ref:pets.name"
        }
      ]
    }
]
```
As we can see, `users.js` file holds list of users. An user have _pets_ array that have references to documents in another collection. <br>
In this case, we're using `ref:` followed by collection name and property that we want to get from another collection document. _mongoose-seedr_ will pick random document and pull out property that you've specified. <br>

**pets.js** <br>
```js
modules.exports = [
  {
    name: "Nacho",
    size: "small"
  },
  {
    name: "Pepper",
    size: "big"
  }
]
```

### Configuration
Configuration object that you pass into _seed_ method: <br>

| Prop name  | Description | Type | Default | Required |
| ---------- | ----------- | :--: | :-----: | :------: |
| `databaseURL` | url to database | `String` | - | `true`
| `seed` | array of seed objects | `Array` | - | `true`
| `seed[].documents` | File path to _JS_ file that contains fake documents | `String` | - | `true`
| `seed[].collection` | Name of collection that will be inserted into database | `String` | - | `true`
| `dropDatabase` | Should drop database before inserting fake data | `Boolean` | `true` | `false`
| `referenceKey` | Prefix key which you're using to link documents between collections | `String` | `"ref:"` | `false`

## Contributors

- Danijel Vincijanović (Author) [<danijel.vincijanovic@gmail.com>]
