
function preload() {
    thereminImg = loadImage('data/image/theremin_bw.png');
    // thereminMusic = loadSound('data/music/Theremin_Begleitung_Theremin_2-5.wav');
}

function setup() {
    sketchWidth = document.getElementById("canvas").offsetWidth;
    sketchHeight = document.getElementById("canvas").offsetHeight;
    canvas = createCanvas(sketchWidth, sketchHeight);
    canvas.parent('canvas');
    canvas.position(0, 0);
}

function draw() {
    canvas.clear();
    // background(203, 0, 100, 50, 40);

    // draw theremin illustration
    image(thereminImg, sketchWidth/2 - sketchWidth/5, sketchHeight-sketchWidth/3, sketchWidth/3 , sketchWidth/3);
}
