const neo4j = require('neo4j-driver')
const config = require('./config')

const driver = neo4j.driver(config.neo4j.url, neo4j.auth.basic(config.neo4j.username, config.neo4j.password))

module.exports = {
    read: async (cypher, params = {}, database = config.neo4j.database) => {
        const session = driver.session({
            defaultAccessMode: neo4j.session.READ,
            database,
        })

        try {
            const res = await session.run(cypher, params)
            session.close()
            return res
        } catch (e) {
            session.close()
            throw e
        }
    },
    write: async (cypher, params = {}, database = config.neo4j.database) => {
        const session = driver.session({
            defaultAccessMode: neo4j.session.WRITE,
            database,
        })

        try {
            const res = await session.run(cypher, params)
            session.close()
            return res
        } catch (e) {
            session.close()
            throw e
        }
    },
}