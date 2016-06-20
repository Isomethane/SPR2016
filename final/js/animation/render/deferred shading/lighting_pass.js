function lightingPassManager() {

    this.initBuffers = function() {
        for (var i = 0; i < this.textures.length; i++) {
            gl.bindTexture(gl.TEXTURE_2D, this.textures[i].texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, gl.drawingBufferWidth, gl.drawingBufferHeight,
                0, gl.RGBA, gl.FLOAT, null);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.lBuffer);
        gl.drawBuffers(this.attachments);
        for (var i = 0; i < this.textures.length; i++) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, this.attachments[i], gl.TEXTURE_2D, this.textures[i].texture, 0);
        }

        this.width = gl.drawingBufferWidth;
        this.height = gl.drawingBufferHeight;
    };

    this.init = function() {
        this.lBuffer = gl.createFramebuffer();

        this.lColor = new texture().init();
        this.lBrightColor = new texture().init();

        this.textures = [
            this.lColor,
            this.lBrightColor
        ];
        
        this.attachments = [
            gl.COLOR_ATTACHMENT0,
            gl.COLOR_ATTACHMENT1
        ];

        this.initBuffers();

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return this;
    };

    this.use = function() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.lBuffer);

        if (this.width != gl.drawingBufferWidth || this.height != gl.drawingBufferHeight) {
            this.initBuffers();
        }

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };

    return this;
}