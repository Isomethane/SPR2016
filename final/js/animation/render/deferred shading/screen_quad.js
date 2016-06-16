function screenQuad() {

    this.shaders = [];

    this.textures = [];
    this.textureUniforms = [];
    this.intUniforms = [];
    this.floatUniforms = [];
    this.vecUniforms = [];

    this.init = function() {
        var vertices = [
            -1, -1, 0,
            -1,  1, 0,
             1,  1, 0,
             1, -1, 0
        ];
        this.vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vBuffer.itemSize = 3;
        this.vBuffer.numItems = 4;

        var indices = [
            0, 2, 1, 0, 3, 2
        ];
        this.iBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.iBuffer.itemSize = 1;
        this.iBuffer.numItems = 6;

        var textureCoords = [
            0, 0, 0, 1, 1, 1, 1, 0
        ];
        this.tBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        this.tBuffer.itemSize = 2;
        this.tBuffer.numItems = 4;

        return this;
    };

    this.loadShader = function(id) {
        this.shaders.push(new shader(id).init());
    };

    this.addShader = function(shader) {
        this.shaders.push(shader);
    };

    this.addTexture = function(n, texture, id) {
        this.textures.push(texture);
        var uniform = gl.getUniformLocation(this.shaders[n].program, id);
        uniform.n = n;
        this.textureUniforms.push(uniform);
    };

    this.addIntUniform = function(n, int, id) {
        var uniform = gl.getUniformLocation(this.shaders[n].program, id);
        uniform.int = int;
        uniform.n = n;
        this.intUniforms.push(uniform);
    };

    this.addFloatUniform = function(n, float, id) {
        var uniform = gl.getUniformLocation(this.shaders[n].program, id);
        uniform.float = float;
        uniform.n = n;
        this.floatUniforms.push(uniform);
    };

    this.addVecUniform = function(n, vector, id) {
        var uniform = gl.getUniformLocation(this.shaders[n].program, id);
        uniform.vec = vector;
        uniform.n = n;
        this.vecUniforms.push(uniform);
    };

    this.addPointLightArray = function(n, array) {
        this.pointLightArray = {
            lightPosUniform: gl.getUniformLocation(this.shaders[n].program, "lightPos"),
            lightDiffuseUniform: gl.getUniformLocation(this.shaders[n].program, "lightDiffuse"),
            lightSpecularUniform: gl.getUniformLocation(this.shaders[n].program, "lightSpecular"),
            array: array, n: n
        };
    };

    this.sendUniforms = function(n) {
        for (var i = 0; i < this.intUniforms.length; i++)
            if (this.intUniforms[i].n == n)
                gl.uniform1i(this.intUniforms[i], this.intUniforms[i].int.value);

        for (var i = 0; i < this.floatUniforms.length; i++)
            if (this.floatUniforms[i].n == n)
                gl.uniform1f(this.floatUniforms[i], this.floatUniforms[i].float.value);

        for (var i = 0; i < this.vecUniforms.length; i++)
            if (this.vecUniforms[i].n == n)
                gl.uniform3f(this.vecUniforms[i], this.vecUniforms[i].vec.x, this.vecUniforms[i].vec.y, this.vecUniforms[i].vec.z);

        for (var i = 0; i < this.textures.length; i++)
            if (this.textureUniforms[i].n == n) {
                this.textures[i].apply(i);
                gl.uniform1i(this.textureUniforms[i], i);
            }

        if (this.pointLightArray && this.pointLightArray.n == n) {
            var lightPos = [], lightDiffuse = [], lightSpecular = [];
            for (var i = 0; i < this.pointLightArray.array.length; i++) {
                lightPos[i * 3] =     this.pointLightArray.array[i].position.x;
                lightPos[i * 3 + 1] = this.pointLightArray.array[i].position.y;
                lightPos[i * 3 + 2] = this.pointLightArray.array[i].position.z;

                lightDiffuse[i * 3] =     this.pointLightArray.array[i].diffuseIntensity.r;
                lightDiffuse[i * 3 + 1] = this.pointLightArray.array[i].diffuseIntensity.g;
                lightDiffuse[i * 3 + 2] = this.pointLightArray.array[i].diffuseIntensity.b;

                lightSpecular[i * 3] =     this.pointLightArray.array[i].specularIntensity.r;
                lightSpecular[i * 3 + 1] = this.pointLightArray.array[i].specularIntensity.g;
                lightSpecular[i * 3 + 2] = this.pointLightArray.array[i].specularIntensity.b;
            }
            gl.uniform3fv(this.pointLightArray.lightPosUniform, new Float32Array(lightPos));
            gl.uniform3fv(this.pointLightArray.lightDiffuseUniform, new Float32Array(lightDiffuse));
            gl.uniform3fv(this.pointLightArray.lightSpecularUniform, new Float32Array(lightSpecular));
        }
    };

    this.draw = function(n) {
        this.shaders[n].apply();
        this.sendUniforms(n);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
        gl.vertexAttribPointer(this.shaders[n].program.vertexPositionAttribute, this.vBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
        gl.vertexAttribPointer(this.shaders[n].program.textureCoordAttribute, this.tBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
        gl.drawElements(gl.TRIANGLES, this.iBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    };
}