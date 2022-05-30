// ### SOUND EFFECTS SETTINGS
let fbdelay;
// interactive pbr control
//let pbrcontrol = false;
//let grainfbdelay = false;

let graindelay_pbrate;
// sample file
let audioFile = "data/music/motive/TRAUM_Melodie.ogg";
// tone audio buffer can be assigner to gp.buffer
const sampleBuffer = new Tone.ToneAudioBuffer(audioFile, () => {
  // console.log('loaded');
});

let grainBufChannel = new Tone.Channel(1).toDestination();
// audio buffer to apply sound effects to
const audioBuffer = new Tone.ToneBufferSource(audioFile, () => {
  // console.log('loaded');
  grainBuffer.buffer = audioBuffer.buffer;
}).toDestination();

audioBuffer.loop = true;

audioBuffer.connect(grainBufChannel);

// buffer should loop during interaction

let audioBufTemp = sampleBuffer;
