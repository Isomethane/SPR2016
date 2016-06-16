function geometryPassManager() {

    this.initBuffers = function() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.gBuffer);
        
        for (var i = 0; i < this.textures.length; i++) {
            gl.bindTexture(gl.TEXTURE_2D, this.textures[i].texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight,
                0, gl.RGBA, gl.FLOAT, null);
        }
        this.draw_buffers_ext.drawBuffersWEBGL(this.attachments);

        for (var i = 0; i < this.textures.length; i++) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, this.attachments[i], gl.TEXTURE_2D, this.textures[i].texture, 0);
        }

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);

        this.width = gl.drawingBufferWidth;
        this.height = gl.drawingBufferHeight;
    };

    this.init = function() {
        this.draw_buffers_ext = gl.getExtension('WEBGL_draw_buffers');
        if (!this.draw_buffers_ext) {
            alert("Failed to init 'WEBGL_draw_buffers' extension.");
        }
        this.color_buffer_float_ext = gl.getExtension('WEBGL_color_buffer_float');
        if (!this.color_buffer_float_ext) {
            alert("Failed to init 'WEBGL_color_buffer_float' extension.");
        }
        this.texture_float_ext = gl.getExtension('OES_texture_float');
        if (!this.texture_float_ext) {
            alert("Failed to init 'OES_texture_float' extension.");
        }

        this.gBuffer = gl.createFramebuffer();

        this.gPosition = new texture().init();
        this.gNormal = new texture().init();
        this.gAmbient = new texture().init();
        this.gDiffuse = new texture().init();
        this.gSpecularShininess = new texture().init();

        this.textures = [
            this.gPosition,
            this.gNormal,
            this.gAmbient,
            this.gDiffuse,
            this.gSpecularShininess
        ];

        this.renderbuffer = gl.createRenderbuffer();
        
        this.attachments = [
            this.draw_buffers_ext.COLOR_ATTACHMENT0_WEBGL,
            this.draw_buffers_ext.COLOR_ATTACHMENT1_WEBGL,
            this.draw_buffers_ext.COLOR_ATTACHMENT2_WEBGL,
            this.draw_buffers_ext.COLOR_ATTACHMENT3_WEBGL,
            this.draw_buffers_ext.COLOR_ATTACHMENT4_WEBGL
        ];

        this.initBuffers();

        return this;
    };
    
    this.use = function(width, height) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.gBuffer);

        if (this.width != width || this.height != height) {
            this.initBuffers();
        }

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    
    return this;
}