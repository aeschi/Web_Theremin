const btnInfo = document.querySelector(".btn-info");
const btnClassic = document.querySelector(".btn-classic");
const btnGran = document.querySelector(".btn-granular");
const btnGrain = document.querySelector(".btn-grain");
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
  if (playing) {
    toggleBtnColorDeact(btnClassic);
    Tone.getContext().rawContext.suspend();
    playing = false;
  } else {
    toggleBtnColorActive(btnClassic);
    playing = true;
  }
});

btnGran.addEventListener("click", function () {
  // FUNCTIOANLITY GRANULAR SYNTH

  if (playing) {
    if (grainPlaying) {
      grainPlaying = false;
      gp.stop();
    } else {
      grainPlaying = true;
      gp.start();
    }

    toggleBtnColorDeact(btnGran);
  } else {
    if (grainPlaying) {
      grainPlaying = false;
      gp.stop();
    } else {
      Tone.start();
      grainPlaying = true;
      gp.start();
    }

    toggleBtnColorActive(btnGran);
  }
});

// SLIDER EXAMPLE
output.innerHTML = sliderGrainsize.value;
sliderGrainsize.oninput = function () {
  output.innerHTML = this.value;
  gS = (this.value / 1000).toFixed(2);
  gp.grainSize = gS;
};

btnGrain.addEventListener("click", function () {
  // FUNCTIOANLITY GRAIN DELAY
});

// ------------ MUSIC ------------

const player = new Tone.Player({
  url: "data/music/Theremin_Hauptstimme_ohne_Stille.wav",
  loop: true,
  autostart: false,
}).toDestination();

const btnMain = document.querySelector(".btn-main");

btnMain.addEventListener("click", function () {
  if (player.state == "stopped") {
    player.start();
    toggleBtnColorActive(btnMain);
  } else if (player.state == "started") {
    player.stop("+0.3");
    toggleBtnColorDeact(btnMain);
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
    max: 50,
    values: [0, 50],
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
