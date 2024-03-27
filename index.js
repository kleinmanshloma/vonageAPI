const express = require("express");
const app = express();

app.use(bodyParser.json());

const bodyParser = require("body-parser");

const onInboundCall = (request, response) => {
  const ncco = [
    {
      action: "talk",
      text: "Please enter a digit",
    },
    {
      action: "input",
      type: ["dtmf"],
      eventUrl: [`${request.protocol}://${request.get("host")}/webhooks/dtmf`],
    },
  ];

  response.json(ncco);
};

const onInput = (request, response) => {
  const dtmf = request.body.dtmf;

  const ncco = [
    {
      action: "talk",
      text: `You pressed ${dtmf}`,
    },
  ];

  response.json(ncco);
};

app.get("/webhooks/answer", onInboundCall).post("/webhooks/dtmf", onInput);

app.post("/webhooks/events", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.listen(80, () => {
  console.log("Server is running on port 80");
});
