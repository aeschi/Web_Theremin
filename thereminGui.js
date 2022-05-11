const btnClassic = document.querySelector(".btn-classic");
const btnSampler = document.querySelector(".btn-sampler");
const btnGran = document.querySelector(".btn-granular");
const btnGrainFBDelay = document.querySelector(".btn-grain");
//const btnSoundEffect = document.querySelector(".btn-sndeff");
const sliderGrainsize = document.getElementById("grainsize");
const sliderPlaybackRate = document.getElementById("playbackrate");
const sliderFoleyGain = document.getElementById("foleygain");
const output = document.getElementById("outputGrain");
const pbr = document.getElementById("outputPBR");
const grainpbr = document.getElementById("grainpbr");
//const foleygain = document.getElementById("outputfoleyGain");
let un_mute = document.getElementById("un-mute");
let toggleVideo = document.getElementById("play");



// ------------ SOUND TOGGLE ------------

un_mute.onclick = () => {
  if (Tone.getContext().rawContext.state == "suspended") {
    Tone.start();
    Tone.Transport.start();
    console.log(Tone.Transport.state);
  } else {
    Tone.getContext().rawContext.suspend();

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
    if (playing) {
      toggleBtnColorDeact(btnClassic);
      playing = false;
    } else {
      toggleBtnColorActive(btnClassic);
      playing = true;
    }
  }
});

// same as toggle sound above
btnSampler.addEventListener("click", function () {
  if (Tone.getContext().rawContext.state == "running") {
    if (therSampler) {
      toggleBtnColorDeact(btnSampler);
      therSampler = false;
    } else {
      toggleBtnColorActive(btnSampler);
      therSampler = true;
    }
  }
});

// FUNCTIOANLITY GRAin feedback delay
btnGrainFBDelay.addEventListener("click", function () {
  if (Tone.getContext().rawContext.state == "running") {
    if (grainfbdelay) {
      toggleBtnColorDeact(btnGrainFBDelay);
      grainfbdelay = false;
      pbrcontrol = false;
      clock1.stop();
    } else {
      audioBuffer.buffer = sampleBuffer;
      toggleBtnColorActive(btnGrainFBDelay);
      grainfbdelay = true;
      clock1.start();
    }
  }
});

grainpbr.addEventListener("click", function () {
  if (pbrcontrol) {
    pbrcontrol = false;
  }
  else {
    if (grainfbdelay) {
      pbrcontrol = true;
    }
    else alert("Please activate GRAIN DELAY");
  }
});

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
     
      gp.stop();
      toggleBtnColorDeact(btnGran);
      myp5.grainPlaying = false;
      gain.mute = true;
    }
    else {
      //Tone.Transport.start();
     
      gp.start();
      toggleBtnColorActive(btnGran);
      myp5.grainPlaying = true;
      gain.mute = false;
    }
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
  gp.grainSize = gS;
  /*
  playerMusic[0].grainSize = gS;
  playerMusic[1].grainSize = gS;
  */
};

// PLAYBACK RATE SLIDER
pbr.innerHTML = sliderPlaybackRate.value;
sliderPlaybackRate.oninput = function () {
  pbr.innerHTML = this.value;
  //gS = (this.value / 1000).toFixed(2);
  playbackrate = this.value;
  gp.playbackRate = playbackrate;
  /*
   playerMusic[0].playbackRate = this.value;
   playerMusic[1].playbackRate = this.value;
   playerMusic[2].playbackRate = this.value;
   playerMusic[3].playbackRate = this.value;
   */
  console.log(gp.playbackRate);
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
const melody1 = document.getElementById("melody1"); // 0:15 melodie bulle
const melody2 = document.getElementById("melody2"); // 0:51 milchregen, 1:15 melodie milchregen
const melody3 = document.getElementById("melody3"); // 2:21 melodie tiere
const melody4 = document.getElementById("melody4"); // 3:20 melodie traktor im kreis
const melody5 = document.getElementById("melody5"); // 4:04 melodie bauhaus molkerei
const begl1 = document.getElementById("begl1");
const begl2 = document.getElementById("begl2");
const begl3 = document.getElementById("begl3");
const begl4 = document.getElementById("begl4");
const begl5 = document.getElementById("begl5");

let motiv1toggled = false;
let motiv2toggled = false;
let motiv3toggled = false;
let motiv4toggled = false;
let motiv5toggled = false;
let anymotivtoggled = false;
let anymelodytoggled = false;
let anybegltoggled = false;
let toggled = [false, false, false, false, false];
let lasttoggled = -1;
let lasttoggledbuttons = [];

let melodyButtons = [melody1, melody2, melody3, melody4, melody5];
let beglButtons = [begl1, begl2, begl3, begl4, begl5];

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


toggleButtonMusicMotiv = (btnName, btnName2, btnName3, i) => {
  if (!myVideo.paused) {
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

    if (channelMusic[i].mute && channelMusicBegleitung[i].mute) {
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

          channelMusic[lasttoggled].volume.rampTo(-10, 0.5);
          channelMusicBegleitung[lasttoggled].volume.rampTo(-10, 0.5);
          channelMusic[lasttoggled].mute = true;
          channelMusicBegleitung[lasttoggled].mute = true;


          toggleBtnColorDeact(lasttoggledbuttons[0]);
          toggleBtnColorDeact(lasttoggledbuttons[1]);
          toggleBtnColorDeact(lasttoggledbuttons[2]);
          toggled[i] = true;
          toggled[lasttoggled] = false;

        }
      }
      clearInterval(timerID);
      playVideoScene(i);

      //channelGain[i].gain.rampTo(0.05,1);
      channelMusic[i].volume.rampTo(0.05, 0.5);
      channelMusic[i].mute = false;

      //HOW TO REMOVE CLICKS
      channelMusicBegleitung[i].volume.rampTo(0.05, 0.5);
      channelMusicBegleitung[i].mute = false;



      toggleBtnColorActive(btnName);
      toggleBtnColorActive(btnName2);
      toggleBtnColorActive(btnName3);
      toggled[i] = true;
      lasttoggled = i;
      lasttoggledbuttons = [btnName, btnName2, btnName3];
      anymotivtoggled = true;
      anymelodytoggled = true;
      anybegltoggled = true;

    }


    else {
      // deactivate looping scene
      console.log("clearin timer ");
      clearInterval(timerID);
      // deactivate the currently playing one
      /*
      Tone.Transport.scheduleOnce(function(time){
        channelMusic[i].volume.rampTo(-10,1);
      }, Tone.now());
      Tone.Transport.scheduleOnce(function(time){
        channelMusicBegleitung[i].volume.rampTo(-10,1);
      }, Tone.now());
      */
      channelMusic[i].volume.rampTo(-10, 0.5);
      channelMusicBegleitung[i].volume.rampTo(-10, 0.5);

      channelMusic[i].mute = true;
      channelMusicBegleitung[i].mute = true;

      toggleBtnColorDeact(btnName);
      toggleBtnColorDeact(btnName2);
      toggleBtnColorDeact(btnName3);
      toggled[i] = false;

    }
  }

};

toggleButtonMelody = (btnName, i) => {
  // Tone.Transport.start();

  if (channelMusic[i].mute) {
    channelMusic[i].volume.rampTo(0.05, 0.5);
    channelMusic[i].mute = false;
    toggleBtnColorActive(btnName);

  } else {
    channelMusic[i].volume.rampTo(-10, 0.5);
    channelMusic[i].mute = true;
    toggleBtnColorDeact(btnName);

  }
};


toggleButtonBegleitung = (btnName, i) => {
  // Tone.Transport.start();

  if (channelMusicBegleitung[i].mute) {
    channelMusicBegleitung[i].volume.rampTo(0.05, 0.5);
    channelMusicBegleitung[i].mute = false;
    toggleBtnColorActive(btnName);

  } else {
    channelMusicBegleitung[i].volume.rampTo(-10, 0.5);
    channelMusicBegleitung[i].mute = true;
    toggleBtnColorDeact(btnName);

  }
};

motiv1.addEventListener("click", () => {
  toggleButtonMusicMotiv(motiv1, melody1, begl1, 0);
});

motiv2.addEventListener("click", () => {
  toggleButtonMusicMotiv(motiv2, melody2, begl2, 1);
});

motiv3.addEventListener("click", () => {
  toggleButtonMusicMotiv(motiv3, melody3, begl3, 2);
});

motiv4.addEventListener("click", () => {
  toggleButtonMusicMotiv(motiv4, melody4, begl4, 3);
});

motiv5.addEventListener("click", () => {
  toggleButtonMusicMotiv(motiv5, melody5, begl5, 4);
});


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

btnFoleyOne.addEventListener("click", () => {
  toggleButton(btnFoleyOne, 0);
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

// ------------ VIDEO ------------
let myVideo = document.getElementById("video1");

let startTime = 0;
let endTime = 10;

let mutedSound = [];
let mutedBegl = [];
let mutedButtonsM =  []; 
let mutedButtonsP = [];


toggleVideo.onclick = () => {
  if (myVideo.paused) {
    myVideo.play();
    
    for(i = 0; i < mutedSound.length; i ++){
      mutedSound[i].mute = false;
     

    }
    for(i = 0; i < mutedBegl.length; i ++){
      mutedBegl[i].mute = false;
      
    }
    for(i = 0; i < mutedButtonsM.length; i ++){
      toggleBtnColorActive(mutedButtonsM[i]);
    }
    for(i = 0; i < mutedButtonsP.length; i ++){
      toggleBtnColorActive(mutedButtonsP[i]);
    }
    mutedSound = [];
    mutedBegl = [];
    mutedButtonsM =  []; 
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
