function postProcessingManager() {

    this.initBuffers = function() {

        for (var i = 0; i < this.textures.length; i++) {
            gl.bindTexture(gl.TEXTURE_2D, this.textures[i].texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F,
                Math.floor(gl.drawingBufferWidth / Math.pow(2, i % 4)), Math.floor(gl.drawingBufferHeight / Math.pow(2, i % 4)),
                0, gl.RGBA, gl.FLOAT, null);
        }

        this.width = gl.drawingBufferWidth;
        this.height = gl.drawingBufferHeight;
    };

    this.init = function() {
        this.framebuffers = [
            gl.createFramebuffer(),
            gl.createFramebuffer()
        ];

        this.textures = [
            new texture().init(),
            new texture().init(),
            new texture().init(),
            new texture().init(),
            new texture().init(),
            new texture().init(),
            new texture().init(),
            new texture().init()
        ];

        this.initBuffers();

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return this;
    };

    this.bloom = function(screenQuad, textures) {
        if (document.getElementById("bloom_off").checked ||
            document.getElementById("position").checked ||
            document.getElementById("normal").checked ||
            document.getElementById("ambient").checked) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.useProgram(screenQuad.shaders[2].program);
            textures[0].apply(0);
            gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[2].program, "scene"), 0);
            gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[2].program, "isBloom"), 0);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            screenQuad.draw(2);
            return;
        }

        if (this.width != gl.drawingBufferWidth || this.height != gl.drawingBufferHeight) {
            this.initBuffers();
        }

        var horizontal = true;
        var tex;
        var iter = [
            document.getElementById("bloom_iterations0").value,
            document.getElementById("bloom_iterations1").value,
            document.getElementById("bloom_iterations2").value,
            document.getElementById("bloom_iterations3").value
        ];
        gl.useProgram(screenQuad.shaders[1].program);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < iter[i] * 2; j++) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[horizontal ? 1 : 0]);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
                    this.textures[horizontal ? i + 4 : i].texture, 0);
                gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[1].program, "horizontal"), horizontal);

                gl.uniform1f(gl.getUniformLocation(screenQuad.shaders[1].program, "width"),
                    Math.floor(gl.drawingBufferWidth / Math.pow(2, i)));
                gl.uniform1f(gl.getUniformLocation(screenQuad.shaders[1].program, "height"),
                    Math.floor(gl.drawingBufferHeight / Math.pow(2, i)));

                tex = j == 0 ? textures[1] : horizontal ? this.textures[i] : this.textures[i + 4];
                tex.apply(0);
                gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[1].program, "image"), 0);
                gl.viewport(0, 0,
                    Math.floor(gl.drawingBufferWidth / Math.pow(2, i)), Math.floor(gl.drawingBufferHeight / Math.pow(2, i)));
                screenQuad.draw(1);
                horizontal = !horizontal;
            }
        }
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        
        gl.useProgram(screenQuad.shaders[2].program);
        textures[0].apply(0);
        gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[2].program, "scene"), 0);
        gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[2].program, "isBloom"), 1);
        for (var i = 0; i < 4; i++) {
            if (iter[i] != 0) {
                this.textures[i].apply(i + 1);
                gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[2].program, "bloom" + i), i + 1);
            }
            gl.uniform1i(gl.getUniformLocation(screenQuad.shaders[2].program, "isBloom" + i), iter[i]);
        }
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        screenQuad.draw(2);
    };

    return this;
}