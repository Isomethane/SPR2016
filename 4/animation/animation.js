function animation() {

    this.units = [];
    this.startTime = new Date().getTime();
    this.time = 0;
    this.deltaTime = 0;
    
    this.addUnit = function(unit) {
        unit.init(this);
        this.units.push(unit);
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
            self.deltaTime = (new Date().getTime() - self.startTime) / 1000 - self.time;
            self.time += self.deltaTime;
            
            self.draw();
        });
    };
    
    this.run = function() {
        this.draw();
    };
}