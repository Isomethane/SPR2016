function texture(context) {

    this.handleLoadedTexture = function() {
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, this.texture.image);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    };

    this.init = function(name, uniform) {
        this.texture = context.createTexture();
        this.texture.uniform = uniform;
        this.texture.image = new Image();
        this.texture.image.src = "bin/" + name;
        var self = this;
        this.texture.image.onload = function() {
            self.handleLoadedTexture();
        };
    };

    this.apply = function(n) {
        if (n > 31)
            alert("Too many textures.");
        context.activeTexture(context.TEXTURE0 + n);
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.uniform1i(this.uniform, n);
    };
}