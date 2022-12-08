const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://josh1507:password0015@telegraph.6ipsoor.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const testData = {
    title: "Trees are cool",
    author: "Treeman",
    body: "I like trees, don't cut them down!"
}

module.exports = class Post{
    constructor(data){
        this.title = data.title;
        this.author = data.author;
        this.body = data.body;
    }

    static findByTitle(title){
        return new Promise(async (resolve, reject) => {
            try{
                await client.connect();
                const searchFor = title.replaceAll("%20", " ");
                console.log(searchFor)
                const result = await client.db("telegraph-db").collection("posts").findOne({title: searchFor})
                console.log(result);

                const foundPost = new Post(result);
                console.log(foundPost)
                resolve(foundPost);
            } catch(err){
                reject("Post could not be found");
            } finally{
                await client.close();
            }
        })
    }

    static create(postData){
        return new Promise(async (resolve, reject) =>{
            try{
                await client.connect();
                const {title, author, body} = postData
                const dataInput = new Post(title, author, body)

                const result = await client.db("telegraph-db").collection("posts").insertOne(dataInput)
                const newPost = new Post(result);
                console.log(newPost)
                resolve(newPost);
            } catch(err){
                reject("Post could not be created")
            }
            finally{
                await client.close()
            }
        })
    }
}
