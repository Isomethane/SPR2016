precision highp float;

uniform vec3 ambient;

void main(void) {
    gl_FragColor = vec4(ambient, 1.0);
}