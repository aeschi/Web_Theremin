
  // ### GRAIN PLAYER ###
  let detuneMaxValue = 1000;
  let playbackrate = 1;
  let grainSize = 0.1;



//let grainPlaying = false;


const gain = new Tone.Gain(0.5).toDestination();
//const gp = new Tone.GrainPlayer("data/music/Theremin_Hauptstimme_ohne_Stille.wav").sync().start(0);
const gp = new Tone.GrainPlayer("data/music/Theremin_Hauptstimme_ohne_Stille.wav").toDestination();
gp.set({playbackRate:0.1, grainSize:0.1});
gp.loop = true;
//gp.playbackRate = 1;
//gp.connect(gain);
const gpCh = new Tone.Channel(1).toDestination();
gp.connect(gpCh).connect(gain);
//gain.toDestination();














/*
let grainSynth = new Tone.synth(
    attack = 0.1,
    release = 0.1
).toMaster();



let grainPlayer = new Tone.GrainPlayer('grainsynth/samples/audio/SH-el.mp3').toDestination();
grainPlayer.grainSize = 0.05;
grainPlayer.overlap = 0.5;
grainPlayer.playbackRate = 0.5;



return Tone.Offline(() => {
	const ampEnv = new Tone.AmplitudeEnvelope({
		attack: 0.1,
		decay: 0.2,
		sustain: 1.0,
		release: 0.8
	}).toDestination();
	const audioBuffer = new Tone.ToneBufferSource('grainsynth/samples/audio/SH-el.mp3', () => {
		console.log('loaded');
	  });
	// create an oscillator and connect it
	const osc = audioBuffer.connect(ampEnv).start();
	// trigger the envelopes attack and release "8t" apart
	ampEnv.triggerAttackRelease("8t");
}, 1.5, 1).then((bufferD) => {
	bufferD.start();
	console.log(bufferD);
  });

// playback rate
// 5.5 * (0.8 - y pos / window height) + 0.5

// start grain
// ctx. currenttime, (length of buffer * x pos of hand) / length of window + rand factor(0-10)


//console.log(Tone.context._context);

//ctx = Tone.context._context;
*/