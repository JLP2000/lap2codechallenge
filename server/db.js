const {MongoClient} = require("mongodb");


async function main() {
    const uri = "mongodb+srv://josh1507:password0015@telegraph.6ipsoor.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);

        await create(client, {
            name: "lovely loft",
            summary: "summary",
            bedrooms: 1,
            bathrooms: 1
        })
    }
    catch(err){
        console.error(err)
    }
    finally{
        await client.close();
    }

}


main().catch(console.error);

async function create(client, newData) {
    const result = await client.db("sample_weatherdata").collection("data").insertOne(newData);
    
    console.log(`new listing has id of ${result.insertedId}`);
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
