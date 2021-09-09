// GUI for grain params
// Documentation: https://cocopon.github.io/tweakpane/input.html
// Video Helper Function
let myVideo = document.getElementById('video1');
let startTime = 0;
let endTime = 10;

const PARAMS = {
    // source: 0,
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
