precision highp float;

varying vec2 vTextureCoord;

uniform sampler2D fractal;

void main(void) {
    gl_FragColor = texture2D(fractal, vec2(vTextureCoord.s, vTextureCoord.t));
}
