const btnClassic = document.querySelector(".btn-classic");
const btnGran = document.querySelector(".btn-granular");
const btnGrain = document.querySelector(".btn-grain");
const sliderGrainsize = document.getElementById("grainsize");
const output = document.getElementById("outputGrain");

// ------------ THEREMIN ------------

btnClassic.addEventListener("click", function () {
        if (playing) {
            Tone.getContext().rawContext.suspend();
            playing = false;
        } else {
            Tone.start();
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
    } else {
        if (grainPlaying) {
            grainPlaying = false;
            gp.stop();
        } else {
            Tone.start();
            grainPlaying = true;
            gp.start();
        }
    }

});

// SLIDER EXAMPLE
output.innerHTML = sliderGrainsize.value;
sliderGrainsize.oninput = function() {
    output.innerHTML = this.value;
    gS = (this.value/1000).toFixed(2);
    gp.grainSize = gS;
    console.log(gp.grainSize);
}


btnGrain.addEventListener("click", function () {

    // FUNCTIOANLITY GRAIN DELAY

});


 // ------------ MUSIC ------------

 const player = new Tone.Player({
     url: 'data/music/Theremin_Hauptstimme_ohne_Stille.wav', 
    loop: true,
    autostart: false,
 }).toDestination();

 const btnMain = document.querySelector(".btn-main");

 btnMain.addEventListener("click", function () {
    if (player.state == 'stopped') {
        player.start();
    } else if (player.state == 'started') {
        player.stop('+0.3');
    }
     
     
});