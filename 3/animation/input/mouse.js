function mouse() {

    this.getMousePos = function(event) {
        var rect = this.canvas.getBoundingClientRect();
        var pos = new uv();
        pos.set(
            (event.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
            (event.clientY - rect.bottom) / (rect.top - rect.bottom) * this.canvas.height
        );
        return pos;
    };

    this.init = function(canvasId)
    {
        this.canvas = document.getElementById(canvasId);

        this.pos = new uv();
        this.downPos = new uv();
        this.down = false;
        this.upPos = new uv();
        this.clickPos = new uv();
        this.wheelDelta = 0.0;

        var self = this;
        this.canvas.addEventListener("mousemove", function(event)
        {
            self.pos = self.getMousePos(event);
        }, false);

        this.canvas.addEventListener("mousedown", function(event) {
            self.down = true;
            self.downPos = self.getMousePos(event);
        }, false);

        this.canvas.addEventListener("mouseup", function(event) {
            self.down = false;
            self.upPos = self.getMousePos(event);
        }, false);

        this.canvas.addEventListener("click", function(event) {
            self.clickPos = self.getMousePos(event);
        }, false);

        this.canvas.addEventListener("DOMMouseScroll", function(event) {
            self.wheelDelta -= ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
            event.preventDefault();
        }, false);

        this.canvas.addEventListener("mouseout", function(event) {
            self.down = false;
        }, false);
    };
}