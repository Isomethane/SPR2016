function animation() {

    this.units = [];
    this.render = new render();
    this.mouse = new mouse();
    this.time = new Date().getTime();
    this.deltaTime = 0;
    
    this.init = function(canvasId) {
        this.render.init(canvasId);
        this.mouse.init(canvasId);
    };
    
    this.addUnit = function(unit) {
        this.units.push(unit);
        this.units[this.units.length - 1].init(this);
    };
    
    this.draw = function() {
        for (var i = 0; i < this.units.length; i++) {
            this.units[i].response();
        }
        for (var i = 0; i < this.units.length; i++) {
            this.units[i].render();
        }

        var self = this;
        window.requestAnimationFrame(function() {
            self.deltaTime = (new Date().getTime() - self.time) / 1000;
            self.time = new Date().getTime();

            self.render.context.viewport(0, 0, self.render.context.viewportWidth, self.render.context.viewportHeight);
            self.render.context.clear(self.render.context.COLOR_BUFFER_BIT | self.render.context.DEPTH_BUFFER_BIT);

            self.draw();
        });
    };
    
    this.run = function() {
        this.draw();
    };
}