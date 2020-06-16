const { MongoClient } = require('mongodb');
const database = require('./db-properties.json');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function testDBConnect(){
    const client = new MongoClient(database.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try{
        await client.connect();
        await listDatabases(client);
    }
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
}

module.exports = {testDBConnect}