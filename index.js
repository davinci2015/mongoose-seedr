/**
 * Created by Danijel Vincijanović on 10/09/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const mongoose = require('mongoose')
mongoose.Promise = Promise

class Seeder {
    constructor ({ dbUrl, seed, referenceKey = 'ref:', dropDatabase = true }) {
        this._referenceKey = referenceKey
        this._allData = this._loadJSONData(seed)
        this._connectDB(dbUrl)
            .then(() => console.log('Successfully connected to database'))
            .then(() => dropDatabase && this._dropDatabase())
            .then(() => this._seed())
            .catch((error) => console.log(error))
    }

    _loadJSONData (seed) {
        const map = new Map()
        seed.forEach(item => map.set(item.collection, require(item.documents)))
        return map
    }

    _connectDB (url) {
        return mongoose.connect(url, { useMongoClient: true })
    }

    _dropDatabase () {
        return mongoose.connection.db.dropDatabase()
    }

    _seed () {
        const db = mongoose.connection.db
        this._generateIds()
        this._checkReferences()
        this._allData.forEach((item, collectionName) => {
            db.collection(collectionName)
                .insertMany(item)
                .then(() => console.log(`Database collection ${collectionName} seeded!`))
                .catch(() => console.log(`Error while seeding ${collectionName}.`))
        })
    }

    _generateIds () {
        this._allData.forEach((item, collectionName) => {
            item.map(entry => entry._id = mongoose.Types.ObjectId())
            this._allData.set(collectionName, item)
        })
    }

    _checkReferences () {
        this._allData.forEach((item) => this._iterateObject(item))
    }

    _handleModelValue (value, obj, key) {
        if (typeof value === 'object') this._iterateObject(value)
        else if (typeof value === 'string' && this._isReference(value)) {
            const reference = value.replace(this._referenceKey, '')
            const [ collectionName, ...objAccess ] = reference.split('.')
            const collection = this._getCollection(collectionName)
            const randomDocument = this._getRandomDocumentFromCollection(collection)

            if (obj && key) {
                objAccess.forEach(accessKey => {
                    obj[key] = randomDocument[accessKey]
                })
            }
        }
    }

    _getRandomDocumentFromCollection (collection) {
        return collection[Math.floor(Math.random() * collection.length)]
    }

    _getCollection (collectionName) {
        return this._allData.get(collectionName)
    }

    _iterateObject (obj) {
        Object.keys(obj).forEach(key => this._handleModelValue(obj[key], obj, key))
    }

    _isReference (value) {
        return value.startsWith(this._referenceKey)
    }
}

module.exports = Seeder

