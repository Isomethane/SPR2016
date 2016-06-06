precision mediump float;

uniform float size;

void main(void) {
    int colorX = int(mod(gl_FragCoord.x / size, 2.0));
    int colorY = int(mod(gl_FragCoord.y / size, 2.0));
    int color = colorX + colorY;
    if (color == 2)
        color = 0;
    gl_FragColor = vec4(vec3(color), 1.0);
}