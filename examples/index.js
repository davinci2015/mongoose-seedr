const path = require('path')
const seeder = require('mongoose-seedr')

seeder.seed({
    databaseURL: 'mongodb://localhost:27017/seed-test',
    seed: [
        {
            documents: path.join(__dirname, 'seed', 'users.js'),
            collection: 'users'
        },
        {
            documents: path.join(__dirname, 'seed', 'pets.js'),
            collection: 'pets'
        }
    ]
})