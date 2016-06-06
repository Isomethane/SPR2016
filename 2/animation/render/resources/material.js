function material(context) {

    this.textures = [];
    
    this.setShader = function(id) {
        this.shader = new shader(context, id);
        this.shader.init();
    };

    this.addTexture = function(texture) {
        this.textures.push(texture);
    };
    
    this.apply = function() {
        this.shader.apply();
        for (var i = 0; i < this.textures.length; i++)
            this.textures[i].apply(i);
    };
}