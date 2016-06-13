precision highp float;

varying vec2 vTextureCoord;

uniform sampler2D gradient;

void main(void) {
    gl_FragColor = texture2D(gradient, vec2(vTextureCoord.s, vTextureCoord.t));
}