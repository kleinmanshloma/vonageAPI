const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/webhooks/answer", (req, res) => {
  const ncco = [
    {
      action: "talk",
      text: "Please leave a message after the beep, For Nuchem Friezel, then press # when you are done.",
      bargeIn: true,
    },
    {
      action: "input",
      maxDigits: 1,
      eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/dtmf`],
    },
  ];

  res.json(ncco);
});

app.post("/webhooks/events", (req, res) => {
  console.log(req.body.from_user);
  res.status(200).end();
});

app.post("/webhooks/dtmf", (req, res) => {
  console.log("yup", req.body);
  const dtmf = req.body.dtmf;
  const ncco = [];

  if (dtmf === "1") {
    ncco.push({
      action: "talk",
      text: `You have pressed ${req.body.dtmf},Thank you for your order. Goodbye.`,
    });
  } else {
    ncco.push({
      action: "talk",
      text: "Sorry, I did not understand your response. Goodbye.",
    });
  }

  res.json(ncco);
});

app.listen(80, () => {
  console.log("Server is running on port 80");
});
