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
    bpm: 108,   // transport bpm
    fbdelay: 0 // feedback delay
};

console.log(synth.volume.value);



const pane = new Tweakpane({
    title: 'VIRTUAL THEREMIN SOUNDS',
    expanded: true,
});


pane.addSeparator();



const soundBtn = pane.addButton({
    title: '► | ◼︎',
    label: 'sound on/off',
});

soundBtn.on('click', () => {
    if(Tone.getContext().rawContext.state == "suspended"){

        Tone.start();
        
    }
    else {
        
        Tone.getContext().rawContext.suspend();
       // Tone.Transport.stop();
        
    }
});


const bpmInput = pane.addInput(PARAMS, 'bpm', { min: 20, max: 250, step: 1 });
bpmInput.on('change', function (ev) {
    bpmIn = parseFloat(ev.value);
    Tone.Transport.bpm.value = bpmIn;
    console.log("transport bpm :"+ Tone.Transport.bpm.value);
});


// ### THEREMIN VOICE GUI ##########################

pane.addSeparator();

const voices = pane.addFolder({
    title: 'THEREMIN CLASSIC',
});

const thereminBtn = voices.addButton({
    title: 'theremin voice',
  //  label: 'sound on/off',
});

const thereminSampler = voices.addButton({
    title: 'theremin sampler',
  //  label: 'sound on/off',
});

const melody = voices.addButton({
    title: 'theremin melody',
  //  label: 'sound on/off',
});

pane.addSeparator();

const algos = pane.addFolder({
    title: 'SOUND ALGORITHMS',
});

const gpOn = algos.addButton({
    title: 'grain player',
});


thereminBtn.on('click', () => {
    
    if(playing){
       
        playing = false; 
        console.log("playing "+ playing);
    }
    else {
        playing = true;
        console.log("playing "+ playing);
    }
});

thereminSampler.on('click', () => {
    
    if(therSampler){
        therSampler = false; 
        console.log("sampler "+ therSampler);
    }
    else {
        therSampler = true;
        console.log("sampler "+ therSampler);
    }
});

melody.on('click', () => {
    if(player.state == "started"){
        Tone.Transport.pause();
    } else {
        Tone.Transport.start();
    }
    console.log(player.state);
    /*
    if(therMelody
        player.pause();
        therMelody = false; 
      //  console.log("sampler "+ therMelody);
    }
    else {
        player.start();
        therMelody = true;
      //  console.log("sampler "+ therMelody);
    }
    */
});


// ### GRANULAR SYNTHESIS GUI ###################################

gpOn.on('click', () => {
    if(gp.state == "started"){
        gp.stop();
    } else {
        gp.start();
    }
    /*
    if(grainPlaying){ 
        grainPlaying = false;
        gp.stop();
    }else{ 
        grainPlaying = true;
        gp.start();
    }
    */
});

const gs = pane.addFolder({
    title: 'GRAIN SETTINGS',
    expanded: true,
});


// #### SOUND SAMPLE BUFFERS

const sampleBuf1 = new Tone.ToneAudioBuffer('data/samples/audio/SH-el.mp3', () => {
    console.log('loaded');
});
const sampleBuf2 = new Tone.ToneAudioBuffer('data/samples/audio/guitar.wav', () => {
    console.log('loaded');
});
const sampleBuf3 = new Tone.ToneAudioBuffer('data/samples/audio/piano+spaceecho.mp3', () => {
    console.log('loaded');
});
const melody1 = new Tone.ToneAudioBuffer('data/music/Theremin_Hauptstimme_ohne_Stille.wav', () => {
    console.log('loaded');
});

const SourceInput = gs.addInput(PARAMS, 'source', { options: { Synthetic_Sound: 0, Guitar: 1, Piano: 2, Theremin_Melody_1: 3 } });
SourceInput.on('change', function (ev) {
    grainSample = ev.value;
    if (grainSample == 0) {
        gp.stop();
        gp.buffer = sampleBuf1;
        grainPlaying = false;
        gp.start(+2);
    } else if (grainSample == 1) {
        gp.stop();
        gp.buffer = sampleBuf2;
        grainPlaying = false;
        gp.start(+2);
    } else if (grainSample == 2) {
        gp.stop();
        gp.buffer = sampleBuf3;
        grainPlaying = false;
        gp.start(+2);
    } else if (grainSample == 3) {
        gp.stop();
        gp.buffer = melody1;
        grainPlaying = false;
        gp.start(+2);
    }
});


const attackInput = gs.addInput(PARAMS, 'grainSize', { min: 0.01, max: 1, step: 0.01 });
attackInput.on('change', function (ev) {
    gS = parseFloat(ev.value.toFixed(2));
    gp.grainSize = gS;
    grainSize = gS;
});

const decayInput = gs.addInput(PARAMS, 'overlap', { min: 0.0, max: 0.1, step: 0.01 });
decayInput.on('change', function (ev) {
    oL = parseFloat(ev.value.toFixed(2));
    gp.overlap = oL;
});

const maxDetune = gs.addInput(PARAMS, 'detune', { min: 0, max: 800, step: 10 });
maxDetune.on('change', function (ev) {
    detuneMaxValue = ev.value;
});

const changePBR = gs.addInput(PARAMS, 'playbackrate', { min: 0.01, max: 2, step: 0.01 });

changePBR.on('change', function (ev) {
    pbr = parseFloat(ev.value.toFixed(2));
    console.log("pbr " + pbr);
    playbackrate = pbr;
});

pane.addMonitor(PARAMS,'grainSize',{ view:'graph', min: 0, max: 1});
pane.addMonitor(PARAMS,'overlap',{ view:'graph', min: 0, max: 0.1});
pane.addMonitor(PARAMS,'detune',{ view:'graph', min: 0, max: 800});
pane.addMonitor(PARAMS,'playbackrate',{ view:'graph', min: 0, max: 2});

pane.addMonitor(PARAMS,'fbdelay',{ view:'graph', min: 0.0, max: 1.0});