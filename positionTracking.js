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

function drawSkeleton() {
    pose_layer.clear();
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            if (partA.score > 0.5) {
                pose_layer.stroke(215, 123, 103);
                pose_layer.strokeWeight(2);
                pose_layer.noFill();

                // let dSkeleton = dist(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
                // let steps = 10;
                // pose_layer.beginShape();
                // vertex(partA.position.x, partA.position.y);

                // for (let x = 0; x < steps; x += 1) {
                //     let noisVal = map(noise(x), 0, 1, -10, 10);

                //     vertex(partA.position.x + x * (dSkeleton / steps), partA.position.y + noisVal);
                // }

                // vertex(partB.position.x, partB.position.y);
                // pose_layer.endShape();
                pose_layer.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
            }
        }
    }
}
