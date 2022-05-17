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

let filmmusik_melodie = "TRAUM_Melodie";
let filmmusik_begleitung = "TRAUM_Begleitung";

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

let starttimes = [0, 74, 142.5, 201.5, 245, 300]; // Startzeiten der einzelnen Video-Szenen/Motive in sec.
let starttimesSound = [0, 67, 125, 180, 218, 300];
let starttimesFoley = [50, 182, 262];

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

*/

let audioFileMel = "data/music/motive/TRAUM_Melodie.ogg";
let audioFileBegl = "data/music/motive/TRAUM_Begleitung.ogg";
// tone audio buffer can be assigner to gp.buffer
const sampleBufferMelody = new Tone.ToneAudioBuffer(audioFileMel, () => {
  console.log('loaded');
});
const sampleBufferBegl = new Tone.ToneAudioBuffer(audioFileBegl, () => {
  console.log('loaded');
});

let melCH = new Tone.Channel(1).toDestination();
melCH.mute = true;
let melPl = new Tone.GrainPlayer({
  url: `data/music/motive/${filmmusik_melodie}.ogg`,
  loop: true,
  playbackRate: 1,
  grainSize: 0.1
}).sync()
  .start(0);

melPl.connect(melCH);

let beglCH = new Tone.Channel(1).toDestination();
beglCH.mute = true;
let beglPl = new Tone.GrainPlayer({
  url: `data/music/motive/${filmmusik_begleitung}.ogg`,
  loop: true,
  playbackRate: 1,
  grainSize: 0.1
}).sync()
  .start(0);

beglPl.connect(beglCH);


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

//let foleyfiles = ["rain", "water", "pigs", "steps"];
let foleyfiles = ["TRAUM_Noise_trim", "rain", "pigs", "steps"];


wasserCH = new Tone.Channel(1).toDestination();
wasserCH.mute = true;

wasserPL = new Tone.Player({
  url: `data/music/foleys/${foleyfiles[0]}.ogg`,
  loop: true,
})
  .sync()
  .start(0);
wasserPL.connect(wasserCH);

rainCH = new Tone.Channel(1).toDestination();
rainCH.mute = true;

rainPL = new Tone.Player({
  url: `data/music/foleys/${foleyfiles[1]}.ogg`,
  loop: true,
  fadeIn: 1.0,
  fadeOut: 1.0
})
  .sync()
  .start(0);
rainPL.connect(rainCH);

pigsCH = new Tone.Channel(1).toDestination();
pigsCH.mute = true;

pigsPL = new Tone.Player({
  url: `data/music/foleys/${foleyfiles[2]}.ogg`,
  loop: true,
  fadeIn: 1.0,
  fadeOut: 1.0
})
  .sync()
  .start(0);
pigsPL.connect(pigsCH);


stepsCH = new Tone.Channel(1).toDestination();
stepsCH.mute = true;

stepsPL = new Tone.Player({
  url: `data/music/foleys/${foleyfiles[3]}.ogg`,
  loop: true,
  fadeIn: 1.0,
  fadeOut: 1.0
})
  .sync()
  .start(0);
stepsPL.connect(stepsCH);


let foleyChannels = [wasserCH,rainCH,pigsCH,stepsCH];

/*
foleyfiles.map(function (url, i) {
  channelFoley[i] = new Tone.Channel(1).toDestination();
  channelFoley[i].mute = true;

  playerFoley[i] = new Tone.Player({
    url: `data/music/foleys/${url}.ogg`,
    loop: true,
    fadeIn: 1.0;
    fadeOut: 1.0;
  })
    .sync()
    .start(starttimesFoley[i]);
  playerFoley[i].connect(channelFoley[i]);
});

*/


/*
Tone.Transport.scheduleRepeat(function(time){
  playerMusic[0].start(time);
  console.log("in repeat");
},300,0);
*/