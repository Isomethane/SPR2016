function render() {
    
    this.initGL = function() {
        try {
            gl = this.canvas.getContext("webgl");
            gl.viewportWidth = this.canvas.width;
            gl.viewportHeight = this.canvas.height;
        } catch (e) {
            alert("Could not initialise WebGL.");
        }
        if (!gl) {
            alert("Could not initialise WebGL.");
        }
    };
    
    this.init = function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth - 300;
        this.canvas.height = window.innerHeight;
        var self = this;
        window.addEventListener('resize', function() {
            self.canvas.width = window.innerWidth - 300;
            self.canvas.height = window.innerHeight;
            self.isResized = true;
        }, false);
        this.initGL();
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        // prepare stats
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        this.stats.domElement.style.zIndex = 10;
        this.container.appendChild(this.stats.domElement);
    };
}