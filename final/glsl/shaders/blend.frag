#version 300 es

precision highp float;

uniform sampler2D scene;
uniform sampler2D bloom0;
uniform sampler2D bloom1;
uniform sampler2D bloom2;
uniform sampler2D bloom3;

uniform bool isBloom;

uniform bool isBloom0;
uniform bool isBloom1;
uniform bool isBloom2;
uniform bool isBloom3;

uniform int toneMappingType;
uniform float exposure;
uniform float malysheva;

in vec2 TexCoords;

out vec4 fragColor;

void main(void) {
    if (!isBloom)
        fragColor = vec4(texture(scene, TexCoords).rgb, 1.0);
    else
        fragColor = vec4(
            texture(scene, TexCoords).rgb +
            (isBloom0 ? texture(bloom0, TexCoords).rgb : vec3(0.0)) +
            (isBloom1 ? texture(bloom1, TexCoords).rgb : vec3(0.0)) +
            (isBloom2 ? texture(bloom2, TexCoords).rgb : vec3(0.0)) +
            (isBloom3 ? texture(bloom3, TexCoords).rgb : vec3(0.0)),
            1.0
        );

    if (toneMappingType == 1)
        fragColor = vec4(fragColor.rgb / (fragColor.rgb + vec3(1.0)), 1.0);
    else if (toneMappingType == 2)
        fragColor = vec4(vec3(1.0) - exp(-fragColor.rgb * exposure), 1.0);
    else if (toneMappingType == 3)
        fragColor = vec4(fragColor.rgb / vec3(malysheva), 1.0);
}