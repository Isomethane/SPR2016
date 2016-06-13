attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

varying vec4 position;
varying vec3 normalVec;

uniform mat4 proj;
uniform mat4 matrix;
uniform mat3 normalMatrix;

void main(void) {
    position = matrix * vec4(aVertexPosition, 1.0);
    normalVec = normalMatrix * aVertexNormal;
    gl_Position = proj * position;
}
