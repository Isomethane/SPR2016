function shader(id) {

    this.get = function(id, extension)
    {
        var str = "";
        var client = new XMLHttpRequest();
        client.open('GET', id + extension, false);
        client.onreadystatechange = function() {
            str = client.responseText;
        };
        client.send();

        var shader;
        if (extension == ".frag")
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        else if (extension == ".vert")
            shader = gl.createShader(gl.VERTEX_SHADER);
        else
            return null;

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    };

    this.init = function() {
        this.fragmentShader = this.get("glsl/shaders/" + id, ".frag");
        this.vertexShader = this.get("glsl/shaders/" + id, ".vert");

        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
            alert("Could not initialise shader " + id);
        
        return this;
    };

    this.apply = function() {
        gl.useProgram(this.program);

        if ((this.program.vertexPositionAttribute = gl.getAttribLocation(this.program, "position")) != -1)
            gl.enableVertexAttribArray(this.program.vertexPositionAttribute);

        if ((this.program.vertexNormalAttribute = gl.getAttribLocation(this.program, "normal")) != -1)
            gl.enableVertexAttribArray(this.program.vertexNormalAttribute);
        
        if ((this.program.vertexColorAttribute = gl.getAttribLocation(this.program, "color")) != -1)
            gl.enableVertexAttribArray(this.program.vertexColorAttribute);

        if ((this.program.textureCoordAttribute = gl.getAttribLocation(this.program, "texCoords")) != -1)
            gl.enableVertexAttribArray(this.program.textureCoordAttribute);
    };
    
    return this;
}