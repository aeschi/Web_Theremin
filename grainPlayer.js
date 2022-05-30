// ### GRAIN PLAYER ###
let detuneMaxValue = 1000;
let playbackrate = 1;
let grainSize = 0.1;

const gain = new Tone.Gain(0.5).toDestination();
//const gp = new Tone.GrainPlayer("data/music/Theremin_Hauptstimme_ohne_Stille.wav").sync().start(0);
const gp = new Tone.GrainPlayer(
  "data/music/Theremin_Hauptstimme_ohne_Stille.wav"
).toDestination();
gp.set({ playbackRate: 0.1, grainSize: 0.1 });
gp.loop = true;
const gpCh = new Tone.Channel(1).toDestination();
gp.connect(gpCh).connect(gain);
