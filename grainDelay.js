
  // ### SOUND EFFECTS SETTINGS
  let fbdelay;
  // interactive pbr control
  //let pbrcontrol = false;
  //let grainfbdelay = false;

  let graindelay_pbrate;
  // sample file
  let audioFile = "data/music/Theremin_Hauptstimme_ohne_Stille.wav";
  // tone audio buffer can be assigner to gp.buffer
  const sampleBuffer = new Tone.ToneAudioBuffer(audioFile, () => {
    console.log('loaded');
  });
  // audio buffer to apply sound effects to
  const audioBuffer = new Tone.ToneBufferSource(audioFile, () => {
    console.log('loaded');
    grainBuffer.buffer = audioBuffer.buffer;
  }).toDestination();
  // buffer should loop during interaction
  audioBuffer.loop = true;

  
  let audioBufTemp = sampleBuffer;