import express from "express";

const PORT = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Munger handball project has started");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
