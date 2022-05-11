// MUSIC
let playerMeter = [];
let channelGain = [];
let channelMusic = [];
let playerMusic = [];
let playerMusicBegleitung = [];
let channelMusicBegleitung = [];
let channelGainBegleitung = [];

/*
let soundfiles = [
  "Theremin_Hauptstimme",
  "Theremin_Begleitung_Theremin_2",
  "Theremin_Begleitung_Theremin_3",
  "Theremin_Begleitung_Theremin_4",
];
*/

let soundfiles = [
  "TRAUM_T1_Melodie_w_oRev_trim",
  "TRAUM_T2_Melodie_w_oRev_trim",
  "TRAUM_T3_Melodie_w_oRev_trim",
  "TRAUM_T4_Melodie_w_oRev_trim",
  "TRAUM_T5_Melodie_w_oRev_trim",
];

let soundfiles_begleitung = [
  "TRAUM_T1_Begleitung_w_oRev_trim",
  "TRAUM_T2_Begleitung_w_oRev_trim",
  "TRAUM_T3_Begleitung_w_oRev",
  "TRAUM_T4_Begleitung_w_oRev_trim",
  "TRAUM_T5_Begleitung_w_oRev_trim", 
];

let starttimes = [0, 74, 142, 201.5, 245, 300]; // Startzeiten der einzelnen Video-Szenen/Motive in sec.


/*
const melodyBuf1 = new Tone.ToneAudioBuffer("data/music/motive/"+soundfiles[0]+".wav", () => {
  console.log('loaded');
});

const melod2Buf = new Tone.ToneAudioBuffer("data/music/"+soundfiles[1]+".wav", () => {
  console.log('loaded');
});
const melod3Buf = new Tone.ToneAudioBuffer("data/music/"+soundfiles[2]+".wav", () => {
  console.log('loaded');
});
const melod4Buf = new Tone.ToneAudioBuffer("data/music/"+soundfiles[3]+".wav", () => {
  console.log('loaded');
});
const melod5Buf = new Tone.ToneAudioBuffer("data/music/"+soundfiles[4]+".wav", () => {
  console.log('loaded');
});




let ch1 = new Tone.Channel(1).toDestination();
ch1.mute = true;
let pl1 = new Tone.Player();
pl1.buffer = melodyBuf1;
pl1.sync().start(0);

pl1.loop = true;
pl1.connect(ch1);

*/

soundfiles.map(function (url, i) {
  playerMeter[i] = new Tone.Meter();
  //channelGain[i] = new Tone.Gain(0).toDestination();
  channelMusic[i] = new Tone.Channel(1).toDestination();
  channelMusic[i].mute = true;

  playerMusic[i] = new Tone.Player({
    url: `data/music/motive/${url}.ogg`,
    loop: true,
  })
    .sync()
    .start(0);
    
  playerMusic[i].connect(channelMusic[i]).connect(playerMeter[i]);
  //playerMusic[i].connect(playerMeter[i]);
});


soundfiles_begleitung.map(function (url, i) {
  //channelGainBegleitung[i] = new Tone.Gain(0).toDestination();
  channelMusicBegleitung[i] = new Tone.Channel(1).toDestination();
  channelMusicBegleitung[i].mute = true;

  playerMusicBegleitung[i] = new Tone.Player({
    url: `data/music/motive/${url}.ogg`,
    loop: true,
  })
    .sync()
    .start(0);
  playerMusicBegleitung[i].connect(channelMusicBegleitung[i]);
});

// FOLEYS

let channelFoley = [];
let playerFoley = [];

let foleyfiles = ["rain", "water", "pigs", "steps"];

foleyfiles.map(function (url, i) {
  channelFoley[i] = new Tone.Channel(1).toDestination();
  channelFoley[i].mute = true;

  playerFoley[i] = new Tone.Player({
    url: `data/music/${url}.wav`,
    loop: true,
  })
    .sync()
    .start(0);
  playerFoley[i].connect(channelFoley[i]);
});




