function primitive(context) {

    this.vertices = null;
    this.indices = null;
    this.textureCoords = null;
    
    this.initBuffers = function() {
        if (this.vertices != null) {
            this.vBuffer = context.createBuffer();
            context.bindBuffer(context.ARRAY_BUFFER, this.vBuffer);
            context.bufferData(context.ARRAY_BUFFER, new Float32Array(this.vertices), context.STATIC_DRAW);
            this.vBuffer.itemSize = 3;
            this.vBuffer.numItems = this.vertices.length / 3;
        }

        if (this.indices != null) {
            this.iBuffer = context.createBuffer();
            context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.iBuffer);
            context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), context.STATIC_DRAW);
            this.iBuffer.itemSize = 1;
            this.iBuffer.numItems = this.indices.length;
        }

        if (this.textureCoords != null) {
            this.tBuffer = context.createBuffer();
            context.bindBuffer(context.ARRAY_BUFFER, this.tBuffer);
            context.bufferData(context.ARRAY_BUFFER, new Float32Array(this.textureCoords), context.STATIC_DRAW);
            this.tBuffer.itemSize = 2;
            this.tBuffer.numItems = this.textureCoords.length / 2;
        }
    };
    
    this.create = function(vertices, indices, material, textureCoords) {
        this.vertices = vertices;
        this.indices = indices;
        this.material = material;
        this.textureCoords = textureCoords;
        this.initBuffers();
    };
    
    this.draw = function() {
        this.material.apply();
        context.bindBuffer(context.ARRAY_BUFFER, this.vBuffer);
        context.vertexAttribPointer(this.material.shader.program.vertexPositionAttribute,
                                    this.vBuffer.itemSize, context.FLOAT, false, 0, 0);

        if (this.textureCoords != null) {
            context.bindBuffer(context.ARRAY_BUFFER, this.tBuffer);
            if (context.getAttribLocation(this.material.shader.program, "aTextureCoord") != -1)
                context.vertexAttribPointer(this.material.shader.program.textureCoordAttribute,
                                            this.tBuffer.itemSize, context.FLOAT, false, 0, 0);
        }
        if (this.indices != null) {
            context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.iBuffer);
            context.drawElements(context.TRIANGLES, this.iBuffer.numItems, context.UNSIGNED_SHORT, 0);
        }
        else
            context.drawArrays(context.TRIANGLES, 0, this.vBuffer.numItems);
    };
}