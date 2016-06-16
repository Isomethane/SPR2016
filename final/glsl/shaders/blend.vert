attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 coord;

void main(void) {
    coord = aTextureCoord;
    gl_Position = vec4(aVertexPosition, 1.0);
}
