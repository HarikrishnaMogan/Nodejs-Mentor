const db = require("../Shared/Mongo");
const {studentSchema} = require("../Shared/Schema");
const {ObjectId} = require("mongodb");

const service={
   
    //get students
    async getStudents(req,res)
    {
        try{
            let data = await db.students.find().toArray();
            res.send(data);
        }
        catch(err)
        {
            res.send("error");
        }
    },

    //create students
    async createStudents(req,res)
    {
        try{
               
            req.body.mentorId = "null";

            let {value,error} = studentSchema.validate(req.body);
            if(error)
            {
                return res.send({error:error.details[0].message});
            }
             
            let data = await db.students.insertOne(value);
            res.send(value);
             
        }
        catch(err)
        {
            res.send("error");
        }
    },


    //assign multiple students for a mentor
    async assignStudents(req,res)
    {
        try{

            //to convert id to object id
            for(let i=0;i<req.body.id.length;i++)
            {
                req.body.id[i] = ObjectId(req.body.id[i]);
            }
  
            let data = await db.students.updateMany({_id:{$in:req.body.id}},{$set:{mentorId:req.body.mentorId}});
            res.send(data);
            console.log(data);
        }
        catch(err)
        {
            res.send("error");
        }
    },
    
    //to change mentor for particular student
    async assignMentor(req,res)
    {
        try{
            
            let data = await db.students.updateOne({_id:ObjectId(req.body.id)},{$set:{mentorId:req.body.mentorId}});
            res.send(data);

        }
        catch(err)
        {
            res.send("error");
        }
    },

    //get students for particular mentor
    async studentsForMentor(req,res)
    {
        try{
            
             let data = await db.students.find({mentorId:req.params.id}).toArray();
             res.send(data);
        }
        catch(err)
        {
            res.send("error");
        }
    }
}
module.exports = service;