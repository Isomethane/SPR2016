precision highp float;

uniform sampler2D scene;
uniform sampler2D bloom0;
uniform sampler2D bloom1;
uniform sampler2D bloom2;
uniform sampler2D bloom3;

varying vec2 coord;

void main(void) {
    gl_FragColor = vec4(
        texture2D(scene, coord).rgb +
        (texture2D(bloom0, coord).rgb +
        texture2D(bloom1, coord).rgb +
        texture2D(bloom2, coord).rgb +
        texture2D(bloom3, coord).rgb) / vec3(2.0),
        1.0
    );
}