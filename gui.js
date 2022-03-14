// GUI for grain params
// Documentation: https://cocopon.github.io/tweakpane/input.html

// Video Helper Function
let myVideo = document.getElementById('video1');
let startTime = 0;
let endTime = 10;

const PARAMS = {
    startTime: startTime,
    endTime: endTime,
    source: 0, //sample file number in GUI drop down list
    grainSize: 0.1, //in seconds
    overlap: 0, //in seconds
    detune: 0, // detuning in cents, 100 cent = 1 semitone
    playbackrate: 1, //playback rate factor
};

console.log(synth.volume.value);
const pane = new Tweakpane({
    title: 'VIRTUAL THEREMIN SOUNDS',
    expanded: true,
});

// CLASSIC THEREMIN - transfered
pane.addSeparator();

const instr = pane.addFolder({
    title: 'THEREMIN CLASSIC',
});

const btnTheremin = instr.addButton({
    title: '► | ◼︎',
    label: 'sound',
});

btnTheremin.on('click', () => {
    if (playing) {
        Tone.getContext().rawContext.suspend();
        playing = false;
    } else {
        Tone.start();
        playing = true;
    }
});

// GRANUALAR

const gs = pane.addFolder({
    title: 'THEREMIN GRANULAR SYNTHESIS',
    expanded: true,
});
const btnGranular = gs.addButton({
    title: '► | ◼︎',
    label: 'sound',
});

btnGranular.on('click', () => {
    if (playing) {
        if (grainPlaying) {
            grainPlaying = false;
            gp.stop();
        } else {
            grainPlaying = true;
            gp.start();
        }
    } else {
        if (grainPlaying) {
            grainPlaying = false;
            gp.stop();
        } else {
            Tone.start();
            grainPlaying = true;
            gp.start();
        }
    }
});

const sampleBuffer1 = new Tone.ToneAudioBuffer('grainsynth/samples/audio/SH-el.mp3', () => {
    console.log('loaded');
});
const sampleBuffer2 = new Tone.ToneAudioBuffer('grainsynth/samples/audio/guitar.wav', () => {
    // console.log('loaded');
});
const sampleBuffer3 = new Tone.ToneAudioBuffer('grainsynth/samples/audio/piano+spaceecho.mp3', () => {
    // console.log('loaded');
});
const sampleBuffer4 = new Tone.ToneAudioBuffer('data/music/Theremin_Hauptstimme_ohne_Stille.wav', () => {
    // console.log('loaded');
});
const SourceInput = gs.addInput(PARAMS, 'source', { options: { Synthetic_Sound: 0, Guitar: 1, Piano: 2 , Theremin_Melody_1: 3} });
SourceInput.on('change', function (ev) {
    grainSample = ev.value;
    if (grainSample == 0) {
        gp.stop();
        gp.buffer = sampleBuffer1;
        grainPlaying = false;
    } else if (grainSample == 1) {
        gp.stop();
        gp.buffer = sampleBuffer2;
        grainPlaying = false;
    } else if (grainSample == 2) {
        gp.stop();
        gp.buffer = sampleBuffer3;
        grainPlaying = false;
    }  else if (grainSample == 3) {
        gp.stop();
        gp.buffer = sampleBuffer4;
        grainPlaying = false;
    }
});

const f = gs.addFolder({
    title: 'GRAIN SETTINGS',
    expanded: true,
});

const attackInput = f.addInput(PARAMS, 'grainSize', { min: 0.01, max: 0.1, step: 0.01 });
attackInput.on('change', function (ev) {
    gS = parseFloat(ev.value.toFixed(2));
    gp.grainSize = gS;

    console.log(gp.grainSize);
});

const decayInput = f.addInput(PARAMS, 'overlap', { min: 0.0, max: 0.1, step: 0.01 });
decayInput.on('change', function (ev) {
    oL = parseFloat(ev.value.toFixed(2));
    gp.overlap = oL;
});

const maxDetune = f.addInput(PARAMS, 'detune', { min: 0, max: 800, step: 10 });
maxDetune.on('change', function (ev) {
    detuneMaxValue = ev.value;
});

const changePBR = f.addInput(PARAMS, 'playbackrate', { min: 0.01, max: 2, step: 0.01 });

changePBR.on('change', function (ev) {
    pbr = parseFloat(ev.value.toFixed(2));
    console.log("pbr "+pbr);
    playbackrate = pbr;
});

// Play Music

const music = pane.addFolder({
    title: 'MUSIC',
});

const btnExample = music.addButton({
    title: '► | ◼︎',
    label: 'example',
});

btnExample.on('click', () => {
    if (player.state == 'stopped') {
        player.start();
    } else if (player.state == 'started') {
        player.stop('+0.3');
    }
});

const btnEffect = music.addButton({
    title: '► | ◼︎',
    label: 'reverb',
});

btnEffect.on('click', () => {
    player.connect(reverb);
    player.start();
});

// VIDEO SETTINGS
pane.addSeparator();
const vid = pane.addFolder({
    title: 'VIDEO',
});

const btnVideo = vid.addButton({
    title: '► | ◼︎',
    label: 'video',
});

btnVideo.on('click', () => {
    playPause();
});

const startInput = vid
    .addInput(PARAMS, 'startTime', {
        min: 0,
        max: 10,
    })
    .on('change', (ev) => {
        // console.log(ev.value.toFixed(2));
        if (ev.last) {
            console.log('(last)');
        }
        setTimeFrame();
    });

const endInput = vid
    .addInput(PARAMS, 'endTime', {
        min: 0,
        max: 10,
    })
    .on('change', (ev) => {
        // console.log(ev.value.toFixed(2));
        if (ev.last) {
            console.log('(last)');
        }
        setTimeFrame();
    });

pane.addSeparator();
const showInstructions = pane.addButton({ title: 'show instructions' });
showInstructions.on('click', () => {
    tour.start();
});

function playPause() {
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
}

function setTimeFrame() {
    function checkTime() {
        if (myVideo.currentTime >= PARAMS.endTime) {
            myVideo.currentTime = PARAMS.startTime;
        } else {
            /* call checkTime every 1/10th 
              second until endTime */
            setTimeout(checkTime, 100);
        }
    }

    myVideo.currentTime = PARAMS.startTime;
    myVideo.play();
    checkTime();
}
