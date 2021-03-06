//总入口 
import Canvas, { canvas, context } from '../draw/canvas';
import Fuse from './fuse';
class Index {
    fireWorks = [{
        gravity: 0.98,
        friction: 0.98,
        color: "red",
        fuse: {
            startPoint: [10, canvas.height - 20],
            vx: 0.12,
            vy: -0.12,
            x: 20,
            y: canvas.height - 20,
            ex: 200,
            ey: 200
        },
        scene: {
            startPoint: [100, 100],
            data: [
                {
                    vx: 0.12,
                    vy: -0.12,
                    radius: 5,
                }
            ]
        },
        status: 0
    }]
    currentTime = new Date()
    timeSlice = 1000 / 60
    accumulation = 0
    sx = 0
    constructor() {
        this.start = this.start.bind(this);
    }
    _move() {
        let { timeSlice, fireWorks } = this,
            nowTime = new Date(),
            passed = nowTime - this.currentTime;
        this.accumulation += passed;
        while (this.accumulation >= timeSlice) {
            fireWorks.forEach(fireWork => {
                switch (fireWork.status) {
                    case 0:
                        this._drawFuse();
                        break;
                    case 1:
                        this._drawScene(fireWork);
                        break;
                    case 2:
                        break;
                }
            })
            this.accumulation -= passed;
        }
        this.currentTime = nowTime;
    }

    // 绘制引信
    _drawFuse() {
        Fuse.draw();
    }
    // 绘制景色
    _drawScene() {

    }
    start() {
        this._move();
        requestAnimationFrame(this.start);
    }
}

export default new Index();