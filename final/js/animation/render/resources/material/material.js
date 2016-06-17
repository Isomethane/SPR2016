function material(anim) {
    
    this.textures = [];
    this.textureUniforms = [];

    this.intUniforms = [];
    this.floatUniforms = [];
    this.vecUniforms = [];
    
    this.setShader = function(id) {
        this.shader = new shader(id);
        this.shader.init();
    };

    this.addTexture = function(texture, id) {
        this.textures.push(texture);
        var uniform = gl.getUniformLocation(this.shader.program, id);
        this.textureUniforms.push(uniform);
    };

    this.addIntUniform = function(int, id) {
        var uniform = gl.getUniformLocation(this.shader.program, id);
        uniform.int = int;
        this.intUniforms.push(uniform);
    };
    
    this.addFloatUniform = function(float, id) {
        var uniform = gl.getUniformLocation(this.shader.program, id);
        uniform.float = float;
        this.floatUniforms.push(uniform);
    };

    this.addVecUniform = function(vector, id) {
        var uniform = gl.getUniformLocation(this.shader.program, id);
        uniform.vec = vector;
        this.vecUniforms.push(uniform);
    };
    
    this.sendUniforms = function() {
        if (gl.getUniformLocation(this.shader.program, "proj") != -1)
            gl.uniformMatrix4fv(gl.getUniformLocation(this.shader.program, "proj"), false, anim.camera.proj.m);

        if (gl.getUniformLocation(this.shader.program, "view") != -1)
            gl.uniformMatrix4fv(gl.getUniformLocation(this.shader.program, "view"), false, anim.camera.view.m);

        if (gl.getUniformLocation(this.shader.program, "matrix") != -1)
            gl.uniformMatrix4fv(gl.getUniformLocation(this.shader.program, "matrix"), false, anim.matrix.m);

        if (gl.getUniformLocation(this.shader.program, "normalMatrix") != -1)
            gl.uniformMatrix3fv(gl.getUniformLocation(this.shader.program, "normalMatrix"),
                false, new matr3x3().invert4x4(anim.matrix).transpose().m);

        for (var i = 0; i < this.intUniforms.length; i++)
            gl.uniform1i(this.intUniforms[i], this.intUniforms[i].int.value);
        
        for (var i = 0; i < this.floatUniforms.length; i++)
            gl.uniform1f(this.floatUniforms[i], this.floatUniforms[i].float.value);

        for (var i = 0; i < this.vecUniforms.length; i++)
            gl.uniform3f(this.vecUniforms[i],
                this.vecUniforms[i].vec.x, this.vecUniforms[i].vec.y, this.vecUniforms[i].vec.z);

        for (var i = 0; i < this.textures.length; i++) {
            this.textures[i].apply(i);
            gl.uniform1i(this.textureUniforms[i], i);
        }
    };

    this.apply = function() {
        this.shader.apply();
        this.sendUniforms();
    };
}