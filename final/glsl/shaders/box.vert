attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

uniform mat4 matrix;
uniform mat4 proj;

void main(void) {
    gl_Position = proj * matrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
}
