let thereminWidth;
let thereminHeight;

let vidSize;

let frequency;
let synthVolume;

let synth = new Tone.DuoSynth({
    harmonicity: 2,
    vibratoAmount: 0.4,
    voice0: {
        oscillator: {
            type: 'sine',
        },
    },
    voice1: {
        oscillator: {
            type: 'sine',
        },
    },
}).toMaster();

let playing = false;

function preload() {
    thereminImg = loadImage('data/image/theremin.png');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);

    vidSize = windowWidth * 0.75;
    // farmerVid = createVideo(['data/video/farmersspring25fpsFHD.mp4'], vidLoad);
    // farmerVid.hide();

    pose_layer = createGraphics(640, 360);
    hands_layer = createGraphics(640, 360);

    poseNetSetup();

    if (width < 2000) {
        thereminWidth = width / 2;
        thereminHeight = (width / 2) * 0.78;
    } else {
        thereminWidth = 1000;
        thereminHeight = 1000 * 0.78;
    }

    // initAudio();
}

function draw() {
    // background(253, 245, 230, 20);
    canvas.clear();

    // draw video
    // image(farmerVid, width / 2 - vidSize / 2, windowHeight * 0.05);

    // drawSkeleton();
    // map hand movement to synth
    if (poses.length > 0) {
        let handR = poses[0].pose.rightWrist;
        let handL = poses[0].pose.leftWrist;
        let nose = poses[0].pose.nose;
        let d = 30;

        if (typeof handR.x !== 'undefined') {
            hands_layer.clear();
            // hands_layer.background(253, 245, 230, 20);
            hands_layer.fill(215, 123, 103, 100);
            hands_layer.noStroke();

            if (handR.confidence > 0.05 && handL.confidence > 0.05) {
                d = int(dist(handR.x, handR.y, handL.x, handL.y));
            }

            if (handR.confidence > 0.2) {
                hands_layer.ellipse(handR.x, handR.y, d / 15);
                hands_layer.ellipse(handL.x, handL.y, d / 15);
            }

            if (nose.confidence > 0.5) {
                hands_layer.noFill();
                hands_layer.stroke(215, 123, 103);

                hands_layer.beginShape();
                for (let a = 0; a < TWO_PI; a += 0.02) {
                    let xoff = map(cos(a), -1, 1, 0, 2);
                    let yoff = map(sin(a), -1, 1, 0, 2);
                    const r = map(noise(xoff, yoff, 0), 0, 1, 33, 40);
                    let x = r * cos(a);
                    let y = r * sin(a);
                    vertex(x + nose.x, y + nose.y);
                }
                hands_layer.endShape(CLOSE);
            }

            // trigger synth
            synth.triggerAttackRelease('C4', '0.1');

            // Update oscillator frequency
            frequency = map(handR.x, 0, 640, 440, 220);
            synth.setNote(frequency);

            // Update oscillator volume
            synthVolume = map(handL.y, 0, 360, 0, -24);
            synth.volume.value = synthVolume;
        }
    }
    // draw layers
    let factor = width / hands_layer.width;
    image(pose_layer, 0, (height - pose_layer.height) / 2, pose_layer.width, pose_layer.height);
    image(hands_layer, 0, (height - hands_layer.height * factor) / 2, hands_layer.width * factor, hands_layer.height * factor);

    // draw theremin illustration
    image(thereminImg, width / 2 - thereminWidth / 1.6, height / 1.6 - thereminHeight / 2, thereminWidth, thereminHeight);
}

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

// pose recorder with timeline - can be saved to json file
// https://github.com/osteele/p5pose-recorder
// https://osteele.github.io/p5pose-recorder/

// https://creative-coding.decontextualize.com/video/
// https://blog.addpipe.com/10-advanced-features-in-html5-video-player/#startorstopthevideoatacertainpointortimestamp
