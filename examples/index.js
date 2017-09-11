const path = require('path')
const Seeder = require('../index')

new Seeder({
    dbUrl: 'mongodb://localhost:27017/seed-test',
    seed: [
        {
            documents: path.join(__dirname, 'seed', 'users.json'),
            collection: 'users'
        },
        {
            documents: path.join(__dirname, 'seed', 'pets.json'),
            collection: 'pets'
        }
    ]
})