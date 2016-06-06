function shader(context, id) {

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
            shader = context.createShader(context.FRAGMENT_SHADER);
        else if (extension == ".vert")
            shader = context.createShader(context.VERTEX_SHADER);
        else
            return null;

        context.shaderSource(shader, str);
        context.compileShader(shader);

        if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
            alert(context.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    };

    this.init = function() {
        this.fragmentShader = this.get("shaders/" + id, ".frag");
        this.vertexShader = this.get("shaders/" + id, ".vert");

        this.program = context.createProgram();
        context.attachShader(this.program, this.vertexShader);
        context.attachShader(this.program, this.fragmentShader);
        context.linkProgram(this.program);

        if (!context.getProgramParameter(this.program, context.LINK_STATUS))
            alert("Could not initialise shaders.");
    };

    this.apply = function() {
        context.useProgram(this.program);

        if ((this.program.vertexPositionAttribute = context.getAttribLocation(this.program, "aVertexPosition")) != -1)
            context.enableVertexAttribArray(this.program.vertexPositionAttribute);

        if ((this.program.textureCoordAttribute = context.getAttribLocation(this.program, "aTextureCoord")) != -1)
            context.enableVertexAttribArray(this.program.textureCoordAttribute);
    };
}