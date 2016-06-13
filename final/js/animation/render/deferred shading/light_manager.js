function lightingManager(anim) {
    
    this.pointLights = [];
    this.ambientIntensity = new color(0.4, 0.4, 0.4);
    
    this.gBuffer = gl.createFramebuffer();

    this.gPosition = new texture().init();
    this.gNormal = new texture().init();
    this.gAmbient = new texture().init();
    this.gDiffuse = new texture().init();
    this.gSpecularShininess = new texture().init();

    this.renderbuffer = gl.createRenderbuffer();

    this.lightingPassMaterial = null;
    this.screenQuad = null;

    this.toShow = {value: 0};

    this.initBuffers = function() {
        // position buffer
        gl.bindTexture(gl.TEXTURE_2D, this.gPosition.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight,
            0, gl.RGBA, gl.FLOAT, null);

        // normal buffer
        gl.bindTexture(gl.TEXTURE_2D, this.gNormal.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight,
            0, gl.RGBA, gl.FLOAT, null);

        // ambient buffer
        gl.bindTexture(gl.TEXTURE_2D, this.gAmbient.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight,
            0, gl.RGBA, gl.FLOAT, null);

        // diffuse buffer
        gl.bindTexture(gl.TEXTURE_2D, this.gDiffuse.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight,
            0, gl.RGBA, gl.FLOAT, null);

        // specular + shininess buffer
        gl.bindTexture(gl.TEXTURE_2D, this.gSpecularShininess.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight,
            0, gl.RGBA, gl.FLOAT, null);

        this.draw_buffers_ext.drawBuffersWEBGL(this.bufs);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, this.bufs[0], gl.TEXTURE_2D, this.gPosition.texture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, this.bufs[1], gl.TEXTURE_2D, this.gNormal.texture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, this.bufs[2], gl.TEXTURE_2D, this.gAmbient.texture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, this.bufs[3], gl.TEXTURE_2D, this.gDiffuse.texture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, this.bufs[4], gl.TEXTURE_2D, this.gSpecularShininess.texture, 0);

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
    };

    this.init = function() {
        this.lightingPassMaterial = new material(anim);
        this.lightingPassMaterial.setShader("light_pass");
        this.lightingPassMaterial.addTexture(this.gPosition, "gPosition");
        this.lightingPassMaterial.addTexture(this.gNormal, "gNormal");
        this.lightingPassMaterial.addTexture(this.gAmbient, "gAmbient");
        this.lightingPassMaterial.addTexture(this.gDiffuse, "gDiffuse");
        this.lightingPassMaterial.addTexture(this.gSpecularShininess, "gSpecularShininess");
        this.lightingPassMaterial.addIntUniform(this.toShow, "toShow");

        this.screenQuad = createQuadrangle(this.lightingPassMaterial);

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
        this.texture_float_linear_ext = gl.getExtension('OES_texture_float_linear');
        if (!this.texture_float_linear_ext) {
            alert("Failed to init 'OES_texture_float_linear' extension.");
        }

        this.bufs = [];
        this.bufs[0] = this.draw_buffers_ext.COLOR_ATTACHMENT0_WEBGL;
        this.bufs[1] = this.draw_buffers_ext.COLOR_ATTACHMENT1_WEBGL;
        this.bufs[2] = this.draw_buffers_ext.COLOR_ATTACHMENT2_WEBGL;
        this.bufs[3] = this.draw_buffers_ext.COLOR_ATTACHMENT3_WEBGL;
        this.bufs[4] = this.draw_buffers_ext.COLOR_ATTACHMENT4_WEBGL;

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.gBuffer);
        this.initBuffers();
        
        return this;
    };

    this.addPointLight = function(light) {
        this.pointLights.push(light);
        
        return this;
    };

    this.geometryPass = function() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.gBuffer);

        if (anim.render.isResized) {
            this.initBuffers();
            anim.render.isResized = false;
        }

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };

    this.sendLightingPassUniforms = function() {
        var lightPos = [], lightDiffuse = [], lightSpecular = [];
        for (var i = 0; i < this.pointLights.length; i++) {
            lightPos[i * 3] =     this.pointLights[i].position.x;
            lightPos[i * 3 + 1] = this.pointLights[i].position.y;
            lightPos[i * 3 + 2] = this.pointLights[i].position.z;

            lightDiffuse[i * 3] =     this.pointLights[i].diffuseIntensity.r;
            lightDiffuse[i * 3 + 1] = this.pointLights[i].diffuseIntensity.g;
            lightDiffuse[i * 3 + 2] = this.pointLights[i].diffuseIntensity.b;

            lightSpecular[i * 3] =     this.pointLights[i].specularIntensity.r;
            lightSpecular[i * 3 + 1] = this.pointLights[i].specularIntensity.g;
            lightSpecular[i * 3 + 2] = this.pointLights[i].specularIntensity.b;
        }
        gl.useProgram(this.lightingPassMaterial.shader.program);
        gl.uniform3fv(gl.getUniformLocation(this.lightingPassMaterial.shader.program, "lightPos"),
            new Float32Array(lightPos));
        gl.uniform3f(gl.getUniformLocation(this.lightingPassMaterial.shader.program, "lightAmbient"),
            this.ambientIntensity.r, this.ambientIntensity.g, this.ambientIntensity.b);
        gl.uniform3fv(gl.getUniformLocation(this.lightingPassMaterial.shader.program, "lightDiffuse"),
            new Float32Array(lightDiffuse));
        gl.uniform3fv(gl.getUniformLocation(this.lightingPassMaterial.shader.program, "lightSpecular"),
            new Float32Array(lightSpecular));
        gl.uniform1i(gl.getUniformLocation(this.lightingPassMaterial.shader.program, "noofLights"),
            this.pointLights.length);
        if (document.getElementById("lighting").checked)
            this.toShow.value = 0;
        else if (document.getElementById("position").checked)
            this.toShow.value = 1;
        else if (document.getElementById("normal").checked)
            this.toShow.value = 2;
        else if (document.getElementById("ambient").checked)
            this.toShow.value = 3;
        else if (document.getElementById("diffuse").checked)
            this.toShow.value = 4;
        else if (document.getElementById("specular").checked)
            this.toShow.value = 5;

    };

    this.lightingPass = function() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.sendLightingPassUniforms();
        this.screenQuad.draw();
    };
    
    return this;
}
