const btnInfo = document.querySelector(".btn-info");
const btnClassic = document.querySelector(".btn-classic");
const btnGran = document.querySelector(".btn-granular");
// const btnGrain = document.querySelector(".btn-grain");
const sliderGrainsize = document.getElementById("grainsize");
const output = document.getElementById("outputGrain");
let un_mute = document.getElementById("un-mute");

// ------------ SOUND TOGGLE ------------

un_mute.onclick = () => {
  if (Tone.getContext().rawContext.state == "suspended") {
    Tone.start();
  } else {
    Tone.getContext().rawContext.suspend();
  }
};

// ------------ INFO ------------

btnInfo.addEventListener("click", function () {
  alert("an info panel will come here");
});

// ------------ THEREMIN ------------

toggleBtnColorActive = (btnName) => {
  btnName.style.opacity = "1.0";
};

toggleBtnColorDeact = (btnName) => {
  btnName.style.opacity = "0.5";
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

btnGran.addEventListener("click", function () {
  // FUNCTIOANLITY GRANULAR SYNTH
  if (gp.state == "started") {
    gp.stop();
    toggleBtnColorDeact(btnGran);
  } else {
    gp.start();
    toggleBtnColorActive(btnGran);
  }
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
});

// SLIDER EXAMPLE
output.innerHTML = sliderGrainsize.value;
sliderGrainsize.oninput = function () {
  output.innerHTML = this.value;
  gS = (this.value / 1000).toFixed(2);
  gp.grainSize = gS;
};

// btnGrain.addEventListener("click", function () {
//   // FUNCTIOANLITY GRAIN DELAY
// });

// ------------ MUSIC ------------

const btnAll = document.querySelector(".btn-all");
const btnMain = document.querySelector(".btn-main");
const btnSideOne = document.querySelector(".btn-side-one");
const btnSideTwo = document.querySelector(".btn-side-two");
const btnSideThree = document.querySelector(".btn-side-three");

let muteAll = true;

btnAll.addEventListener("click", () => {
  Tone.Transport.start();

  soundfiles.forEach(function (val, i) {
    if (muteAll) {
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
  muteAll ? (muteAll = false) : (muteAll = true);
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

// ------------ FOLEY ------------

// need to add foley sounds - where from?

// ------------ VIDEO ------------
let myVideo = document.getElementById("video1");
let startTime = 0;
let endTime = 10;

const btnVid = document.querySelector(".btn-vid");

btnVid.addEventListener("click", function () {
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
});

// in out range slider
$(function () {
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 274,
    values: [0, 274],
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
