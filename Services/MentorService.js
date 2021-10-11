const db = require("../Shared/Mongo");
const {mentorSchema} = require("../Shared/Schema");

const service={


    //get mentors
    async getMentors(req,res)
    {
        try{
            let data =  await db.mentors.find().toArray();
           res.send(data);
        }
        catch(err)
        {
            res.send(err);
        }
       

    },

    //create mentors
    async createMentors(req,res)
    {
        try{
            let {value,error} = mentorSchema.validate(req.body);
            if(error)
            {
                return res.status(500).send({error:error.details[0].message})
            }
    
            let data = await db.mentors.insertOne(value);
            res.send(value);
        }
        catch(err)
        {
            res.send(err);
        }
     
    }
}
module.exports = service;