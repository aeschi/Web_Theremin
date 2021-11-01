let video;
let poseNet;
let poses = [];
let nose;

function poseNetSetup() {
    video = createCapture(VIDEO);
    video.size(640, 360);

    let options = {
        flipHorizontal: true,
        minConfidence: 0.6,
        maxPoseDetections: 2,
    };
    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, options, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    console.log('poseNet model Loaded');
}
