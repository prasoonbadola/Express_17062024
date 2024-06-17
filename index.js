import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let data = [];
let nextId = 1;

app.post("/data", (req, res) => {
  const { name, price } = req.body;
  const newData = { id: nextId++, name, price };
  data.push(newData);
  res.status(201).send(newData);
});

app.get("/listData", (req, res) => {
  res.status(200).send(data);
});

app.get("/listData/:id", (req, res) => {
  const { id } = req.params;
  const singalData = data.find((t) => t.id === parseInt(id));
  if (singalData) {
    res.status(200).send(singalData);
  } else {
    return res.status(404).send("Data not found");
  }
});

app.put("/Data/:id", (req, res) => {
  const { id } = req.params;
  const singalData = data.find((t) => t.id === parseInt(id));
  if (!singalData) {
    return res.status(404).send("Data not found");
  }

  const { name, price } = req.body;

  singalData.name = name;
  singalData.price = price;
  res.status(200).send(singalData);
});

app.delete("/data/:id", (req, res) => {
  const index = data.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("data not found");
  }

  data.splice(index, 1);
  res.status(200).send(data);
});

app.get("/", (req, res) => {
  res.send("Hellow World!");
});

app.listen(port, () => {
  console.log(`Server is up and running at PORT: ${port}...`);
});
