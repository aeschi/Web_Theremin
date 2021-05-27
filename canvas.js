let thereminWidth;
let thereminHeight;

let vidSize = 800;

function preload() {
    thereminImg = loadImage('data/image/theremin.png');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    farmerVid = createVideo(['data/video/farmersspring25fpsFHD.mp4'], vidLoad);
    farmerVid.hide();

    pose_layer = createGraphics(canvas.height / 2, canvas.width / 2);
    poseNetSetup();

    thereminWidth = thereminImg.width * 0.5;
    thereminHeight = thereminImg.height * 0.5;
}

function draw() {
    // background(230, 20, 100);
    canvas.clear();

    image(farmerVid, width / 2 - vidSize / 2, height / 2 - vidSize / 3);

    drawSkeleton();
    image(pose_layer, 10, 10);

    image(thereminImg, width / 2 - thereminWidth / 1.6, height / 1.5 - thereminHeight / 2, thereminWidth, thereminHeight);
}

function vidLoad() {
    farmerVid.loop();
    farmerVid.volume(0);
    farmerVid.size(vidSize);
}
