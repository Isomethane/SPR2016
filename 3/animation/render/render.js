function render() {
    
    this.initGL = function() {
        try {
            this.context = this.canvas.getContext("webgl");
            this.context.viewportWidth = this.canvas.width;
            this.context.viewportHeight = this.canvas.height;
        } catch (e) {
            alert("Could not initialise WebGL.");
        }
        if (!this.context) {
            alert("Could not initialise WebGL.");
        }
    };
    
    this.init = function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.initGL();
        this.context.enable(this.context.DEPTH_TEST);
        this.context.clearColor(0.3, 0.5, 0.7, 1.0);
    };
}