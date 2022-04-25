// MUSIC

let channelMusic = [];
let playerMusic = [];

let soundfiles = [
  "Theremin_Hauptstimme",
  "Theremin_Begleitung_Theremin_2",
  "Theremin_Begleitung_Theremin_3",
  "Theremin_Begleitung_Theremin_4",
];

soundfiles.map(function (url, i) {
  channelMusic[i] = new Tone.Channel(1).toDestination();
  channelMusic[i].mute = true;

  playerMusic[i] = new Tone.GrainPlayer({
    url: `data/music/${url}.wav`,
    loop: true,
  })
    .sync()
    .start(0);
  playerMusic[i].connect(channelMusic[i]);
});

// FOLEYS

let channelFoley = [];
let playerFoley = [];

let foleyfiles = ["rain", "water", "pigs", "steps"];

foleyfiles.map(function (url, i) {
  channelGain[i] = new Tone.Gain(-3.0).toDestination();
  channelFoley[i] = new Tone.Channel(1).toDestination();
  channelFoley[i].mute = true;

  playerFoley[i] = new Tone.Player({
    url: `data/music/${url}.wav`,
    loop: true,
  })
    .sync()
    .start(0);
  playerFoley[i].connect(channelFoley[i]).connect(channelGain[i]);
});
