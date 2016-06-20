function camera(anim, eye, center, up) {
    this.eye = eye ? eye : new vec(4.4, 2.4, 7.4);
    this.center = center ? center : new vec(0.0, 0.0, 0.0);
    this.up = up ? up : new vec(0.0, 1.0, 0.0);
    
    this.proj = new matr();
    this.view = new matr();
    
    this.lastWheelDelta = anim.mouse.wheelDelta;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.updateMatrix = function() {
        if (this.lastWheelDelta != anim.mouse.wheelDelta) {
            var s;
            if (this.lastWheelDelta > anim.mouse.wheelDelta)
                s = 9 / 10;
            else
                s = 10 / 9;
            this.eye = this.center.add(this.eye.subtract(this.center).multiply(s));
            this.lastWheelDelta = anim.mouse.wheelDelta;
        }

        if (anim.mouse.down) {
            if (this.lastMouseX != anim.mouse.downPos.s && Math.abs(this.lastMouseX - anim.mouse.downPos.s) > 30) {
                var deltaX = anim.mouse.downPos.s - this.lastMouseX > 0 ? 1 : -1;
                var rotate = this.eye.subtract(this.center);
                rotate.transform(new matr().setRotateY(Math.PI / 3 * anim.deltaTime * deltaX));
                this.eye = rotate.add(this.center);
            }
            if (this.lastMouseY != anim.mouse.downPos.t && Math.abs(this.lastMouseY - anim.mouse.downPos.t) > 30) {
                var deltaY = anim.mouse.downPos.t - this.lastMouseY > 0 ? 1 : -1;
                var dir = this.eye.subtract(this.center);
                var len = dir.length();
                dir.normalize();
                var rotate = new vec(Math.sqrt(dir.x * dir.x + dir.z * dir.z), dir.y, 0);
                if (Math.abs(dir.y) < 0.99 || dir.y * deltaY < 0)
                    rotate.transform(new matr().setRotateZ(Math.PI / 3 * anim.deltaTime * deltaY));
                var result = new vec(
                    rotate.x * dir.x / Math.sqrt(1 - dir.y * dir.y),
                    rotate.y,
                    rotate.x * dir.z / Math.sqrt(1 - dir.y * dir.y)
                );
                this.eye = this.center.add(result.multiply(len));
            }
        }
        this.lastMouseX = anim.mouse.pos.s;
        this.lastMouseY = anim.mouse.pos.t;
        
        this.proj.perspective(45, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 10000.0);
        this.view.lookAt(this.eye, this.center, this.up);
    };
}
