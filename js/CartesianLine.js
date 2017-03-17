"use strict";

class CartesianLine {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    toString() {
        return `[${this.start} - ${this.end}]`;
    }

    closestPoint(point) {
        // The projectOn of point point onto a line is the point on the line
        // closest to point. (And a perpendicular to the line at the projectOn
        // will pass through point.)
        //
        // The number t is how far along the line segment from start to end that
        // the projectOn falls. So if t is 0 the projectOn falls right on the
        // start; if it's 1, it's on the end; if it's 0.5, for example, then
        // it's halfway between.
        //
        // If t is less than 0 or greater than 1 it falls on the line past one
        // end or the other of the segment. In that case the distance to the
        // segment will be the distance to the nearer end.
        const start = this.start.minus(point);
        const end = this.end.minus(point);
        const segment = end.minus(start);
        if (!segment.length()) {
            return start;
        }

        const t = -start.projectOn(segment);

        if (t <= 0) {
            return start;
        } else if (t >= 1) {
            return end;
        }

        return start.plus(segment, t);
    }

    minDistance(point) {
        return this.closestPoint(point).length();
    }

    maxDistance(point) {
        return Math.max(this.start.minus(point).length(), this.end.minus(point).length());
    }
}
