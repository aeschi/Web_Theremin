
let soundeffektefilesM = [
    "TRAUM_Meldodie_GitFX",
    "TRAUM_Meldodie_odrive_FX",
    "TRAUM_Meldodie_xt_FX"
]

let soundeffektefileP = [
    "TRAUM_Begleitung_GitFX"
]

let channelSoundEffektM = [];
let playerSoundEffektM = [];


soundeffektefilesM.map(function (url, i) {
    //channelGain[i] = new Tone.Gain(0).toDestination();
    channelSoundEffektM[i] = new Tone.Channel(1).toDestination();
    channelSoundEffektM[i].mute = true;
  
    playerSoundEffektM[i] = new Tone.GrainPlayer({
      url: `data/music/soundeffekte/${url}.ogg`,
      loop: true,  
      playbackRate: 1.0,
      grainSize: 0.1
    })
      .sync()
      .start(0);
      
    playerSoundEffektM[i].connect(channelSoundEffektM[i]);
  });


  let beglCH_SE = new Tone.Channel(1).toDestination();
  beglCH_SE.mute = true;
  let beglPl_SE = new Tone.GrainPlayer({
    url: `data/music/soundeffekte/${soundeffektefileP}.ogg`,
    loop: true,
    playbackRate: 1,
    grainSize: 0.1
  }).sync()
    .start(0);
  
  beglPl_SE.connect(beglCH_SE);