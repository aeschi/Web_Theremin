// GUI for grain params
// Documentation: https://cocopon.github.io/tweakpane/input.html
// Video Helper Function
let myVideo = document.getElementById('video1');
let startTime = 0;
let endTime = 10;

const PARAMS = {
     source: 0, //sample file number in GUI drop down list
     grainSize: 0.2, //in seconds
     overlap: 0, //in seconds
     detune: 100, // detuning in cents, 100 cent = 1 semitone
     playbackrate: 1, //playback rate factor
    // attack: 0.3,
    // decay: 0.3,
    // density: 35,
    // start: 0,
    // end: 0,
    startTime: startTime,
    endTime: endTime,
};

console.log(synth.volume.value);
const pane = new Tweakpane({
    title: 'VIRTUAL THEREMIN SOUNDS',
    expanded: true,
});

pane.addSeparator();

const gs = pane.addFolder({
    title: 'THEREMIN GRANULAR SYNTHESIS',
    expanded: true,
});
const btnGranular = gs.addButton({
    title: '► | ◼︎',
    label: 'sound',
});


btnGranular.on('click', () => {
    if(grainPlaying){ 
        grainPlaying = false;
        gp.stop();
    }else{ 
        grainPlaying = true;
        gp.start();
    }
});

const SourceInput = gs.addInput(PARAMS, 'source', { options: { Synthetic_Sound: 0, Guitar: 1, Piano: 2} });
SourceInput.on('change', function (ev) {
    grainSample = ev.value;
    if(grainSample == 0){
        gp.stop();
        gp.dispose();
        gp = new Tone.GrainPlayer("grainsynth/samples/audio/SH-el.mp3", function() {
            console.log("GrainPlayer loaded!")
            console.log("gp.playbackRate:", gp.playbackRate)
            console.log("gp.detune", gp.detune)
            gp.loop = true;
          }).toMaster();
          grainPlaying = false; 
    }else if(grainSample == 1){
        gp.stop();
        gp.dispose();
        gp = new Tone.GrainPlayer("grainsynth/samples/audio/guitar.wav", function() {
            console.log("GrainPlayer loaded!")
            console.log("gp.playbackRate:", gp.playbackRate)
            console.log("gp.detune", gp.detune)
            gp.loop = true;
          }).toMaster();
          grainPlaying = false;    
    } else if(grainSample == 2){
        gp.stop();
        gp.dispose();
        gp = new Tone.GrainPlayer("grainsynth/samples/audio/piano+spaceecho.mp3", function() {
            console.log("GrainPlayer loaded!")
            console.log("gp.playbackRate:", gp.playbackRate)
            console.log("gp.detune", gp.detune)
            gp.loop = true;
          }).toMaster();
          grainPlaying = false;    
    } 
   
});


const f = gs.addFolder({
    title: 'GRAIN SETTINGS',
    expanded: true,
});

const attackInput = f.addInput(PARAMS, 'grainSize', { min: 0.01, max: 2, step: 0.01 });
attackInput.on('change', function (ev) {
    gS = parseFloat(ev.value.toFixed(2)); 
    gp.grainSize = gS;
});

const decayInput = f.addInput(PARAMS, 'overlap', { min: 0.0, max: 1, step: 0.01 });
decayInput.on('change', function (ev) {
    oL = parseFloat(ev.value.toFixed(2));
    gp.overlap = oL;

});

const maxDetune = f.addInput(PARAMS, 'detune', { min: 0, max: 800, step: 10 });
maxDetune.on('change', function (ev) {
    detuneMaxValue = ev.value;
});

const changePBR = f.addInput(PARAMS, 'playbackrate', { min: 0, max: 50, step: 0.1 });
changePBR.on('change', function (ev) {
    playbackRate = ev.value;
});

/*
const f = gs.addFolder({
    title: 'GRAIN SETTINGS',
    expanded: true,
});

const attackInput = f.addInput(PARAMS, 'attack', { min: 0.01, max: 1, step: 0.01 });
attackInput.on('change', function (ev) {
    // change something
    //console.log(ev.value.toFixed(2));
    att = parseFloat(ev.value.toFixed(2)); // parse incoming value for grainmachine.js
});

const decayInput = f.addInput(PARAMS, 'decay', { min: 0.01, max: 1, step: 0.01 });
decayInput.on('change', function (ev) {
    // change something
    dec = parseFloat(ev.value.toFixed(2)); // parse incoming value for grainmachine.js
});


/*
btnGranular.on('click', async () => {
   // await Tone.start();
    
    // if(grainPlaying){
    //     Tone.getContext().rawContext.suspend();
    //     grainPlaying = false;
    // } else {
    //     console.log(Tone.context.start());
    //     grainPlaying = true;
    // }
    /*grainGain = ctx.createGain();
    grainGain.connect(ctx.destination);
    bufferSwitch(grainSample);
    grainPlaying = true;*/
    /*
});

*/
pane.addSeparator();

const instr = pane.addFolder({
    title: 'THEREMIN CLASSIC',
});

const btnTheremin = instr.addButton({
    title: '► | ◼︎',
    label: 'sound',
});

btnTheremin.on('click', () => {
    // if (playing) {
    //     Tone.Transport.start('+0.1');
    // } else {
    //     Tone.Transport.pause();
    // }
    playing = !playing;
});



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
    hideIntro();
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
