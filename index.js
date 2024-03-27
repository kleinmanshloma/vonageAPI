const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

function mainMenu(req) {
  return [
    {
      action: "talk",
      voiceName: "Joanna",
      text: "Please enter a digit.",
    },
    {
      action: "input",
      submitOnHash: true,
      eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/events`],
      type: ["dtmf", "speech"],
      dtmf: {
        maxDigits: 1,
      },
    },
  ];
}

app.get("/webhooks/answer", (req, res) => {
  res.json(mainMenu(req));
});

app.post("/webhooks/events", (req, res) => {
  const event = req.body;
  console.log("Received event:", event);
  if (event.dtmf) {
    const digit = event.dtmf.digits;
    console.log("Received DTMF digit:", digit);
    // Handle DTMF input
  } else if (event.speech) {
    const text = event.speech.text;
    console.log("Received Speech input:", text);
    // Handle speech input
  }
  res.sendStatus(204);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
