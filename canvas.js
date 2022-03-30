let vidSize;

let frequency;
let synthVolume;

let thereminMusic;

let noteDuration = 0.5;

let synth = new Tone.DuoSynth({
  harmonicity: 0.4,
  vibratoAmount: 0.05,
  voice0: {
    oscillator: {
      type: "sine",
    },
  },
  voice1: {
    oscillator: {
      type: "sine",
    },
  },
}).toDestination();

const sampler = new Tone.Sampler({
  urls: {
    C4: "data/music/sine-wave-c4.wav",
    "G#4": "data/music/sine-wave-e4.wav",
    E4: "data/music/sine-wave-gs4.wav",
  },
  release: 1,
  // baseUrl: 'https://tonejs.github.io/audio/salamander/',
}).toDestination();

const reverb = new Tone.Reverb().toDestination();

let detuneMaxValue = 100;
let playbackrate = 1;

gp = new Tone.GrainPlayer("grainsynth/samples/audio/SH-el.mp3", function () {
  gp.grainSize = 0.01;
  gp.overlap = 0.02;
  gp.loop = true;
}).toDestination();

let playing = false;

let grainPlaying = false;

function preload() {
  // thereminMusic = loadSound('data/music/Theremin_Begleitung_Theremin_2-5.wav');
}

function setup() {
  sketchWidth = document.getElementById("canvas").offsetWidth;
  sketchHeight = document.getElementById("canvas").offsetHeight;
  canvas = createCanvas(sketchWidth, sketchHeight);
  canvas.parent("canvas");
  canvas.position(0, 0);

  vidSize = windowWidth * 0.75;
  // farmerVid = createVideo(['data/video/farmersspring25fpsFHD.mp4'], vidLoad);
  // farmerVid.hide();

  face_layer = createGraphics(canvas.width, canvas.height);
  brush_layer = createGraphics(canvas.width, canvas.height);

  poseNetSetup();
}

function draw() {
  canvas.clear();
  face_layer.clear();

  // background(253, 0, 0);

  // draw video
  // image(farmerVid, width / 2 - vidSize / 2, windowHeight * 0.05);

  // map hand movement to synth and draw keypoints
  if (poses.length > 0) {
    let handR = poses[0].pose.rightWrist;
    let handL = poses[0].pose.leftWrist;
    let nose = poses[0].pose.nose;
    let d = 30;

    if (typeof handR.x !== "undefined") {
      brush_layer.clear();
      brush_layer.fill(215, 123, 103, 100);
      brush_layer.noStroke();

      // size of hand ellipse based on distance between hands
      if (handR.confidence > 0.05 && handL.confidence > 0.05) {
        d = int(dist(handR.x, handR.y, handL.x, handL.y));
      }

      // draw hands
      if (handR.confidence > 0.2) {
        rightHandX = map(handR.x, 0, 640, 0, width);
        rightHandY = map(handR.y, 0, 360, 0, height);

        leftHandX = map(handL.x, 0, 640, 0, width);
        leftHandY = map(handL.y, 0, 360, 0, height);

        brush_layer.ellipse(rightHandX, rightHandY, d / 10);
        brush_layer.ellipse(leftHandX, leftHandY, d / 10);
      }

      // draw face
      if (nose.confidence > 0.8) {
        noseX = map(nose.x, 0, 640, 0, width);
        noseY = map(nose.y, 0, 360, 0, height);

        face_layer.noFill();
        face_layer.stroke(215, 123, 103);

        face_layer.beginShape();
        for (let a = 0; a < TWO_PI; a += 0.02) {
          let xoff = map(cos(a), -1, 1, 0, 2);
          let yoff = map(sin(a), -1, 1, 0, 2);
          const r = map(noise(xoff, yoff, 0), 0, 1, 55, 65);
          let x = r * cos(a);
          let y = r * sin(a);
          vertex(x + noseX, y + noseY);
        }
        face_layer.endShape(CLOSE);

        face_layer.arc(
          noseX,
          noseY + 15,
          40,
          40,
          QUARTER_PI,
          HALF_PI + QUARTER_PI
        );

        face_layer.noStroke();
        face_layer.fill(215, 123, 103);
        face_layer.ellipse(noseX - 13, noseY - 10, 3);
        face_layer.ellipse(noseX + 13, noseY - 10, 3);
      }

      // play Theremin sound
      if (playing) {
        // trigger synth
        // synth.triggerAttackRelease('A3', '0.1');

        // Update oscillator frequency
        frequency = map(handR.x, 0, 640, 880, 220);
        synth.setNote(frequency);

        // Update oscillator volume
        synthVolume = map(handL.y, 0, 360, 0, -24);
        // synth.volume.value = synthVolume;

        sampler.volume.value = synthVolume;
      }

      if (grainPlaying) {
        //left hand height controls playbackrate, maximum playbackrate set in GUI
        const currPbr = map(handL.y, 0, video.height, 0.001, playbackrate); // values below 0.001 break the grain player
        if (currPbr < 0.001) {
          gp.playbackRate = 0.001;
        } else {
          gp.playbackRate = currPbr;
        }
        // right hand x position controls amount of detuning. detune maximum set in GUI
        const currDetune = map(
          handR.x,
          0,
          video.width,
          -detuneMaxValue,
          detuneMaxValue
        );
        gp.detune = currDetune;
      }
    }
  }

  // draw layers
  image(face_layer, 0, 0);
  image(brush_layer, 0, 0);
}

setInterval(function () {
  if (frequency > 494 && frequency < 523) {
    sampler.triggerAttackRelease("B4", noteDuration);
  } else if (frequency > 466 && frequency < 494) {
    sampler.triggerAttackRelease("A#4", noteDuration);
  } else if (frequency > 440 && frequency < 466) {
    sampler.triggerAttackRelease("A4", noteDuration);
  } else if (frequency > 415 && frequency < 440) {
    sampler.triggerAttackRelease("G#4", 0.1);
  } else if (frequency > 392 && frequency < 415) {
    sampler.triggerAttackRelease("G4", noteDuration);
  } else if (frequency > 370 && frequency < 392) {
    sampler.triggerAttackRelease("F#4", 0.1);
  } else if (frequency > 349 && frequency < 370) {
    sampler.triggerAttackRelease("F4", noteDuration);
  } else if (frequency > 329 && frequency < 349) {
    sampler.triggerAttackRelease("E4", noteDuration);
  } else if (frequency > 311 && frequency < 329) {
    sampler.triggerAttackRelease("D#4", noteDuration);
  } else if (frequency > 294 && frequency < 311) {
    sampler.triggerAttackRelease("D4", noteDuration);
  } else if (frequency > 277 && frequency < 294) {
    sampler.triggerAttackRelease("C#4", noteDuration);
  } else if (frequency > 262 && frequency < 277) {
    sampler.triggerAttackRelease("C4", noteDuration);
  }
}, 150);

// werden alle nicht verwendet aktuell
function drawFace() {
  hands_layer.translate(nose.x, nose.y);

  if (nose.confidence > 0.5) {
    hands_layer.noFill();
    hands_layer.stroke(215, 123, 103);

    hands_layer.beginShape();
    for (let a = 0; a < TWO_PI; a += 0.02) {
      let xoff = map(cos(a), -1, 1, 0, 2);
      let yoff = map(sin(a), -1, 1, 0, 2);
      const r = map(noise(xoff, yoff, 0), 0, 1, 32, 40);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    hands_layer.endShape(CLOSE);
    hands_layer.ellipse(nose.x, nose.y, 100, 100);
  }
}

function vidLoad() {
  farmerVid.loop();
  farmerVid.volume(0);
  farmerVid.size(vidSize);
}

/*
function initAudio() {
    //create audio context for all theremin voices
    ctx = new (AudioContext || webkitAudioContext)();
    ctx.suspend();
    var contour = ctx.createGain();

    // initialize audio context for grainsynth
    init(ctx);
    grainSample = 0; // 0 = synthetic sound, 2 = guitar sound, 3 = piano with echo sound
    bufferSwitch(grainSample);
    grainPlaying = false;

    // initialize default theremin sound
    oscillator = null;
    gainNode = ctx.createGain();
    gainNode.gain.value = 0.5;
    var soundPlaying = false;
}
*/
// pose recorder with timeline - can be saved to json file
// https://github.com/osteele/p5pose-recorder
// https://osteele.github.io/p5pose-recorder/

// https://creative-coding.decontextualize.com/video/
// https://blog.addpipe.com/10-advanced-features-in-html5-video-player/#startorstopthevideoatacertainpointortimestamp
