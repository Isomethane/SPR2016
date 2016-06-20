#version 300 es

uniform mat4 proj;
uniform mat4 view;
uniform mat4 matrix;
uniform mat3 normalMatrix;

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;

out vec4 Position;
out vec3 Normal;

void main(void) {
    Position = matrix * vec4(position, 1.0);
    Normal = normalMatrix * normal;

    gl_Position = proj * view * Position;
}
