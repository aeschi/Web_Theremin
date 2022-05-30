var c = function (p) {
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
    vibratoAmount: 0.3,
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

  let lastNote = 0;
  let note = 0;

  //const gainSampler = new Tone.Gain(0.5).toDestination();

  const samplerThereminAnalog = new Tone.Sampler({
    urls: {
      C0: "data/theremin/ThereminSamplesAnalog/C.wav",
      C1: "data/theremin/ThereminSamplesAnalog/c1.wav",
      C2: "data/theremin/ThereminSamplesAnalog/c2.wav",
      C3: "data/theremin/ThereminSamplesAnalog/c3.wav",
      C4: "data/theremin/ThereminSamplesAnalog/c4.wav",
    },
    release: 0.5,
    attack: 0.4,
    vibratoAmount: 0.4,
    // baseUrl: 'https://tonejs.github.io/audio/salamander/',
  }).toDestination();

  const samplerThereminAnalogFiltered = new Tone.Sampler({
    urls: {
      C0: "data/theremin/ThereminSamplesAnalog/C-f.wav",
      C1: "data/theremin/ThereminSamplesAnalog/c1-f.wav",
      C2: "data/theremin/ThereminSamplesAnalog/c2-f.wav",
      C3: "data/theremin/ThereminSamplesAnalog/c3-f.wav",
      C4: "data/theremin/ThereminSamplesAnalog/c4-f.wav",
    },
    release: 0.5,
    attack: 0.4,
    vibratoAmount: 0.4,
    // baseUrl: 'https://tonejs.github.io/audio/salamander/',
  }).toDestination();

  //samplerThereminAnalogFiltered.connect(gainSampler).toDestination();

  // ### INTERACTIVE SOUND HANDLERS

  let playing = false;
  let therSampler = false;
  let grainPlaying = false;
  let grainfbdelay = false;

  // ### GLOBAL SOUND SETTINGS

  let masterVol = 1.5;

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

  // ### p5 ####################

  p.setup = function () {
    sketchWidth = document.getElementById("canvas").offsetWidth;
    sketchHeight = document.getElementById("canvas").offsetHeight;
    canvas = p.createCanvas(sketchWidth, sketchHeight);
    canvas.parent("canvas");
    canvas.position(0, 0);

    vidSize = p.windowWidth * 0.75;

    face_layer = p.createGraphics(canvas.width, canvas.height);
    brush_layer = p.createGraphics(canvas.width, canvas.height);

    poseNetSetup();
  };

  p.draw = function () {
    //amp = new p5.Amplitude();
    canvas.clear();
    face_layer.clear();

    // map hand movement to synth and draw keypoints
    if (poses.length > 0) {
      let handR = poses[0].pose.rightWrist;
      let handL = poses[0].pose.leftWrist;
      let nose = poses[0].pose.nose;
      let d = 30;

      if (typeof handR.x !== "undefined") {
        brush_layer.clear();
        brush_layer.fill(183, 100);
        brush_layer.noStroke();

        // size of hand ellipse based on distance between hands
        if (handR.confidence > 0.05 && handL.confidence > 0.05) {
          d = p.int(p.dist(handR.x, handR.y, handL.x, handL.y));
        }

        // draw hands
        if (handR.confidence > 0.2) {
          rightHandX = p.map(handR.x, 0, 640, 0, p.width);
          rightHandY = p.map(handR.y, 0, 360, 0, p.height);

          leftHandX = p.map(handL.x, 0, 640, 0, p.width);
          leftHandY = p.map(handL.y, 0, 360, 0, p.height);

          brush_layer.ellipse(rightHandX, rightHandY, d / 5);
          brush_layer.ellipse(leftHandX, leftHandY, (p.height - leftHandY) / 3);
        }

        // draw face
        if (nose.confidence > 0.8) {
          noseX = p.map(nose.x, 0, 640, 0, p.width);
          noseY = p.map(nose.y, 0, 360, 0, p.height);

          face_layer.noStroke();
          face_layer.fill(183, 100);
          face_layer.ellipse(noseX, noseY + 50, 120);
        }

        if (nose.confidence > 0.8) {
          for (let i = 0; i < poses.length; i++) {
            let skeleton = poses[i].skeleton;
            // For every skeleton, loop through all body connections
            for (let j = 0; j < skeleton.length; j++) {
              let partA = skeleton[j][0];
              let partB = skeleton[j][1];
              p.stroke(183, 100);
              p.strokeWeight(10);
              p.line(
                p.map(partA.position.x, 0, 640, 0, p.width),
                p.map(partA.position.y, 0, 360, 0, p.height),
                p.map(partB.position.x, 0, 640, 0, p.width),
                p.map(partB.position.y, 0, 360, 0, p.height)
              );
            }
          }
        }

        // play Theremin sound
        if (myp5.playing) {
          // trigger synth
          // synth.triggerAttackRelease('A3', '0.1');

          // Update oscillator frequency
          frequency = p.map(handR.x, 0, 640, 880, 220);
          synth.setNote(frequency);
          // trigger synth
          synth.triggerAttackRelease(frequency, "0.1");

          // Update oscillator volume
          synthVolume = p.map(handL.y, 0, 360, 0, -50);
          synth.volume.value = synthVolume;

          //sampler.volume.value = synthVolume;
        }

        // same as drawing
        if (handR.confidence > 0.2) {
          if (myp5.therSampler) {
            const vol = p.map(handL.y, 360, 0, 0.5, -40);
            //console.log(gpVol);
            // gp.volume.value = gpVol;

            frequency = p.map(handR.x, 0, 640, 880, 60);

            let noteDuration = 0.5;

            const note = new Tone.Frequency(frequency).toNote();

            samplerThereminAnalogFiltered.triggerAttackRelease(note, 0.5);
            samplerThereminAnalogFiltered.volume.value = vol;
          }
        }

        if (myp5.grainfbdelay) {
          let audioLenInSec =
            audioBuffer.buffer.length / Tone.getContext().rawContext.sampleRate;
          let handPercent = handR.y / (360 / 100); // percent hand height wrt video height
          let audioPercent = audioBuffer.buffer.length / 100;
          let audioPercToHand =
            (audioPercent * handPercent) /
            Tone.getContext().rawContext.sampleRate;
          if (audioPercToHand > audioLenInSec) {
            //hand movement is outside the valid range
            clock1.pause();
            console.log("paused");
          } else if (audioPercToHand < 0) {
            clock1.pause();
            console.log("paused");
          } else if (audioPercToHand < audioLenInSec) {
            if (clock1.state == "paused") {
              console.log("start clock");
              clock1.start(); // continues melody
              // console.log("started");
            }

            if (handL.y >= 0 && handL.y <= 360) {
              graindelay_pbrate = p.map(handL.y, 0, 360, 0.001, 2);
            } else {
              graindelay_pbrate = 0.1;
            }

            // feedback amount = where hand is vertically in relation to audio file length
            const fbNum = p.map(audioPercToHand, 0, audioLenInSec, 0, 1);
            const fb = fbNum.toFixed(2);
            // delay amount = where right hand is related to the webcam image width
            // TODO : change delay to distance between the two hands
            const delayNum = p.map(handR.x, 0, video.width, 0, 1);
            // delay time in musical notation (not used yet)
            const soundDelay = new Tone.Time(delayNum).toNotation();
            const del = delayNum.toFixed(1);

            // ranges of the defined feedbach delay nodes
            if (del <= 0.8 && del >= 0.2) {
              // if (fbdelayMap.has(float(del))) {

              // get feedback delay node corresponding to delay time from the stored map
              let arr = fbdelayMap.get(p.float(del));

              //const ind = Math.floor(random(1, 4)) - 1;
              const ind = 3;
              // console.log("del fb ind " + del + " " + fb);
              if (fb >= 0 && fb < 0.15) {
                //console.log("next 1");
                //fbdelay = arr[0];
                fbdelay = arr[ind];
              }
              if (fb >= 0.15 && fb < 0.25) {
                // console.log("next 2");
                fbdelay = arr[1];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.25 && fb < 0.35) {
                //console.log("next 3");
                fbdelay = arr[2];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.35 && fb < 0.45) {
                // console.log("next 4");
                fbdelay = arr[3];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.45 && fb < 0.55) {
                //console.log("next 5");
                fbdelay = arr[4];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.55 && fb < 0.65) {
                // console.log("next 6");
                fbdelay = arr[5];
                // fbdelay = arr[ind];
              }
              if (fb >= 0.65 && fb < 0.75) {
                //console.log("next 7");
                fbdelay = arr[6];
                // fbdelay = arr[ind];
              }
              if (fb >= 0.75 && fb <= 0.85) {
                //console.log("next 8");
                fbdelay = arr[7];
                //fbdelay = arr[ind];
              }
            } else {
              fbdelay = fbd27;
            }
          }
        }
        //   }

        if (myp5.grainPlaying) {
          let gS;
          let currPbr;
          let fbNum;

          // console.log("in grain playng");

          let xLenHand = 640 / 2;
          // let yLenHand = 360/2;

          if (grainSizeEnabled) {
            // console.log("grain size enabled");
            if (handR.x >= xLenHand && handR.x <= 640) {
              //gS = p.map(handR.y, 0, 360, 0.02, 1.5);
              gS = (p.map(handR.x, xLenHand, 640, 5, 100) / 1000).toFixed(2);

              // gp.grainSize(gS.toFixed(2));
            } else {
              gS = 0.1;
            }
            melPl.set({ grainSize: gS, overlap: gS / 3 });
            beglPl.set({ grainSize: gS, overlap: gS / 3 });
            wasserPL.set({ grainSize: gS, overlap: gS / 3 });
            rainPL.set({ grainSize: gS, overlap: gS / 3 });
            pigsPL.set({ grainSize: gS, overlap: gS / 3 });
            stepsPL.set({ grainSize: gS, overlap: gS / 3 });
          }

          if (fbdelayEnabled) {
            // RIGHT HAND Y

            if (handR.y >= 0 && handR.y <= 360) {
              fbNum = p.map(handR.y, 0, 360, 0, 0.9);
            } else {
              fbNum = 0.1;
            }
            const fb = fbNum.toFixed(1);
            // ranges of the defined feedbach delay nodes
            if (fb <= 0.8 && fb >= 0.1) {
              // if (fbdelayMap.has(float(del))) {

              // get feedback delay node corresponding to delay time from the stored map
              let arr = fbdelayMap.get(p.float(fb));

              console.log("fb " + fb);

              //const ind = Math.floor(random(1, 4)) - 1;
              const ind = 0;
              // console.log("del fb ind " + del + " " + fb);
              if (fb >= 0 && fb < 0.15) {
                //console.log("next 1");
                //fbdelay = arr[0];
                fbdelay = arr[ind];
              }
              if (fb >= 0.15 && fb < 0.25) {
                // console.log("next 2");
                fbdelay = arr[1];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.25 && fb < 0.35) {
                //console.log("next 3");
                fbdelay = arr[2];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.35 && fb < 0.45) {
                // console.log("next 4");
                fbdelay = arr[3];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.45 && fb < 0.55) {
                //console.log("next 5");
                fbdelay = arr[4];
                //fbdelay = arr[ind];
              }
              if (fb >= 0.55 && fb < 0.65) {
                // console.log("next 6");
                fbdelay = arr[5];
                // fbdelay = arr[ind];
              }
              if (fb >= 0.65 && fb < 0.75) {
                //console.log("next 7");
                fbdelay = arr[6];
                // fbdelay = arr[ind];
              }
              if (fb >= 0.75 && fb <= 0.85) {
                //console.log("next 8");
                fbdelay = arr[7];
                //fbdelay = arr[ind];
              }
            } else {
              fbdelay = fbd27;
            }

            if (!melCH.muted) {
              melPl.connect(fbdelay).toDestination();
            }
            if (!beglCH.muted) {
              beglPl.connect(fbdelay).toDestination();
            }
            if (!wasserCH.muted) {
              wasserPL.connect(fbdelay).toDestination();
            }
            if (!rainCH.muted) {
              rainPL.connect(fbdelay).toDestination();
            }
            if (!pigsCH.muted) {
              pigsPL.connect(fbdelay).toDestination();
            }
            if (!stepsCH.muted) {
              stepsPL.connect(fbdelay).toDestination();
            }
          }

          const gpVol = p.map(handL.y, 360, 0, 0.5, -20);

          melPl.set({ volume: gpVol });
          beglPl.set({ volume: gpVol });

          wasserPL.set({ volume: gpVol });
          rainPL.set({ volume: gpVol });
          pigsPL.set({ volume: gpVol });
          stepsPL.set({ volume: gpVol });
        }

        if (soundeffekteEnabled) {
          beglCH_SE.volume.rampTo(0.05, 0.5);
          beglCH_SE.mute = false;
          beglCH.mute = true;
          if (
            handL.y >= 0 &&
            handL.y <= 180 &&
            handL.x >= 0 &&
            handL.x <= 320
          ) {
            melCH.volume.rampTo(0.05, 0.5);
            channelSoundEffektM[0].volume.rampTo(-10, 0.5);
            channelSoundEffektM[1].volume.rampTo(-10, 0.5);
            channelSoundEffektM[2].volume.rampTo(-10, 0.5);
            melCH.mute = false;
            channelSoundEffektM[0].mute = true;
            channelSoundEffektM[1].mute = true;
            channelSoundEffektM[2].mute = true;
            console.log("melody");
          } else if (
            handR.y >= 0 &&
            handR.y < 180 &&
            handR.x >= 0 &&
            handR.x <= 320
          ) {
            melCH.volume.rampTo(-10, 0.5);
            channelSoundEffektM[0].volume.rampTo(0.05, 0.5);
            channelSoundEffektM[1].volume.rampTo(-10, 0.5);
            channelSoundEffektM[2].volume.rampTo(-10, 0.5);
            melCH.mute = true;
            channelSoundEffektM[0].mute = false;
            channelSoundEffektM[1].mute = true;
            channelSoundEffektM[2].mute = true;
            console.log("sf 1");
          } else if (
            handL.y >= 180 &&
            handL.y <= 360 &&
            handL.x >= 0 &&
            handL.x <= 320
          ) {
            melCH.volume.rampTo(-10, 0.5);
            channelSoundEffektM[0].volume.rampTo(-10, 0.5);
            channelSoundEffektM[1].volume.rampTo(0.05, 0.5);
            channelSoundEffektM[2].volume.rampTo(-10, 0.5);
            melCH.mute = true;
            channelSoundEffektM[0].mute = true;
            channelSoundEffektM[1].mute = false;
            channelSoundEffektM[2].mute = true;
            console.log("sf 2");
          } else if (
            handR.y >= 180 &&
            handR.y <= 360 &&
            handR.x >= 320 &&
            handR.x <= 640
          ) {
            melCH.volume.rampTo(-10, 0.5);
            channelSoundEffektM[0].volume.rampTo(-10, 0.5);
            channelSoundEffektM[1].volume.rampTo(-10, 0.5);
            channelSoundEffektM[2].volume.rampTo(0.05, 0.5);
            melCH.mute = true;
            channelSoundEffektM[0].mute = true;
            channelSoundEffektM[1].mute = true;
            channelSoundEffektM[2].mute = false;
            console.log("sf 3");
          }
        }

        // draw layers
        p.image(face_layer, 0, 0);
        p.image(brush_layer, 0, 0);
      }
    }
  };

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

  let video;
  let poseNet;
  let poses = [];
  let nose;

  function poseNetSetup() {
    video = p.createCapture(p.VIDEO);
    video.size(640, 360);

    let options = {
      flipHorizontal: true,
      minConfidence: 0.6,
      maxPoseDetections: 2,
    };
    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, options, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on("pose", function (results) {
      poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
  }

  function modelReady() {
    // console.log('poseNet model Loaded');
  }
};

var myp5 = new p5(c, "canvas");
