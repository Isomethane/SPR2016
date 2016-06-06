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
    }
    
    this.init = function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.initGL();
    }
}