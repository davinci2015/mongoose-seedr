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
const Seedr = require('mongoose-seedr');
const path = require('path')

new Seedr({
    dbUrl: 'mongodb://localhost:27017/seed-test',
    seed: [
        {
            documents: path.join(__dirname, 'users.json'),
            collection: 'users'
        },
        {
            documents: path.join(__dirname, 'pets.json'),
            collection: 'pets'
        }
    ]
});

```
Run script and _voila_, you seed your database.
```
$ node seedDatabase.js
```

### JSON - sample data
`users.json` and `pets.json` are _JSON_ files with fake data that will be inserted into database. <br>

**users.json** <br>
```json
[
    {
      "firstName": "Terrence",
      "lastName": "Hudnall",
      "pets": [
        "ref:pets._id",
        "ref:pets._id"
      ]
    },
    {
      "firstName": "Jordan",
      "lastName": "Kelly",
      "pets": [
        {
          "size": "ref:pets.size",
          "name": "ref:pets.name"
        }
      ]
    }
]
```
As we can see, `users.json` file holds list of users. User have _pets_ array that have references to documents in another collection. <br>
In this case we're using `ref:` followed by collection name and property that we want to get from another collection.

**pets.json** <br>
```json
[
  {
    "name": "Nacho",
    "size": "small"
  },
  {
    "name": "Pepper",
    "size": "big"
  }
]
```

### Configuration
Configuration object that you pass into _Seedr_ constructor: <br>

| Prop name  | Description | Type | Default | Required |
| ---------- | ----------- | :--: | :-----: | :------: |
| `dbUrl` | url to database | `String` | - | `true`
| `seed` | array of seed objects | `Array` | - | `true`
| `seed[].documents` | File path to _JSON_ file that contains fake documents | `String` | - | `true`
| `seed[].collection` | Name of collection that will be inserted into database | `String` | - | `true`
| `dropDatabase` | Should drop database before inserting fake data | `Boolean` | `true` | `false`
| `referenceKey` | String which you're using to link data | `String` | `"ref:"` | `false`

## Contributors

- Danijel Vincijanović (Author) [<danijel.vincijanovic@gmail.com>]
