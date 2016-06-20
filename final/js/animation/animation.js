function animation() {
    this.render = new render();
    this.mouse = new mouse();
    
    this.startTime = new Date().getTime();;
    this.time = 0;
    this.deltaTime = 0;
    
    this.matrix = new matr();

    this.units = [];

    this.addPointLight = function(light) {
        this.lightingManager.addPointLight(light);
    };

    this.addUnit = function(unit) {
        unit.init(this);
        this.units.push(unit);
    };
    
    this.init = function(canvasId) {
        this.render.init(canvasId);
        this.mouse.init(canvasId);
        this.camera = new camera(this);
        this.lightingManager = new lightingManager(this).init();
    };
    
    
    this.draw = function() {
        for (var i = 0; i < this.units.length; i++)
            this.units[i].response();

        this.lightingManager.geometryPass();

        for (var i = 0; i < this.units.length; i++)
            this.units[i].render();
        
        this.lightingManager.lightingPass();

        var self = this;
        window.requestAnimationFrame(function() {
            self.deltaTime = (new Date().getTime() - self.startTime) / 1000 - self.time;
            self.time += self.deltaTime;
            self.render.stats.update();
            self.camera.updateMatrix();

            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            self.draw();
        });
    };
    
    this.run = function() {
        this.draw();
    };
}