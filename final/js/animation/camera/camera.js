function camera() {
    this.position = new vec();
    this.matrix = new matr();

    this.updateMatrix = function() {
        this.matrix.perspective(45, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000.0);
        //this.matrix.lookAt(new vec(3, 3, 3), new vec(0, 0, 0), new vec(0, 1, 0));
    };
}