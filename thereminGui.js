const btnClassic = document.querySelector(".btn-classic");
const btnSampler = document.querySelector(".btn-sampler");
const btnGran = document.querySelector(".btn-granular");
//const btnGrainFBDelay = document.querySelector(".btn-grain");
const btnSoundEffect = document.querySelector(".btn-effect");
const sliderGrainsize = document.getElementById("grainsize");
const sliderPlaybackRate = document.getElementById("playbackrate");
const sliderFoleyGain = document.getElementById("foleygain");
const output = document.getElementById("outputGrain");
const pbr = document.getElementById("outputPBR");
const outgainGrainsynth = document.getElementById("grainSynthGain");
const outgrainSynthgain = document.getElementById("outGrainsynthGain");
//const grainpbr = document.getElementById("grainpbrHand");
const feedbackdelay = document.getElementById("graindelayHand");
const grainsizeHand = document.getElementById("grainsizeHand");
//const foleygain = document.getElementById("outputfoleyGain");
let un_mute = document.getElementById("un-mute");
let toggleVideo = document.getElementById("play");

let myVideo = document.getElementById("video1");

/*
Tone.Transport.loop = true;
Tone.Transport.loopStart = 0;
*/

// ------------ SOUND TOGGLE ------------

un_mute.onclick = () => {
  if (Tone.getContext().rawContext.state == "suspended") {

    Tone.start();
    Tone.Transport.start();
    console.log(Tone.Transport.state);
    // start filmmusik with video at the same time
    myVideo.currentTime = 0;
    /*
    // initially start video together with tone transport so that sound and video are synched
    if (myVideo.paused) {
      myVideo.play();
    }
*/
  } else {
    Tone.getContext().rawContext.suspend();
    /*
    if (myVideo.playing) {
      myVideo.pause();
    }
    */
  }
};

// ------------ THEREMIN ------------

toggleBtnColorActive = (btnName) => {
  btnName.style.opacity = "1.0";
};

toggleBtnColorDeact = (btnName) => {
  btnName.style.opacity = "0.7";
};

// same as toggle sound above
btnClassic.addEventListener("click", function () {
  if (Tone.getContext().rawContext.state == "running") {
    if (myp5.playing) {
      toggleBtnColorDeact(btnClassic);
      myp5.playing = false;
    } else {
      toggleBtnColorActive(btnClassic);
      myp5.playing = true;
    }
  }
});

// same as toggle sound above
btnSampler.addEventListener("click", function () {
  if (Tone.getContext().rawContext.state == "running") {
    if (myp5.therSampler) {
      toggleBtnColorDeact(btnSampler);
      myp5.therSampler = false;
    } else {
      toggleBtnColorActive(btnSampler);
      myp5.therSampler = true;
    }
  }
});

soundeffekteEnabled = false;

btnSoundEffect.addEventListener("click", function(){
  if (Tone.getContext().rawContext.state == "running") {
    if(soundeffekteEnabled){
      soundeffekteEnabled = false;
      toggleBtnColorDeact(btnSoundEffect);
      channelSoundEffektM[0].mute = true;
      channelSoundEffektM[1].mute = true;
      channelSoundEffektM[2].mute = true;
      beglCH_SE.mute = true;
      
      beglCH.mute = false;
      melCH.mute = false;
    }
    else {
      soundeffekteEnabled = true;
      toggleBtnColorActive(btnSoundEffect);
    }
  }
});

/*
// FUNCTIOANLITY GRAin feedback delay
btnGrainFBDelay.addEventListener("click", function () {
  if (Tone.getContext().rawContext.state == "running") {
    if (myp5.grainfbdelay) {
      toggleBtnColorDeact(btnGrainFBDelay);
      myp5.grainfbdelay = false;
      myp5.pbrcontrol = false;
      clock1.stop();
    } else {
      audioBuffer.buffer = sampleBuffer;
      toggleBtnColorActive(btnGrainFBDelay);
      myp5.grainfbdelay = true;
      clock1.start();
    }
  }
});

*/
/*
grainpbr.addEventListener("click", function () {
  melCH.mute = true;
  beglCH.mute = true;
 
  if (myp5.pbrcontrol) {
    myp5.pbrcontrol = false;
  }
  else {
    if (myp5.grainfbdelay) {
      //myp5.pbrcontrol = true;
      myp5.grainfbdelay = false;
      myp5.grainPlaying = true;
      melCH.mute = false;
      beglCH.mute = false;
      clock1.stop();
    }
    else {
      audioBuffer.buffer = sampleBuffer;
      myp5.grainfbdelay = true;
      myp5.grainPlaying = false;
      myp5.pbrcontrol = true;
      clock1.start();
    } //alert("Please activate GRAIN DELAY");
  }
});
*/
/*
let pbrateEnabled = false;

grainpbr.addEventListener("click", function(){
  if(pbrateEnabled){
    pbrateEnabled = false;
    melPl.set({playbackRate: 1.0});
    beglPl.set({playbackRate: 1.0});
  }
  else {
    pbrateEnabled = true;
  }
});
*/
/*
btnGran.addEventListener("click", function () {
  // FUNCTIOANLITY GRANULAR SYNTH
  if (gp.state == "started") {
    gp.stop();
    toggleBtnColorDeact(btnGran);
  } else {
    gp.start();
    toggleBtnColorActive(btnGran);
  }
  });
  */

btnGran.addEventListener("click", function () {
  // FUNCTIOANLITY GRANULAR SYNTH
  if (Tone.getContext().rawContext.state == "running") {
    if (myp5.grainPlaying) {
      //Tone.Transport.stop();

//      gp.stop();
      toggleBtnColorDeact(btnGran);
      myp5.grainPlaying = false;
//      gain.mute = true;
    }
    else {
      //Tone.Transport.start();

//      gp.start();
      toggleBtnColorActive(btnGran);
      myp5.grainPlaying = true;
//      gain.mute = false;
    }
  }
});

fbdelayEnabled = false;

feedbackdelay.addEventListener("click", function () {
  if (fbdelayEnabled) {
    fbdelayEnabled = false;
    Tone.Transport.pause();
    let transporttime = Tone.Transport.seconds;
    console.log("transport time "+ transporttime);
    melPl.stop();
    melPl.dispose();
    melPl = new Tone.GrainPlayer(sampleBufferMelody, () => 
    {console.log("loaded buffer");
  }).sync().start(0);//toDestination();
     // .start(0);
    melPl.set({loop:true, playbackRate: 1, grainSize: 0.1});
    // gp.buffer = sampleBuffer;
    melPl.connect(melCH);
    //melPl.start();
  

   beglPl.stop();
    beglPl.dispose();
   beglPl = new Tone.GrainPlayer(sampleBufferBegl, () => 
   {console.log("loaded buffer");
 }).sync().start(0);//toDestination();
    // .start(0);
   beglPl.set({loop:true, playbackRate: 1, grainSize: 0.1});
   //beglPl.start();
   // gp.buffer = sampleBuffer;
   beglPl.connect(beglCH);
  //beglPl.start();
  
  Tone.Transport.start(Tone.now(), transporttime);
   
/*
    beglPl.stop();
    beglPl.dispose();
    beglPl = new Tone.GrainPlayer(sampleBufferBegl, () => 
    {console.log("loaded buffer");
  }).toDestination();
     // .start(0);
    beglPl.set({loop:true, playbackRate: 1, grainSize: 0.1});
    // gp.buffer = sampleBuffer;
    beglPl.start();
    */
  }
  else {
    fbdelayEnabled = true;
  }
});

/*
  if (playing) {
    if (grainPlaying) {
      grainPlaying = false;
      gp.stop();
    } else {
      grainPlaying = true;
      gp.start();
    }
*/

/*
} else {
if (grainPlaying) {
  grainPlaying = false;
  gp.stop();
} else {
  Tone.start();
  grainPlaying = true;
  gp.start();
}
*/

//}


// GRAIN SIZE SLIDER
output.innerHTML = sliderGrainsize.value;
sliderGrainsize.oninput = function () {
  output.innerHTML = this.value;
  gS = (this.value / 1000).toFixed(2);
  grainSize = gS;
  melPl.set({grainSize: gS, overlap: (gS/3)});
  beglPl.set({grainSize: gS, overlap: (gS/3)});
  /*
  playerMusic[0].grainSize = gS;
  playerMusic[1].grainSize = gS;
  */
};

// CHECKBOX GRAIN SIZE
grainSizeEnabled = false;

grainsizeHand.addEventListener("click", function () {
  if (grainSizeEnabled) {
    grainSizeEnabled = false;
    gS = 0.1;
    melPl.set({grainSize: gS, overlap: (gS/3)});
    beglPl.set({grainSize: gS, overlap: (gS/3)});
    console.log("grian sitze enabled off");
  }
  else {
    grainSizeEnabled = true;
  }
});



// PLAYBACK RATE SLIDER
pbr.innerHTML = sliderPlaybackRate.value;
sliderPlaybackRate.oninput = function () {
  pbr.innerHTML = this.value;

  playbackrate = this.value;
  //gp.playbackRate = playbackrate;
  melPl.set({ playbackRate: playbackrate });
  beglPl.set({ playbackRate: playbackrate });
  /*
   playerMusic[0].playbackRate = this.value;
   playerMusic[1].playbackRate = this.value;
   playerMusic[2].playbackRate = this.value;
   playerMusic[3].playbackRate = this.value;
   */
  console.log(gp.playbackRate);
};


grainSynthGain.innerHTML = outgainGrainsynth.value;
outgainGrainsynth.oninput = function () {
  outgrainSynthgain.innerHTML = this.value;
  melPl.volume.value = this.value;
  beglPl.volume.value = this.value;
};

// FOLEY GAIN SLIDER 
// PLAYBACK RATE SLIDER
/*
foleygain.innerHTML = sliderFoleyGain.value;
sliderFoleyGain.oninput = function () {
  foleygain.innerHTML = this.value;
  playerFoley[0].volume.value = this.value;
  playerFoley[1].volume.value = this.value;
  playerFoley[2].volume.value = this.value;
  playerFoley[3].volume.value = this.value;
};
*/


/*
btnSoundEffect.addEventListener("click", function () {
  if (Tone.getContext().rawContext.state == "running") {
    if (soundefftoggle) {
      Tone.Transport.stop();
      toggleBtnColorDeact(btnSoundEffect);
      soundefftoggle = false;
    }
    else {
      audioBuffer.buffer = playerMusic[0].buffer;
      console.log("buffer "+playerMusic[0].buffer);
      Tone.Transport.start();
      toggleBtnColorActive(btnSoundEffect);
      soundefftoggle = true;
     // audioBuffer.buffer = playerMusic[0].buffer;
    }
  }
});
*/
const motiv1 = document.getElementById("motiv1");
const motiv2 = document.getElementById("motiv2");
const motiv3 = document.getElementById("motiv3");
const motiv4 = document.getElementById("motiv4");
const motiv5 = document.getElementById("motiv5");

const melody1 = document.getElementById("melody1");
const begl1 = document.getElementById("begl1");

motiv1.addEventListener("click", () => {
  toggleButtonMusicMotiv2(motiv1, 0);
});

motiv2.addEventListener("click", () => {
  toggleButtonMusicMotiv2(motiv2, 1);
});

motiv3.addEventListener("click", () => {
  toggleButtonMusicMotiv2(motiv3, 2);
});

motiv4.addEventListener("click", () => {
  toggleButtonMusicMotiv2(motiv4, 3);
});

motiv5.addEventListener("click", () => {
  toggleButtonMusicMotiv2(motiv5, 4);
});


melody1.addEventListener("click", () => {
  toggleButtonMelody(melody1);
});

begl1.addEventListener("click", () => {
  toggleButtonBegleitung(begl1);
});

/*
const melody1 = document.getElementById("melody1"); // 0:15 melodie bulle
const melody2 = document.getElementById("melody2"); // 0:51 milchregen, 1:21 melodie milchregen
const melody3 = document.getElementById("melody3"); // 2:22 melodie tiere
const melody4 = document.getElementById("melody4"); // 3:21 melodie traktor im kreis
const melody5 = document.getElementById("melody5"); // 4:04 melodie bauhaus molkerei
const begl1 = document.getElementById("begl1");
const begl2 = document.getElementById("begl2");
const begl3 = document.getElementById("begl3");
const begl4 = document.getElementById("begl4");
const begl5 = document.getElementById("begl5");
*/

let toggled = [false, false, false, false, false];
let lasttoggled = -1;
let lasttoggledbuttons = [];


let currentlyToggled = [];

// --------------- FILMMUSIK ------------
/*
motiv1.addEventListener("click", function () {
  if (Tone.getContext().rawContext.state == "running") {
    Tone.Transport.start();
    if(myVideo.currentTime > 51){
      myVideo.currentTime = 51;
      
      // maybe start melody player here
    }
    else {
      channelMusic[0].mute = false;
    }
  }
});
*/
toggleButtonMusic = (btnName, i) => {
  // Tone.Transport.start();
  console.log("transport started");
  if (channelMusic[i].mute && channelMusicBegleitung[i].mute) {
    channelMusic[i].mute = false;
    channelMusicBegleitung[i].mute = false;
    toggleBtnColorActive(btnName);
    console.log("yes");
  } else {
    channelMusic[i].mute = true;
    toggleBtnColorDeact(btnName);
    console.log("yes");
  }
};




checkMarks = (start, end) => {
  if ((myVideo.currentTime + 1) >= end) {
    console.log("video reached mark out");
    myVideo.currentTime = start;
    myVideo.play();
    return;

  };
};


playBetween = (a, b) => {

  if (myVideo.currentTime >= a && myVideo.currentTime <= b) {
    myVideo.play();
  }
  else {
    myVideo.currentTime = a;
  }

};

let timerID;

playVideoScene = (i) => {
  let start = starttimes[i];
  let end = starttimes[i + 1] - 1;

  console.log("start " + start + " end " + end);

  playBetween(start, end);
  timerID = setInterval(() => checkMarks(start, end), 100);

  myVideo.play();


};

toggleButtonMusicMotiv2 = (btnName, i) => {
  Tone.Transport.pause();
  console.log(i + " is toggled " + toggled[i]);
  if (melCH.mute && beglCH.mute) {
    melCH.volume.rampTo(0.05, 0.1);
    beglCH.volume.rampTo(0.05, 0.1);
    melCH.mute = false;
    beglCH.mute = false;

  }

  if (toggled[i]) {
    clearInterval(timerID);
    console.log("in toggled "+i);
    //Tone.Transport.pause();
    let transporttime = Tone.Transport.seconds;
    Tone.Transport.set({loop:false})
    
    Tone.Transport.start(Tone.now(),transporttime);
    /*
    melCH.volume.rampTo(-10, 0.1);
    beglCH.volume.rampTo(-10, 0.1);
    
    melCH.mute = true;
    beglCH.mute = true;
    */
    toggleBtnColorDeact(btnName);
    toggled[i] = false;
    lasttoggled = i;
    console.log(i +" is now "+toggled[i]);
    console.log(toggled);
    console.log("in toggled if");
  }
  else {
    console.log(lasttoggledbuttons);
   if (lasttoggledbuttons.length > 0) {
     clearInterval(timerID);
     playVideoScene(i);
      Tone.Transport.pause();
      //Tone.Transport.clear();
      Tone.Transport.set({loop: true, loopStart:starttimes[i], loopEnd: starttimes[i+1]});
      Tone.Transport.start(Tone.now(), starttimes[i]);
      console.log("i " + i);

      toggleBtnColorDeact(lasttoggledbuttons[0]);
      lasttoggledbuttons.pop();
      console.log("lasttoggled is "+ lasttoggled )
      toggled[lasttoggled] = false;
      toggleBtnColorActive(btnName);
      lasttoggledbuttons.push(btnName);
      toggled[i] = true;
      lasttoggled = i;
      console.log(i + " " + toggled[i]);
      console.log(toggled);
      console.log("in last if");
      
    }
    else {
      playVideoScene(i);
      Tone.Transport.pause();
      Tone.Transport.set({loop: true, loopStart:starttimes[i], loopEnd: starttimes[i+1]});
      Tone.Transport.start(Tone.now(),starttimes[i]);
      //Tone.Transport.start(Tone.now(), starttimes[i]);
      console.log("i " + i);

      toggleBtnColorActive(btnName);
      lasttoggledbuttons.push(btnName);
      toggled[i] = true;
      lasttoggled = i;
      console.log(i + " " + toggled[i]);
      console.log(toggled);
      console.log("In last else");
    }

  }

};

toggleButtonMusicMotiv = (btnName, btnName2, btnName3, i) => {

  if (!myVideo.paused) {

    console.log("i " + i + " toggled yes/no " + toggled[i] + " lasttoggled " + lasttoggled + " melCH.mute? " + melCH.mute);
    /*
    if (lasttoggled != i) {
      // start looping scene i 
      //myVideo.currentTime = starttimes[i];
      clearInterval(timerID);
      playVideoScene(i);
      
    }
    else {
     
    // deactivate looping scene
      console.log("clearin timer ");
      clearInterval(timerID);
      
    }
  
  */
    if (melCH.mute && beglCH.mute) {
      console.log("both muted");
      //if (channelMusic[i].mute && channelMusicBegleitung[i].mute) {
      // either non active or new button activated
      // deactivate last activated if its a different one
      if (lasttoggled >= 0) { // maybe find another solution for this
        if (lasttoggled != i) {

          clearInterval(timerID);

          // clicked new motiv button
          /*
          Tone.Transport.scheduleOnce(function(time){
            channelMusic[lasttoggled].volume.rampTo(-10,1);
          }, Tone.now());
          Tone.Transport.scheduleOnce(function(time){
            channelMusicBegleitung[lasttoggled].volume.rampTo(-10,1);
          }, Tone.now());
          */

          //HOW TO REMOVE CLICKS

          Tone.Transport.pause();
          Tone.Transport.start(Tone.now(), starttimes[i]);

          melCH.volume.rampTo(0.05, 0.1);
          melCH.mute = false;
          beglCH.volume.rampTo(0.05, 0.1);
          beglCH.mute = false;

          toggleBtnColorActive(btnName);
          toggleBtnColorActive(btnName2);
          toggleBtnColorActive(btnName3);


          /*
          channelMusic[lasttoggled].volume.rampTo(-10, 0.5);
          channelMusicBegleitung[lasttoggled].volume.rampTo(-10, 0.5);
          channelMusic[lasttoggled].mute = true;
          channelMusicBegleitung[lasttoggled].mute = true;
          */

          toggleBtnColorDeact(lasttoggledbuttons[0]);
          toggleBtnColorDeact(lasttoggledbuttons[1]);
          toggleBtnColorDeact(lasttoggledbuttons[2]);
          toggled[i] = true;
          toggled[lasttoggled] = false;
        }

        else if (lasttoggled == i) {
          clearInterval(timerID);
          playVideoScene(i);
          Tone.Transport.pause();
          Tone.Transport.start(Tone.now(), starttimes[i]);

          melCH.volume.rampTo(-10, 0.1);
          melCH.mute = false;
          beglCH.volume.rampTo(-10, 0.1);
          beglCH.mute = false;


          toggleBtnColorActive(btnName);
          toggleBtnColorActive(btnName2);
          toggleBtnColorActive(btnName3);
          lasttoggledbuttons = [btnName, btnName2, btnName3];
          toggled[i] = true;
          lasttoggled = i;
        }

      }

      console.log("in both muted outside if");

      clearInterval(timerID);
      playVideoScene(i);

      Tone.Transport.pause();
      Tone.Transport.start(Tone.now(), starttimes[i]);


      melCH.volume.rampTo(0.05, 0.1);
      melCH.mute = false;
      beglCH.volume.rampTo(0.05, 0.1);
      beglCH.mute = false;

      /*
      //channelGain[i].gain.rampTo(0.05,1);
      channelMusic[i].volume.rampTo(0.05, 0.5);
      channelMusic[i].mute = false;
 
      //HOW TO REMOVE CLICKS
      channelMusicBegleitung[i].volume.rampTo(0.05, 0.5);
      channelMusicBegleitung[i].mute = false;
      */


      toggleBtnColorActive(btnName);
      toggleBtnColorActive(btnName2);
      toggleBtnColorActive(btnName3);
      toggled[i] = true;
      lasttoggled = i;
      lasttoggledbuttons = [btnName, btnName2, btnName3];
      console.log("toggled " + i);
      console.log("lasttoggled " + i);
    }


    else {
      console.log("in else");
      if (lasttoggled == i) {
        console.log("in else last toggled = i");
        console.log("lasttoggled ist gleich " + i);
        // deactivate looping scene
        clearInterval(timerID);
        Tone.Transport.pause();
        melCH.volume.rampTo(-10, 0.1);
        melCH.mute = true;
        beglCH.volume.rampTo(-10, 0.1);
        beglCH.mute = true;
        toggleBtnColorDeact(btnName);
        toggleBtnColorDeact(btnName2);
        toggleBtnColorDeact(btnName3);
        toggled[i] = false;
      }
      else {
        console.log("in else last toggled new scene");
        // activate new scene , deactivate looping scene

        console.log("clearin timer");
        clearInterval(timerID);
        playVideoScene(i);
        console.log("playing scene " + i);

        // deactivate the currently playing one
        /*
        Tone.Transport.scheduleOnce(function(time){
          channelMusic[i].volume.rampTo(-10,1);
        }, Tone.now());
        Tone.Transport.scheduleOnce(function(time){
          channelMusicBegleitung[i].volume.rampTo(-10,1);
        }, Tone.now());
        */

        /*

        melCH.volume.rampTo(-10, 0.1);
        melCH.mute = true;
        beglCH.volume.rampTo(-10, 0.1);
        beglCH.mute = true;

*/
        Tone.Transport.pause();
        Tone.Transport.start(Tone.now(), starttimes[i]);
        /*
                melCH.volume.rampTo(0.05, 0.1);
                melCH.mute = false;
                beglCH.volume.rampTo(0.05, 0.1);
                beglCH.mute = false;
        */
        toggleBtnColorDeact(lasttoggledbuttons[0]);
        toggleBtnColorDeact(lasttoggledbuttons[1]);
        toggleBtnColorDeact(lasttoggledbuttons[2]);

        toggled[lasttoggled] = false;
        toggled[i] = true;
        lasttoggled = i;

        toggleBtnColorActive(btnName);
        toggleBtnColorActive(btnName2);
        toggleBtnColorActive(btnName3);

        lasttoggledbuttons = [btnName, btnName2, btnName3];


        /*
        channelMusic[i].volume.rampTo(-10, 0.5);
        channelMusicBegleitung[i].volume.rampTo(-10, 0.5);
  
        channelMusic[i].mute = true;
        channelMusicBegleitung[i].mute = true;
        */
        /*
         toggleBtnColorDeact(btnName);
         toggleBtnColorDeact(btnName2);
         toggleBtnColorDeact(btnName3);
         toggled[i] = false;
         */

      }
    }

  }
};


melodystarted = false;

toggleButtonMelody = (btnName) => {
  // Tone.Transport.start();

  if(Tone.Transport.state == "paused"){
    Tone.Transport.start();
  }
  /*
  else if(Tone.Transport.state == "started"){
    toggleBtnColorActive(btnName);
  }
*/
  if (melCH.mute) {

    console.log("melody mute state " + melCH.mute);
    melCH.volume.rampTo(0.05, 0.5);
    melCH.mute = false;
    console.log(Tone.Transport.state);
    toggleBtnColorActive(btnName);
    console.log(melCH.mute);

  } else {
    melCH.volume.rampTo(-10, 0.5);
    melCH.mute = true;
    toggleBtnColorDeact(btnName);

  }
};


toggleButtonBegleitung = (btnName) => {
  // Tone.Transport.start();

  //console.log(Tone.Transport.state);
  if (beglCH.mute) {
    beglCH.volume.rampTo(0.05, 0.5);
    beglCH.mute = false;
    toggleBtnColorActive(btnName);

  } else {
    beglCH.volume.rampTo(-10, 0.5);
    beglCH.mute = true;
    toggleBtnColorDeact(btnName);

  }
};



/*
motiv1.addEventListener("click", () => {
  toggleButtonPlayRangeMotiv(motiv1, melody1, begl1, 0);
});
 
motiv2.addEventListener("click", () => {
  toggleButtonPlayRangeMotiv(motiv2, melody2, begl2, 1);
});
 
motiv3.addEventListener("click", () => {
  toggleButtonPlayRangeMotiv(motiv3, melody3, begl3, 2);
});
 
motiv4.addEventListener("click", () => {
  toggleButtonPlayRangeMotiv(motiv4, melody4, begl4, 3);
});
 
motiv5.addEventListener("click", () => {
  toggleButtonPlayRangeMotiv(motiv5, melody5, begl5, 4);
});
 */


toggleButtonPlayRangeMotiv = (btnName, btnName2, btnName3, i) => {

  // sound is muted and a scene is selected
  if (melCH.mute && beglCH.mute) {
    Tone.Transport.pause();
    Tone.Transport.start(Tone.now(), starttimes[i]);

    melCH.volume.rampTo(0.05, 0.1);
    melCH.mute = false;
    beglCH.volume.rampTo(0.05, 0.1);
    beglCH.mute = false;

    toggleBtnColorActive(btnName);
    toggleBtnColorActive(btnName2);
    toggleBtnColorActive(btnName3);

    toggled[i] = true;
    lasttoggled = i;
    lasttoggledbuttons = [btnName, btnName2, btnName3];
    currentlyToggled.push(i);
  }

  else {
    if (toggled[i]) {
      // deactivate scene
      melCH.volume.rampTo(-10, 0.1);
      melCH.mute = true;
      beglCH.volume.rampTo(-10, 0.1);
      beglCH.mute = true;
      toggleBtnColorDeact(btnName);
      toggleBtnColorDeact(btnName2);
      toggleBtnColorDeact(btnName3);
      toggled[i] = false;
      currentlyToggled.pop();
    } else {
      // activate another scene, sound is playing
      Tone.Transport.pause();
      Tone.Transport.start(Tone.now(), starttimes[i]);
      toggleBtnColorActive(btnName);
      toggleBtnColorActive(btnName2);
      toggleBtnColorActive(btnName3);

      toggleBtnColorDeact(lasttoggledbuttons[0]);
      toggleBtnColorDeact(lasttoggledbuttons[1]);
      toggleBtnColorDeact(lasttoggledbuttons[2]);

      toggled[i] = true;
      lasttoggledbuttons = [btnName, btnName2, btnName3];
      currentlyToggled.push(i);

      /*
      // interval to repeat the selected scenes in transport
      let interval = 0;
      for(j = 0; j< toggled.length;j++){
        if(toggled[j]){
          interval += starttimes[j+1]- starttimes[j];
        }
        
      }
      console.log("interval "+interval);
      for(j=i; j< toggled.length;j++){
        if(toggled[j]){
          console.log(j + " toggled");
          Tone.Transport.scheduleOnce(function(time){
            Tone.Transport.start(Tone.now(),time);
             // after current is over
          }, Tone.now()+(starttimes[j]));
        }
       
      }
      */
    }
  }


};






/*
melody1.addEventListener("click", () => {
  toggleButtonMelody(melody1, 0);
});

melody2.addEventListener("click", () => {
  toggleButtonMelody(melody2, 1);
});

melody3.addEventListener("click", () => {
  toggleButtonMelody(melody3, 2);
});

melody4.addEventListener("click", () => {
  toggleButtonMelody(melody4, 3);
});

melody5.addEventListener("click", () => {
  toggleButtonMelody(melody5, 4);
});

begl1.addEventListener("click", () => {
  toggleButtonBegleitung(begl1, 0);
});

begl2.addEventListener("click", () => {
  toggleButtonBegleitung(begl2, 1);
});

begl3.addEventListener("click", () => {
  toggleButtonBegleitung(begl3, 2);
});

begl4.addEventListener("click", () => {
  toggleButtonBegleitung(begl4, 3);
});

begl5.addEventListener("click", () => {
  toggleButtonBegleitung(begl5, 4);
});
*/

// ------------ MUSIC ------------
/*
const btnAll = document.querySelector(".btn-all");
const btnMain = document.querySelector(".btn-main");
const btnSideOne = document.querySelector(".btn-side-one");
const btnSideTwo = document.querySelector(".btn-side-two");
const btnSideThree = document.querySelector(".btn-side-three");
 
let muteAllMusic = true;
 
btnAll.addEventListener("click", () => {
  Tone.Transport.start();
 
  soundfiles.forEach(function (val, i) {
    if (muteAllMusic) {
      channelMusic[i].mute = false;
      toggleBtnColorActive(btnAll);
      toggleBtnColorActive(btnMain);
      toggleBtnColorActive(btnSideOne);
      toggleBtnColorActive(btnSideTwo);
      toggleBtnColorActive(btnSideThree);
    } else {
      channelMusic[i].mute = true;
      toggleBtnColorDeact(btnAll);
      toggleBtnColorDeact(btnMain);
      toggleBtnColorDeact(btnSideOne);
      toggleBtnColorDeact(btnSideTwo);
      toggleBtnColorDeact(btnSideThree);
    }
  });
  muteAllMusic ? (muteAllMusic = false) : (muteAllMusic = true);
});
 
btnMain.addEventListener("click", () => {
  Tone.Transport.start();
  if (channelMusic[0].mute) {
    channelMusic[0].mute = false;
    toggleBtnColorActive(btnMain);
  } else {
    channelMusic[0].mute = true;
    toggleBtnColorDeact(btnMain);
    toggleBtnColorDeact(btnAll);
  }
});
 
btnSideOne.addEventListener("click", () => {
  Tone.Transport.start();
  if (channelMusic[1].mute) {
    channelMusic[1].mute = false;
    toggleBtnColorActive(btnSideOne);
  } else {
    channelMusic[1].mute = true;
    toggleBtnColorDeact(btnSideOne);
    toggleBtnColorDeact(btnAll);
  }
});
 
btnSideTwo.addEventListener("click", () => {
  Tone.Transport.start();
  if (channelMusic[2].mute) {
    channelMusic[2].mute = false;
    toggleBtnColorActive(btnSideTwo);
  } else {
    channelMusic[2].mute = true;
    toggleBtnColorDeact(btnSideTwo);
    toggleBtnColorDeact(btnAll);
  }
});
 
btnSideThree.addEventListener("click", () => {
  Tone.Transport.start();
  if (channelMusic[3].mute) {
    channelMusic[3].mute = false;
    toggleBtnColorActive(btnSideThree);
  } else {
    channelMusic[3].mute = true;
    toggleBtnColorDeact(btnSideThree);
    toggleBtnColorDeact(btnAll);
  }
});
*/
// ------------ FOLEY ------------

const btnFoleyRain = document.querySelector(".btn-foley-rain");
const btnFoleyWater = document.querySelector(".btn-foley-water");
const btnFoleyPigs = document.querySelector(".btn-foley-pigs");
const btnFoleySteps = document.querySelector(".btn-foley-steps");

const foleyButtons = [btnFoleyWater,btnFoleyRain,btnFoleyPigs,btnFoleySteps];

toggleButton = (btnName, i) => {
  Tone.Transport.start();
  if (foleyChannels[i].mute) {
    foleyChannels[i].mute = false;
    toggleBtnColorActive(btnName);
  } else {
    foleyChannels[i].mute = true;
    toggleBtnColorDeact(btnName);
  }
};

btnFoleyWater.addEventListener("click", () => {
  toggleButton(btnFoleyWater, 0);
});

btnFoleyRain.addEventListener("click", () => {
  toggleButton(btnFoleyRain, 1);
});

btnFoleyPigs.addEventListener("click", () => {
  toggleButton(btnFoleyPigs, 2);
});

btnFoleySteps.addEventListener("click", () => {
  toggleButton(btnFoleySteps, 3);
});




/*
const btnFoleyOne = document.querySelector(".btn-foley-rain");
const btnFoleyTwo = document.querySelector(".btn-foley-water");
const btnFoleyThree = document.querySelector(".btn-foley-pigs");
const btnFoleyFour = document.querySelector(".btn-foley-engine");

toggleButton = (btnName, i) => {
  Tone.Transport.start();
  if (channelFoley[i].mute) {
    channelFoley[i].mute = false;
    toggleBtnColorActive(btnName);
  } else {
    channelFoley[i].mute = true;
    toggleBtnColorDeact(btnName);
  }
};

btnFoleyWater.addEventListener("click", () => {
  toggleButton(btnFoleyWater, 0);
});

btnFoleyTwo.addEventListener("click", () => {
  toggleButton(btnFoleyTwo, 1);
});

btnFoleyThree.addEventListener("click", () => {
  toggleButton(btnFoleyThree, 2);
});

btnFoleyFour.addEventListener("click", () => {
  toggleButton(btnFoleyFour, 3);
});

*/
// ------------ VIDEO ------------


let startTime = 0;
let endTime = 10;

let mutedSound = [];
let mutedBegl = [];
let mutedButtonsM = [];
let mutedButtonsP = [];


toggleVideo.onclick = () => {
  if (myVideo.paused) {
    myVideo.play();

    for (i = 0; i < mutedSound.length; i++) {
      mutedSound[i].mute = false;


    }
    for (i = 0; i < mutedBegl.length; i++) {
      mutedBegl[i].mute = false;

    }
    for (i = 0; i < mutedButtonsM.length; i++) {
      toggleBtnColorActive(mutedButtonsM[i]);
    }
    for (i = 0; i < mutedButtonsP.length; i++) {
      toggleBtnColorActive(mutedButtonsP[i]);
    }
    mutedSound = [];
    mutedBegl = [];
    mutedButtonsM = [];
    mutedButtonsP = [];
  }
  else {
    myVideo.pause();
    for (i = 0; i < channelMusic.length; i++) {
      if (channelMusic[i].mute == false) {
        channelMusic[i].mute = true;
        toggleBtnColorDeact(melodyButtons[i]);
        mutedButtonsM.push(melodyButtons[i]);
        mutedSound.push(channelMusic[i]);


      }
      if (channelMusicBegleitung[i].mute == false) {
        channelMusicBegleitung[i].mute = true;
        toggleBtnColorDeact(beglButtons[i]);
        mutedButtonsP.push(beglButtons[i]);
        mutedBegl.push(channelMusicBegleitung[i]);
      }
      // console.log("sound " +mutedSound + " begl " + mutedBegl);
    }
  }
};

// in out range slider
$(function () {
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 300,
    values: [0, 300],
    slide: function (event, ui) {
      $("#amount").val(ui.values[0] + " - " + ui.values[1] + "sec");
      function checkTime() {
        if (myVideo.currentTime >= ui.values[1]) {
          myVideo.currentTime = ui.values[0];
        } else {
          /* call checkTime every 1/10th 
                  second until endTime */
          setTimeout(checkTime, 100);
        }
      }

      myVideo.currentTime = ui.values[0];
      myVideo.play();
      checkTime();
    },
  });
  $("#amount").val(
    $("#slider-range").slider("values", 0) +
    " - " +
    $("#slider-range").slider("values", 1) +
    "sec"
  );
});
