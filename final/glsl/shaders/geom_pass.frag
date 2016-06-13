#extension GL_EXT_draw_buffers : require

precision highp float;

varying vec4 vPosition;
varying vec3 vNormal;

uniform vec3 ambient;
uniform vec3 diffuse;
uniform vec3 specular;
uniform float shininess;

void main(void) {
    gl_FragData[0] = vPosition;
    gl_FragData[1] = vec4(normalize(vNormal), 1.0);
    gl_FragData[2] = vec4(ambient, 1.0);
    gl_FragData[3] = vec4(diffuse, 1.0);
    gl_FragData[4] = vec4(specular, shininess);
}