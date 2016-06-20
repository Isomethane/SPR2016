#version 300 es

precision highp float;

uniform sampler2D image;
uniform bool horizontal;

uniform float width;
uniform float height;

in vec2 TexCoords;

out vec3 fragColor;

float weight[5] = float[] (0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);

void main()
{
    vec2 tex_offset = vec2(1.0 / width, 1.0 / height);

    vec3 result = texture(image, TexCoords).rgb * weight[0];
    if (horizontal) {
        for (int i = 1; i < 5; i++) {
            result += texture(image, TexCoords + vec2(tex_offset.x * float(i), 0.0)).rgb * weight[i];
            result += texture(image, TexCoords - vec2(tex_offset.x * float(i), 0.0)).rgb * weight[i];
        }
    }
    else {
        for (int i = 1; i < 5; i++) {
            result += texture(image, TexCoords + vec2(0.0, tex_offset.y * float(i))).rgb * weight[i];
            result += texture(image, TexCoords - vec2(0.0, tex_offset.y * float(i))).rgb * weight[i];
        }
    }
    fragColor = result;
}