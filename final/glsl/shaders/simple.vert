attribute vec3 aVertexPosition;

uniform mat4 proj;
uniform mat4 matrix;

void main(void) {
    gl_Position = proj *  matrix * vec4(aVertexPosition, 1.0);
}