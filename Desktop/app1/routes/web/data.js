const fs = require('fs')

class DataStore {

    constructor(filename) {

        if (!filename) {
            throw new Error(
                'Filename is required to create a datastore!')
        }

        this.filename = filename

        try {
            fs.accessSync(this.filename)
        } catch (err) {

            fs.writeFileSync(this.filename, '[]')
        }
    }
    async find(email) {

        const jsonRecords = await
        fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        })

        const objRecord = JSON.parse(jsonRecords)


        const requiredRecord =
            objRecord.find(record => record.email === email)
        return requiredRecord;
    }

    async addNew(attributes) {

        const jsonRecords = await
        fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        })


        const objRecord = JSON.parse(jsonRecords)

        objRecord.push(attributes)

        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(objRecord, null, 2)
        )

        return attributes;
    }

}

module.exports = new DataStore('datastore.json')