const route = require("express").Router();
const service = require("../Services/StudentService");
route.get("/",service.getStudents);
route.post("/post",service.createStudents);
route.put("/multi",service.assignStudents);
route.put("/one",service.assignMentor);
route.get("/:id",service.studentsForMentor);

module.exports = route;