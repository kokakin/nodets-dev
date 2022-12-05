import express from "express";


const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" });
});

app.listen(6969, () => console.log("service is running!"))