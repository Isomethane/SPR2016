function animation() {

    this.units = [];
    this.render = new render();
    this.mouse = new mouse();
    
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
            self.draw();
        });
    };
    
    this.run = function() {
        this.draw();
    };
}