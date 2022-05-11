var t = function (p) {



    let volhistory = [];
    let waveform = [];

    let meter;

    p.setup = function () {
        sketchWidth = document.getElementById("timeline").offsetWidth;
        sketchHeight = document.getElementById("timeline").offsetHeight;
        //timeline = p.createCanvas(500, 100);
        timeline = p.createCanvas(sketchWidth, sketchHeight);
        timeline.parent("timeline");
       // timeline.position(500, 530);

        waveform = new Tone.Waveform(16);

        meter = new Tone.Meter();
        /*
          channelMusic[0].connect(waveform);
          channelMusic[1].connect(waveform);
          channelMusic[2].connect(waveform);
          channelMusic[3].connect(waveform);
          channelMusic[4].connect(waveform);
  */
    }




    p.draw = function () {
        timeline.clear();
        //p.background(140);
        p.stroke(100);
        let vol;
        let wav;
        for (i = 0; i < 5; i++) {
            if (!channelMusic[i].mute) {
                //  vol = playerMeter[1].getValue();
                //console.log(meter.getValue());
                //vol = Math.random();
                channelMusic[i].connect(waveform);
                wav = waveform.getValue();
                volhistory.push(wav[0].toFixed(4));
                console.log("wav " + wav[0].toFixed(3));
                console.log(volhistory);
                // p.beginShape();
                // p.point(440 + vol.toFixed(2), 550);
                //  p.endShape();
                //  console.log("wavform " + wav);
            }
        }




        p.beginShape();
        for (i = 0; i < volhistory.length; i++) {
            //for(j =0; j < volhistory[i].length; j++){
            let y = p.map(volhistory[i], -0.1, 0.1, 0, 70);
            p.vertex(i,y);
        }
        p.endShape();


        if (volhistory.length > sketchWidth) {
            volhistory.splice(0, 1);
        }


    }


}

var myp5 = new p5(t, 'timeline');