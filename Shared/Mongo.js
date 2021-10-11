
const {MongoClient} = require("mongodb");

const client = new MongoClient(process.env.URL);

const mongo ={

    db:null,
    students:null,
    mentors:null,

    async connect()
    {
        await client.connect();

        this.db = client.db(process.env.DATABASE);
        this.students = this.db.collection("students");
        this.mentors = this.db.collection("mentors");
        console.log("connected to Mongodb");
        
    }
}

module.exports = mongo;