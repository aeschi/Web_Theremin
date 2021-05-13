function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    pose_layer = createGraphics(canvas.height, canvas.width);
    poseNetSetup();
}

function draw() {
    // background(230, 20, 100);

    canvas.clear();
    drawSkeleton();
    image(pose_layer, 0, 0);
}
