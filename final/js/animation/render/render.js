function render() {
    
    this.initGL = function() {
        try {
            gl = this.canvas.getContext("webgl2", {antialias: false});
            gl.viewportWidth = this.canvas.width;
            gl.viewportHeight = this.canvas.height;
        } catch (e) {
            alert("Could not initialise WebGL 2.");
        }
        if (!gl) {
            alert("Could not initialise WebGL 2.");
        }

        if (!gl.getExtension("OES_texture_float_linear"))
            alert("Could not get 'OES_texture_float_linear' extension.");
        if (!gl.getExtension("WEBGL_color_buffer_float") && !gl.getExtension("EXT_color_buffer_float"))
            alert("Could not get 'color_buffer_float' extension.");

        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
    };
    
    this.init = function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth - 350;
        this.canvas.height = window.innerHeight - 100;
        var self = this;
        window.addEventListener('resize', function() {
            self.canvas.width = window.innerWidth - 350;
            self.canvas.height = window.innerHeight - 100;
        }, false);
        this.initGL();
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        this.stats.domElement.style.zIndex = 10;
        this.container.appendChild(this.stats.domElement);
    };
}