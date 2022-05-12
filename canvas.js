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
  const env = new Tone.AmplitudeEnvelope().toDestination();

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
    // farmerVid = createVideo(['data/video/farmersspring25fpsFHD.mp4'], vidLoad);
    // farmerVid.hide();

    face_layer = p.createGraphics(canvas.width, canvas.height);
    brush_layer = p.createGraphics(canvas.width, canvas.height);

    poseNetSetup();
  }

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

            // ok, vielleicht kann man hier probieren ein längeres sauberes theremin sample zu bekommen, und dann
            // mit asynchroner granular synthese etwas zu machen? dann klingt das ähnlich vom timbre des samples
            // ist aber verbundener, und eher wie ein flächiger theremin sound

            // hier envelopes hinzufügen, und die länge der Noten regeln
            const note = new Tone.Frequency(frequency).toNote();

            //toNote(frequency);
            //  note = frequency; 
            //  console.log("cur note " + note);
            /*
              if (lastNote != 0) {
                if (note != lastNote) {
                  samplerThereminAnalog.triggerRelease(lastNote, Tone.now());
                  samplerThereminAnalog.triggerAttack(note, Tone.now());
                  lastNote = note;
                }
                //else if same as before continue playin note??
              } else if (lastNote == 0) {
                samplerThereminAnalog.triggerAttack(note, Tone.now());
                lastNote = note;
              }
              */
            samplerThereminAnalogFiltered.triggerAttackRelease(note, 0.5);
            samplerThereminAnalogFiltered.volume.value = vol;
            //  console.log(note + " " + frequency + " " + samplerThereminAnalog.volume.value + " " + handR.x + " " + handL.y);
          }
        }

        /*
              // test with grain player
              if (soundefftoggle) {
                audioBuffer.buffer = playerMusic[0].buffer;
                let audioLenInSec = audioBuffer.buffer.length / Tone.getContext().rawContext.sampleRate;
                let handPercent = handR.y / (360 / 100) // percent hand height wrt video height
                let audioPercent = (audioBuffer.buffer.length / 100);
                let audioPercToHand = (audioPercent * handPercent) / Tone.getContext().rawContext.sampleRate;
                if (audioPercToHand < audioLenInSec) {
                  const delayNum = map(handR.x, 0, video.width, 0, 1);
                  // console.log(delayNum.toFixed(1));
                  const soundDelay = new Tone.Time(delayNum).toNotation();
                  //console.log("sound delay " + soundDelay);
                  const fb = map(audioPercToHand, 0, audioLenInSec, 0, 1);
                  console.log("fb " + fb);
                  if (fb < 0.3) {
        
                    playerMusic[0].connect(feedbackDelay9).toDestination();
        
                  }
                  //  else if (fb > 0.3 && fb < 0.5) {
                  //   playerMusic[0].connect(feedbackDelay9).toDestination();
                  //  }
                  else if (fb > 0.3 && fb < 0.7) {
        
                    audioBuffer.connect(fbdC).connect(fbdB).connect(fbdA).toDestination();
                    playerMusic[0].buffer = audioBuffer.buffer;
        
                  }
                  else {
                    //  playerMusic[0].connect(feedbackDelay11).connect(feedbackDelay6).connect(fbdel1).toDestination();
                  }
                }
              }
        */
        /*
         // grain feedback delay button is activated
         // test with grain buffers
         if (gpsoundeffects) {
           let audioLenInSec = audioBuffer.buffer.length / Tone.getContext().rawContext.sampleRate;
           let handPercent = handR.y / (360 / 100) // percent hand height wrt video height
           let audioPercent = (audioBuffer.buffer.length / 100);
           let audioPercToHand = (audioPercent * handPercent) / Tone.getContext().rawContext.sampleRate;
           if (audioPercToHand > audioLenInSec) {
             //hand movement is outside the valid range
             clock1.pause();
           }
           else if (audioPercToHand < 0) {
             clock1.pause();
           }
           else if (audioPercToHand < audioLenInSec) {
             if (clock1.state == "paused") {
               console.log("start clock");
               clock1.start(); // continues melody
             }
             // movement is within valid audio length range
             //where is the hand in audio file
             let fb = map(audioPercToHand, 0, audioLenInSec, 0, 1);
             console.log("feedback " + fb);
             if (fb < 0.3) {
               fbdelay = null;
             }
             else if (fb > 0.3 && fb < 0.5) {
               //fbdelay = fbd1;
               fbdelay = feedbackDelay9;
             }
             else if (fb > 0.5 && fb < 0.7) {
               fbdelay = 1;
             }
             else {
               fbdelay = 2;
             }
           }
   
           // PARAMS.fbdelay = fb;
           //         console.log("gs "+grainSize +" pbr "+playbackRate+" detune "+detune);   
   
         }
         */
        // same as drawing
        if (handR.confidence > 0.2) {

          if (myp5.grainfbdelay) {


            let audioLenInSec = audioBuffer.buffer.length / Tone.getContext().rawContext.sampleRate;
            let handPercent = handR.y / (360 / 100) // percent hand height wrt video height
            let audioPercent = (audioBuffer.buffer.length / 100);
            let audioPercToHand = (audioPercent * handPercent) / Tone.getContext().rawContext.sampleRate;
            if (audioPercToHand > audioLenInSec) {
              //hand movement is outside the valid range
              clock1.pause();
              console.log("paused");
            }
            else if (audioPercToHand < 0) {
              clock1.pause();
              console.log("paused");
            }
            else if (audioPercToHand < audioLenInSec) {
              if (clock1.state == "paused") {
                console.log("start clock");
                clock1.start(); // continues melody
                // console.log("started");
              }
              if (myp5.pbrcontrol) {
                const currPbr = p.map(handL.y, 0, 360, 0.001, 2);
                graindelay_pbrate = currPbr;
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
                console.log(arr);
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
              } else { fbdelay = fbd27; }

            }
          }
        }

        if (myp5.grainPlaying) {
          let gS;
          let currPbr;
          let fbNum;

          console.log("in grain playng");

          let xLenHand = 640/2;
         // let yLenHand = 360/2; 

          if (handR.y >= 0 && handR.y <= 360) {
            gS = p.map(handR.y, 0, 360, 0.02, 1.5);

           // gp.grainSize(gS.toFixed(2));

          } else {
            gS = 0.1;
          }

          if (handR.x >= xLenHand && handR.x <= 640) {

            fbNum = p.map(
              handR.x,
              xLenHand,
              640,
              0,
              0.9
            );
          } else {
            fbNum = 0.1;
          }

          const fb = fbNum.toFixed(1);
          
          /*
          if (handL.y >= 0 && handL.y <= 360) {
            currPbr = p.map(handR.y, 0, 360, 0.05, 0.7);
          }
          else {
            currPbr = 0.05;
          }

          if(currPbr <= 0 ){
            currPbr = 0.1;
          }
      */

          gp.set({grainSize: gS, overlap: (gS/3)});






          /*
                  if (currPbr < 0.001) {
                    // console.log('handL.y', handL.y, ' playback rate ', playbackrate, ' curr pbr ', currPbr);
                    gp.playbackRate = 0.001;
                    //  PARAMS.playbackrate = 0.001; // für das gui monitoring
                  } else {
                    gp.playbackRate = currPbr;
                    //  PARAMS.playbackrate = currPbr; // gui monitoring
                  }
       */

          
          // ranges of the defined feedbach delay nodes
          if (fb <= 0.8 && fb >= 0.1) {
            // if (fbdelayMap.has(float(del))) {

            // get feedback delay node corresponding to delay time from the stored map
            let arr = fbdelayMap.get(p.float(fb));

        

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
          } else { fbdelay = fbd27; }


          gp.connect(fbdelay).toDestination();

        //  let currDetune = p.map(handL.y, video.height, 0, 0.5, 0.1);
          // const interval = currDetune / 1000;
          //intervaltofrequencyratio function from tone js
         //  gp.playbackRate = Math.pow(2, (interval / 12));

      



          const gpVol = p.map(handL.y, 360, 0, 0.5, -20);
         // gp.set({volume: gpVol});

          

        /*  
          console.log("hand L : "+handL.x + " " + handL.y +" pbr "+ gp.playbackRate +" vol "+ gpVol);
          console.log("hand R : "+handR.x + " " + handR.y +" fb "+ fb +" gS "+ gp.grainSize);
          */
        }





        // draw layers
        p.image(face_layer, 0, 0);
        p.image(brush_layer, 0, 0);
      }
    }
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
    /*
    note = "C" 128,43
    note = "D" 144,16
    note = "E" 161,82
    note = "F" 171,44
    note = "G" 192,43
    note = "A" 216
    note = "H" 242,45
  
    note ="C1" 256,87;
    note ="D1" 288,33;
    note ="E1" 323,63;
    note ="F1" 342,88;
    note ="G1" 384,87;
    note ="A1" 432;
    note ="H1" 484,90;
  
    note ="C2" 513,74;
    note ="D2" 576,65;
    note ="E2" 647,27;
    note ="F2" 685,76;
    note ="G2" 769,74;
    note ="A2" 864,
    note ="H2" 969,81;
  
    note ="C3" 1027,5;
    note ="D3" 1153,3;
    note ="E3" 1294,5;
    note ="F3" 1371,5;
    note ="G3" 1539,5;
    note ="A3" 1728
    note ="H3" 1939,6;
  
    note ="C4" 2054,9;
    note ="D4" 2306,6;
    note ="E4" 2589,1;
    note ="F4" 2743;
    note ="G4" 3078,9;
    note ="A4" 3456
    note ="H4" 3879,2;
  
  */


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

}

var myp5 = new p5(c, 'canvas');

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
