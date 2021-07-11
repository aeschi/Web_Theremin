class LightPainter {
    constructor() {
        this.points = [];
        this.maxPoints = 50;
        this.threshold = 1;
    }

    addPoint(x, y) {
        let add = true;

        // Do not add the new point if the distance to the last one is under the threshold
        if (this.points.length > 0) {
            let lastPoint = this.points[this.points.length - 1];
            if (dist(x, y, lastPoint.x, lastPoint.y) < this.threshold) {
                add = false;
            }
        }
        if (add) {
            // TODO: calculate distance only once
            // let distance = dist(p1.x, p1.y, p2.x, p2.y);
            this.points.push({
                x: x,
                y: y,
                // distance: distance
                lifeSpan: 150,
            });
        }
    }

    display() {
        // Draw trail
        for (let i = 0; i < this.points.length - 1; i++) {
            let p1 = this.points[i];
            let p2 = this.points[i + 1];

            let distance = dist(p1.x, p1.y, p2.x, p2.y);

            // Set stroke based on speed
            let weight = (map(distance, 0, 50, 14, 4) * p2.lifeSpan) / 200;
            strokeWeight(weight);

            // Set alpha based on lifeSpan and speed
            let alpha = (map(distance, 0, 100, 200, 50) * p2.lifeSpan) / 100;
            stroke(255, 255, 0, alpha);

            // Draw line
            line(p1.x, p1.y, p2.x, p2.y);

            // Draw ellipse
            // noStroke();
            // fill(255, 255, 0, alpha);
            // ellipse(p2.x, p1.y, 14, 14);

            p1.lifeSpan--;
        }
    }
}
