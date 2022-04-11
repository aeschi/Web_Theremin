let vidSize;

let frequency;
let synthVolume;

let thereminMusic;

// suspend sound on page upon loading page
Tone.getContext().rawContext.suspend();

Tone.Transport.bpm.value = 108;
//Tone.Transport.loop = true;

// warum is das immer running, obwohl der sound nicht spielt und der context aus ist ???
// console.log("Tone Context " + Tone.getContext().rawContext.state);

// ### TONE SYNTH

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

// ### TONE SAMPLER
const env = new Tone.AmplitudeEnvelope().toDestination();

let lastNote = 0;
let note = 0;

const sampler = new Tone.Sampler({
  urls: {
    C4: "data/music/c4.mp3",
    "G#4": "data/music/g-4.mp3",
    E4: "data/music/e4.mp3",
  },
  release: 0.5,
  // baseUrl: 'https://tonejs.github.io/audio/salamander/',
}).toDestination();

// ### GRAIN PLAYER ###

let detuneMaxValue = 100;
let playbackrate = 1;
let grainSize = 0.1;

gp = new Tone.GrainPlayer("data/samples/audio/SH-el.mp3", function () {
  gp.grainSize = 0.01;
  gp.overlap = 0.02;
  gp.loop = true;
  gp.playbackRate = 0.1;
}).toDestination();

let playing = false;
let therSampler = false;
let grainPlaying = false;

let masterVol = 1;

const masterVolume = new Tone.Volume(masterVol);
const masterCompressor = new Tone.Compressor({
  ratio: 12,
  threshold: -28,
  release: 0.25,
  attack: 0.003,
  knee: 30,
});
const masterAnalyser = new Tone.Analyser("waveform", 64);

const gain1 = new Tone.Gain(0.1);
const gain2 = new Tone.Gain(0.1);

//todo
//vibrato.frequency.value = "y value" * 10;

Tone.Destination.chain(masterCompressor, masterVolume, masterAnalyser);

function preload() {
  // thereminMusic = loadSound('data/music/Theremin_Begleitung_Theremin_2-5.wav');
}

// ### p5 ####################

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

        brush_layer.ellipse(rightHandX, rightHandY, d / 5);
        brush_layer.ellipse(leftHandX, leftHandY, d / 5);
      }

      // draw face
      if (nose.confidence > 0.8) {
        noseX = map(nose.x, 0, 640, 0, width);
        noseY = map(nose.y, 0, 360, 0, height);

        face_layer.noFill();
        face_layer.stroke(215, 123, 103, 100);
        face_layer.strokeWeight(3);
        face_layer.ellipse(noseX, noseY + 50, 120);

        // face_layer.beginShape();
        // for (let a = 0; a < TWO_PI; a += 0.02) {
        //   let xoff = map(cos(a), -1, 1, 0, 2);
        //   let yoff = map(sin(a), -1, 1, 0, 2);
        //   const r = map(noise(xoff, yoff, 0), 0, 1, 55, 65);
        //   let x = r * cos(a);
        //   let y = r * sin(a);
        //   vertex(x + noseX, y + noseY);
        // }
        // face_layer.endShape(CLOSE);

        // face_layer.arc(
        //   noseX,
        //   noseY + 15,
        //   40,
        //   40,
        //   QUARTER_PI,
        //   HALF_PI + QUARTER_PI
        // );

        face_layer.noStroke();
        face_layer.fill(215, 123, 103, 100);
        face_layer.ellipse(noseX - 13, noseY + 40, 3, 6);
        face_layer.ellipse(noseX + 13, noseY + 40, 3, 6);
      }

      if (nose.confidence > 0.8) {
        // noseX = map(nose.x, 0, 640, 0, width);
        // noseY = map(nose.y, 0, 360, 0, height);

        for (let i = 0; i < poses.length; i++) {
          let skeleton = poses[i].skeleton;
          // For every skeleton, loop through all body connections
          for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(215, 123, 103, 100);
            strokeWeight(3);
            line(
              map(partA.position.x, 0, 640, 0, width),
              map(partA.position.y, 0, 360, 0, height),
              map(partB.position.x, 0, 640, 0, width),
              map(partB.position.y, 0, 360, 0, height)
            );
          }
        }
      }

      // play Theremin sound
      if (playing) {
        // trigger synth
        // synth.triggerAttackRelease('A3', '0.1');

        // Update oscillator frequency
        frequency = map(handR.x, 0, 640, 880, 220);
        synth.setNote(frequency);
        // trigger synth
        synth.triggerAttackRelease(frequency, "0.1");

        // Update oscillator volume
        synthVolume = map(handL.y, 0, 360, 0, -24);
        // synth.volume.value = synthVolume;

        //sampler.volume.value = synthVolume;
      }

      if (therSampler) {
        frequency = map(handR.x, 0, 640, 880, 220);

        let noteDuration = 0.5;

        // ok, vielleicht kann man hier probieren ein längeres sauberes theremin sample zu bekommen, und dann
        // mit asynchroner granular synthese etwas zu machen? dann klingt das ähnlich vom timbre des samples
        // ist aber verbundener, und eher wie ein flächiger theremin sound

        // hier envelopes hinzufügen, und die länge der Noten regeln
        toNote(frequency);
        console.log("cur note " + note);
        if (lastNote != 0) {
          if (note != lastNote) {
            sampler.triggerRelease(lastNote, Tone.now());
            sampler.triggerAttack(note, Tone.now());
            lastNote = note;
          }
          //else if same as before continue playin note??
        } else if (lastNote == 0) {
          sampler.triggerAttack(note, Tone.now());
          lastNote = note;
        }
      }

      // if (grainPlaying) {
      //left hand height controls playbackrate, maximum playbackrate set in GUI
      const currPbr = map(handL.y, 0, video.height, 0.001, playbackrate); // values below 0.001 break the grain player
      // console.log("handl y "+handL.y);
      //console.log("gp pbr "+playbackrate);
      // console.log("curr pbr "+currPbr);

      const currGS = map(handR.x, video.width, 0, grainSize, 0);
      gp.grainSize = currGS;
      // PARAMS.grainSize = currGS;
      // console.log("grainsize " + currGS);

      if (currPbr < 0.001) {
        // console.log('handL.y', handL.y, ' playback rate ', playbackrate, ' curr pbr ', currPbr);
        gp.playbackRate = 0.001;
        //  PARAMS.playbackrate = 0.001; // für das gui monitoring
      } else {
        gp.playbackRate = currPbr;
        //  PARAMS.playbackrate = currPbr; // gui monitoring
      }

      // right hand x position controls amount of detuning. detune maximum set in GUI
      const currDetune = map(
        handR.x, // handR.y
        0,
        video.width,
        -detuneMaxValue,
        detuneMaxValue
      );
      gp.detune = currDetune;
    }
  }

  // draw layers
  image(face_layer, 0, 0);
  image(brush_layer, 0, 0);
}

/*
setInterval(function () {
    if (frequency > 494 && frequency < 523) {
        sampler.triggerAttackRelease('B4', noteDuration);
    } else if (frequency > 466 && frequency < 494) {
        sampler.triggerAttackRelease('A#4', noteDuration);
    } else if (frequency > 440 && frequency < 466) {
        sampler.triggerAttackRelease('A4', noteDuration);
    } else if (frequency > 415 && frequency < 440) {
        sampler.triggerAttackRelease('G#4', 0.1);
    } else if (frequency > 392 && frequency < 415) {
        sampler.triggerAttackRelease('G4', noteDuration);
    } else if (frequency > 370 && frequency < 392) {
        sampler.triggerAttackRelease('F#4', 0.1);
    } else if (frequency > 349 && frequency < 370) {
        sampler.triggerAttackRelease('F4', noteDuration);
    } else if (frequency > 329 && frequency < 349) {
        sampler.triggerAttackRelease('E4', noteDuration);
    } else if (frequency > 311 && frequency < 329) {
        sampler.triggerAttackRelease('D#4', noteDuration);
    } else if (frequency > 294 && frequency < 311) {
        sampler.triggerAttackRelease('D4', noteDuration);
    } else if (frequency > 277 && frequency < 294) {
        sampler.triggerAttackRelease('C#4', noteDuration);
    } else if (frequency > 262 && frequency < 277) {
        sampler.triggerAttackRelease('C4', noteDuration);
    }
}, 200);
*/

function toNote(frequency) {
  if (frequency > 494 && frequency < 523) {
    note = "B4";
  } else if (frequency > 466 && frequency < 494) {
    note = "A#4";
  } else if (frequency > 440 && frequency < 466) {
    note = "A4";
  } else if (frequency > 415 && frequency < 440) {
    note = "G#4";
  } else if (frequency > 392 && frequency < 415) {
    note = "G4";
  } else if (frequency > 370 && frequency < 392) {
    note = "F#4";
  } else if (frequency > 349 && frequency < 370) {
    note = "F4";
  } else if (frequency > 329 && frequency < 349) {
    note = "E4";
  } else if (frequency > 311 && frequency < 329) {
    note = "D#4";
  } else if (frequency > 294 && frequency < 311) {
    note = "D4";
  } else if (frequency > 277 && frequency < 294) {
    note = "C#4";
  } else if (frequency > 262 && frequency < 277) {
    note = "C4";
  }
}

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
