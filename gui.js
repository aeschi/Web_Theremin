// GUI for grain params
// Documentation: https://cocopon.github.io/tweakpane/input.html

const PARAMS = {
    source: 0,
    attack: 0.3,
    decay: 0.3,
    density: 35,
    start: 0,
    end: 0,
};

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
    if (playing) {
        synth.triggerRelease();
    } else {
        synth.triggerAttack();
    }
    playing = !playing;
    console.log(playing);
});

pane.addSeparator();
const showInstructions = pane.addButton({ title: 'show instructions' });
showInstructions.on('click', () => {
    hideIntro();
});
