precision highp float;

uniform sampler2D scene;
uniform sampler2D bloom0;
uniform sampler2D bloom1;
uniform sampler2D bloom2;
uniform sampler2D bloom3;

varying vec2 coord;

uniform bool isBloom;

uniform bool isBloom0;
uniform bool isBloom1;
uniform bool isBloom2;
uniform bool isBloom3;

uniform int toneMappingType;
uniform float exposure;
uniform float malysheva;

float A = 0.15;
float B = 0.50;
float C = 0.10;
float D = 0.20;
float E = 0.02;
float F = 0.30;
float W = 11.2;

vec3 Uncharted2Tonemap(vec3 x) {
    return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

vec4 powerToneMapping(vec3 color) {
    // color *= 16.0;
    float ExposureBias = 2.0;
    vec3 curr = Uncharted2Tonemap(ExposureBias * color);
    vec3 whiteScale = vec3(1.0) / Uncharted2Tonemap(vec3(W));

    vec3 currColor = curr * whiteScale;

    //float3 outColor = pow(currColor, vec3(1.0 / 2.2));
    return vec4(currColor, 1.0);
}

void main(void) {
    if (!isBloom)
        gl_FragColor = vec4(texture2D(scene, coord).rgb, 1.0);
    else
        gl_FragColor = vec4(
            texture2D(scene, coord).rgb +
            (isBloom0 ? texture2D(bloom0, coord).rgb : vec3(0.0)) +
            (isBloom1 ? texture2D(bloom1, coord).rgb : vec3(0.0)) +
            (isBloom2 ? texture2D(bloom2, coord).rgb : vec3(0.0)) +
            (isBloom3 ? texture2D(bloom3, coord).rgb : vec3(0.0)),
            1.0
        );

    if (toneMappingType == 1)
        gl_FragColor = vec4(gl_FragColor.rgb / (gl_FragColor.rgb + vec3(1.0)), 1.0);
    else if (toneMappingType == 2)
        gl_FragColor = vec4(vec3(1.0) - exp(-gl_FragColor.rgb * exposure), 1.0);
    else if (toneMappingType == 3)
        gl_FragColor = vec4(gl_FragColor.rgb / vec3(malysheva), 1.0);
    //else
    //    gl_FragColor = powerToneMapping(gl_FragColor.rgb);
}