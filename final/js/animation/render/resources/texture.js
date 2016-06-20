function texture() {

    this.handleLoadedTexture = function() {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };

    this.init = function(name) {
        this.texture = gl.createTexture();
        if (name) {
            this.texture.image = new Image();
            this.texture.image.src = "bin/" + name;
            var self = this;
            this.texture.image.onload = function () {
                self.handleLoadedTexture();
            }
        }
        return this;
    };

    this.apply = function(n) {
        if (n > 31)
            alert("Too many textures.");
        gl.activeTexture(gl.TEXTURE0 + n);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    };

    return this;
}