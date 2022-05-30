let activeSources;

Tone.FeedbackDelay.wet = 0.7;

// params: delay(spacing of delayed sound segments), feedback (amount/strength of feedback or segment)
const feedbackDelay = new Tone.FeedbackDelay(0.1, 0.2).toDestination();

const grainBuffer = new Tone.ToneBufferSource().toDestination();

grainSize = 0.08; // clock geschwindigkeit einfluss
playbackRate = 0.1; // the grain is scheduled every x seconds
overlap = 0.5; // wie verbunden die grains klingen
detune = 500;

const clock1 = new Tone.Clock(clockCallback, 1 / grainSize);
//const clock2 = new Tone.Clock(clockCallback, 1 / (grainSize*0.5));

/*
 * in analogy to grain player from tone js library
 */
function clockCallback(time) {
  // console.log("time " + time);
  const ticks = clock1.getTicksAtTime(time); // how many ticks passed since clock start, at this point in time
  //  console.log("ticks " + ticks);
  const offset = ticks * grainSize; // where in the audio file am I in terms of ticks
  //  console.log("offset " + offset);

  const grainBuf = new Tone.ToneBufferSource(audioBuffer.buffer, (onload) => {
    // console.log("loaded audio buffer");
  }).toDestination();

  grainBuf.loop = true;

  if (fbdelay == 2) {
    grainBuf
      .connect(feedbackDelay11)
      .connect(feedbackDelay6)
      .connect(fbdel1)
      .toDestination();
  } else if (fbdelay == 1) {
    //  grainBuf.connect(feedbackDelay9).connect(fbd2).connect(fbd3).toDestination();
    grainBuf.connect(fbdC).connect(fbdB).connect(fbdA).toDestination();
  } else if (fbdelay != null) {
    grainBuf.connect(fbdelay).toDestination();
  }

  const interval = detune / 100;
  //intervaltofrequencyratio function from tone js
  grainBuf.playbackRate.value = Math.pow(2, interval / 12);

  grainBuf.fadeIn = overlap; //0.5
  grainBuf.fadeOut = overlap; // 0.5
  //  console.log(" grain start at " + time + " from " + offset);
  grainBuf.start(time, offset);
  //  console.log(" grain stop at " + time + " " + grainSize / playbackRate);
  grainBuf.stop(time + grainSize / playbackRate);
  //grainBuf.stop(time + attack + decay +1 );

  grainBuf.onended = () => {
    grainBuf.buffer.dispose();
  };
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
