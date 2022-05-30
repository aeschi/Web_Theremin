let activeSources;

Tone.FeedbackDelay.wet = 0.7;

// params: delay(spacing of delayed sound segments), feedback (amount/strength of feedback or segment)
const feedbackDelay = new Tone.FeedbackDelay(0.1, 0.2).toDestination();
const feedbackDelay2 = new Tone.FeedbackDelay(0.15, 0.4).toDestination();
const feedbackDelay3 = new Tone.FeedbackDelay(0.2, 0.2).toDestination();
const feedbackDelay4 = new Tone.FeedbackDelay(0.25, 0.4).toDestination();
const feedbackDelay5 = new Tone.FeedbackDelay(0.3, 0.2).toDestination();
const feedbackDelay6 = new Tone.FeedbackDelay(0.35, 0.3).toDestination();
const feedbackDelay7 = new Tone.FeedbackDelay(0.4, 0.4).toDestination();
const feedbackDelay8 = new Tone.FeedbackDelay(0.45, 0.45).toDestination();
const feedbackDelay9 = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const feedbackDelay10 = new Tone.FeedbackDelay(0.55, 0.55).toDestination();
const feedbackDelay11 = new Tone.FeedbackDelay(0.6, 0.6).toDestination();

const fbdel1 = new Tone.FeedbackDelay(0.4, 0.7).toDestination();
const fbdel2 = new Tone.FeedbackDelay(0.1, 0.2).toDestination();
// delay expressed in musical notation
/*
const fbd1 = new Tone.FeedbackDelay("16n", 0.2).toDestination();
const fbd2 = new Tone.FeedbackDelay("8n", 0.4).toDestination();

const fbd3 = new Tone.FeedbackDelay("2n", 0.5).toDestination();
*/
const fbdA = new Tone.FeedbackDelay("16n", 0.5).toDestination();
const fbdB = new Tone.FeedbackDelay("32n", 0.8).toDestination();
const fbdC = new Tone.FeedbackDelay("64n", 0.9).toDestination();

//const grainBufGain = new Tone.Gain(1.0).toDestination();

const grainBuffer = new Tone.ToneBufferSource().toDestination();

grainSize = 0.08; // clock geschwindigkeit einfluss
playbackRate = 0.1; // the grain is scheduled every x seconds
overlap = 0.5; // wie verbunden die grains klingen
detune = 100;

const clock1 = new Tone.Clock(clockCallback, 1 / grainSize);
//const clock2 = new Tone.Clock(clockCallback, 1 / (grainSize*0.5));

function clockCallback(time) {
  //  console.log("time " + time);
  const ticks = clock1.getTicksAtTime(time);
  //  console.log("ticks " + ticks);
  const offset = ticks * grainSize;
  //  console.log("offset " + offset);

  const grainBuf = new Tone.ToneBufferSource(audioBuffer.buffer, (onload) => {
    // console.log("loaded audio buffer");
  }).toDestination();

  //grainBuf.connect(grainBufGain).toDestination();

  grainBuf.loop = true;

  if (fbdelay != null) {
    //  console.log("apply fbdelay");
    grainBuf.connect(fbdelay).toDestination();
  }

  if (myp5.pbrcontrol) {
    grainBuf.playbackRate.value = graindelay_pbrate;
  } else {
    const interval = detune / 100;
    //intervaltofrequencyratio function from tone js
    grainBuf.playbackRate.value = Math.pow(2, interval / 12);
  }

  /*
  if(grainBufVolume =! null){
  grainBufGain.gain.value = grainBufVolume;
  }
*/
  grainBuf.fadeIn = overlap; //0.5
  grainBuf.fadeOut = overlap; // 0.5
  //  console.log(" grain start at " + time + " from " + offset);
  grainBuf.start(time, offset);
  //  console.log(" grain stop at " + time + " " + grainSize / playbackRate);
  grainBuf.stop(time + grainSize / playbackRate);
  //grainBuf.stop(time + attack + decay +1 );

  grainBuf.onended = () => {
    grainBuf.disconnect();
    grainBuf.buffer.dispose();
  };
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
