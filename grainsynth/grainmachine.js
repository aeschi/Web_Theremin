//////////////////////
// Jacob Johnson    //
// granular-machine //
//////////////////////

var rad = 15;
var shade = 150;

var bg = [];
var dots = [];

//grain globals
var att = 0.3; // default
var dec = 0.3; //default
var audioBuffer;

var ctx, grainGain, cVerb, irBuff;

var rate, frate;

var posX, posY;

////////////////////////////////////////////////////////////////////////////////

//initialize grain synth
function init(audioCtx) {
    //web audio setup
    ctx = audioCtx;

    //master volume

    grainGain = ctx.createGain();
    //master.connect(ctx.destination);

    //create convolution verb
    cVerb = ctx.createConvolver();
    cVerb.connect(ctx.destination);

    //get IR
    irBuff;
    var getIr = new XMLHttpRequest();
    getIr.open('get', 'grainsynth/samples/irs/Space4ArtGallery.wav', true);
    getIr.responseType = 'arraybuffer';

    getIr.onload = function () {
        ctx.decodeAudioData(getIr.response, function (buffer) {
            irBuff = buffer;
        });
    };

    getIr.send();
}

function grains(pos, pitch) {
    var grain = ctx.createBufferSource();
    var contour = ctx.createGain();
    var verbLevel = ctx.createGain();
    var len, factor, position, randFactor;

    contour.gain.setValueAtTime(0, ctx.currentTime);
    contour.gain.linearRampToValueAtTime(0.6 * rand(0.5, 1), ctx.currentTime + att);
    contour.gain.linearRampToValueAtTime(0, ctx.currentTime + (att + dec));

    contour.connect(verbLevel);
    contour.connect(grainGain);

    verbLevel.gain.setValueAtTime(0.6, ctx.currentTime);

    verbLevel.connect(grainGain);

    var gRate = 5.5 * (0.8 - pitch / window.innerHeight) + 0.5;

    grain.buffer = audioBuffer;
    len = grain.buffer.duration;
    factor = pos;
    position = window.innerWidth;
    randFactor = 10;

    if (gRate < 1) {
        grain.playbackRate.value = 0.5;
    } else {
        grain.playbackRate.value = Math.floor(gRate);
    }

    grain.connect(contour);

    // grain start point = buf len * mouse position / x dimension + rand
    grain.start(ctx.currentTime, (len * factor) / position + rand(0, randFactor));

    //stop old grains
    grain.stop(ctx.currentTime + (att + dec) + 1);

    //grain enveloping and verb
}

function bufferSwitch(input) {
    var getSound = new XMLHttpRequest();
    if (input == 0) {
        getSound.open('get', 'grainsynth/samples/audio/SH-el.mp3', true);
    } else if (input == 1) {
        getSound.open('get', 'grainsynth/samples/audio/guitar.wav', true);
    } else if (input == 2) {
        getSound.open('get', 'grainsynth/samples/audio/piano+spaceecho.mp3', true);
    } else if (input == 3) {
            getSound.open('get', 'grainsynth/samples/audio/tuningorchestra.mp3', true);
    } else {
        //nothing
    }
    getSound.responseType = 'arraybuffer';
    getSound.onload = function () {
        ctx.decodeAudioData(getSound.response, function (buffer) {
            audioBuffer = buffer;
        });
    };
    getSound.send();
}

function randomX() {
    return Math.random() * windowWidth;
}

function randomY() {
    return Math.random() * windowHeight;
}

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
