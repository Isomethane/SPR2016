attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 proj;
uniform mat4 view;
uniform mat4 matrix;
uniform mat3 normalMatrix;

varying vec4 vPosition;
varying vec3 vNormal;

void main(void) {
    vPosition = matrix * vec4(aVertexPosition, 1.0);
    vNormal = normalMatrix * aVertexNormal;

    gl_Position = proj * view * vPosition;
}