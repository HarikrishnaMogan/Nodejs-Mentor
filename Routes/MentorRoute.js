const route = require("express").Router();
const service = require("../Services/MentorService");
route.post("/post",service.createMentors);
route.get("/", service.getMentors);

module.exports = route;