function material(context) {

    this.textures = [];
    this.floatUniforms = [];
    this.matrixUniforms = [];
    
    this.setShader = function(id) {
        this.shader = new shader(context, id);
        this.shader.init();
    };

    this.addTexture = function(texture) {
        this.textures.push(texture);
    };

    this.addFloatUniform = function(float, id) {
        var uniform = context.getUniformLocation(this.shader.program, id);
        uniform.float = float;
        this.floatUniforms.push(uniform);
    }

    this.addMatrixUniform = function(matrix, id) {
        var uniform = context.getUniformLocation(this.shader.program, id);
        uniform.matrix = matrix;
        this.matrixUniforms.push(uniform);
    }
    
    this.apply = function() {
        this.shader.apply();
        for (var i = 0; i < this.floatUniforms.length; i++)
            context.uniform1f(this.floatUniforms[i], this.floatUniforms[i].float.value);
        for (var i = 0; i < this.matrixUniforms.length; i++)
            context.uniformMatrix4fv(this.matrixUniforms[i], false, this.matrixUniforms[i].matrix.m);
        for (var i = 0; i < this.textures.length; i++)
            this.textures[i].apply(i);
    };
}