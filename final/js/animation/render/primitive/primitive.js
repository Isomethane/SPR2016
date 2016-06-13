function primitive() {

    this.vertices = null;
    this.indices = null;
    this.normals = null;
    this.colors = null;
    this.textureCoords = null;
    
    this.initBuffers = function() {
        if (this.vertices != null) {
            this.vBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
            this.vBuffer.itemSize = 3;
            this.vBuffer.numItems = this.vertices.length / 3;
        }

        if (this.indices != null) {
            this.iBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
            this.iBuffer.itemSize = 1;
            this.iBuffer.numItems = this.indices.length;
        }

        if (this.normals != null) {
            this.nBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
            this.nBuffer.itemSize = 3;
            this.nBuffer.numItems = this.normals.length / 3;
        }

        if (this.colors != null) {
            this.cBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.cBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
            this.cBuffer.itemSize = 4;
            this.cBuffer.numItems = this.colors.length / 4;
        }

        if (this.textureCoords != null) {
            this.tBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), gl.STATIC_DRAW);
            this.tBuffer.itemSize = 2;
            this.tBuffer.numItems = this.textureCoords.length / 2;
        }
    };
    
    this.create = function(vertices, indices, normals, colors, textureCoords, material) {
        this.vertices = vertices;
        this.indices = indices;
        this.normals = normals;
        this.colors = colors;
        this.textureCoords = textureCoords;
        this.material = material;
        this.initBuffers();
    };
    
    this.draw = function() {
        this.material.apply();

        if (this.vertices != null) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
            if (gl.getAttribLocation(this.material.shader.program, "aVertexPosition") != -1)
                gl.vertexAttribPointer(this.material.shader.program.vertexPositionAttribute,
                                            this.vBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }

        if (this.normals != null) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
            if (gl.getAttribLocation(this.material.shader.program, "aVertexNormal") != -1)
                gl.vertexAttribPointer(this.material.shader.program.vertexNormalAttribute,
                                            this.nBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        
        if (this.colors != null) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.cBuffer);
            if (gl.getAttribLocation(this.material.shader.program, "aVertexColor") != -1)
                gl.vertexAttribPointer(this.material.shader.program.vertexColorAttribute,
                                            this.cBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        if (this.textureCoords != null) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
            if (gl.getAttribLocation(this.material.shader.program, "aTextureCoord") != -1)
                gl.vertexAttribPointer(this.material.shader.program.textureCoordAttribute,
                    this.tBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        if (this.indices != null) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
            gl.drawElements(gl.TRIANGLES, this.iBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        else
            gl.drawArrays(gl.TRIANGLES, 0, this.vBuffer.numItems);
    };
}