#version 300 es

precision highp float;

uniform vec3 ambient;
uniform vec3 diffuse;
uniform vec3 specular;
uniform float shininess;

in vec4 Position;
in vec3 Normal;

layout (location = 0) out vec3 gPosition;
layout (location = 1) out vec3 gNormal;
layout (location = 2) out vec3 gAmbient;
layout (location = 3) out vec3 gDiffuse;
layout (location = 4) out vec4 gSpecularShininess;

void main(void) {
    gPosition = Position.xyz;
    gNormal = normalize(Normal);
    gAmbient = ambient;
    gDiffuse = diffuse;
    gSpecularShininess = vec4(specular, shininess);
}