const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const onInboundCall = (req, res) => {
  const ncco = [
    {
      action: "talk",
      text: "Please press 1 to hear the current date and time, or press 2 to listen to a song.",
    },
    {
      action: "input",
      eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/dtmf`],
    },
  ];
  return ncco;
};

const onInput = (req, res) => {
  const dtmf = request.body.dtmf;
  let actions = [];
  let ncco = [];
  switch (req.body.dtmf.digits) {
    case "1":
      actions.push({
        action: "talk",
        text: `It is ${new Intl.DateTimeFormat(undefined, {
          dateStyle: "full",
          timeStyle: "long",
        }).format(Date.now())}`,
      });
      break;
    case "2":
      actions.push({
        action: "stream",
        streamUrl: [
          "https://nexmo-community.github.io/ncco-examples/assets/voice_api_audio_streaming.mp3",
        ],
      });
  }
  ncco = actions.concat(mainMenu(req));

  console.log(ncco);

  res.json(ncco);
};

app.get("/webhooks/answer", onInboundCall).post("/webhooks/dtmf", onInput);

app.post("/webhooks/events", (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
