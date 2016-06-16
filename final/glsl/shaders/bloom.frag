precision highp float;

uniform sampler2D image;
uniform bool horizontal;

uniform float width;
uniform float height;

varying vec2 coord;

void main()
{
    float weight[5];
    weight[0] = 0.227027;
    weight[1] = 0.1945946;
    weight[2] = 0.1216216;
    weight[3] = 0.054054;
    weight[4] = 0.016216;

    vec2 tex_offset = vec2(1.0 / width, 1.0 / height);
    vec3 result = texture2D(image, coord).rgb * weight[0];
    if (horizontal) {
        for (int i = 1; i < 5; i++) {
            result += texture2D(image, coord + vec2(tex_offset.x * float(i), 0.0)).rgb * weight[i];
            result += texture2D(image, coord - vec2(tex_offset.x * float(i), 0.0)).rgb * weight[i];
        }
    }
    else {
        for (int i = 1; i < 5; i++) {
            result += texture2D(image, coord + vec2(0.0, tex_offset.y * float(i))).rgb * weight[i];
            result += texture2D(image, coord - vec2(0.0, tex_offset.y * float(i))).rgb * weight[i];
        }
    }
    gl_FragColor = vec4(result, 1.0);
}