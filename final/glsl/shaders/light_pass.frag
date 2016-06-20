#version 300 es

const int MAX_NUM_OF_LIGHTS = 100;

precision highp float;

uniform vec3 cameraPos;

uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAmbient;
uniform sampler2D gDiffuse;
uniform sampler2D gSpecularShininess;

uniform vec3 lightPos[MAX_NUM_OF_LIGHTS];

uniform vec3 lightAmbient;
uniform vec3 lightDiffuse[MAX_NUM_OF_LIGHTS];
uniform vec3 lightSpecular[MAX_NUM_OF_LIGHTS];
uniform int noofLights;

uniform int toShow;
uniform int shadingModel;

uniform float threshold;

uniform float radius;
uniform float brightness;

in vec2 TexCoords;

layout (location = 0) out vec3 lColor;
layout (location = 1) out vec3 lBrightColor;

vec3 shadePhong(void) {
    vec3 position = texture(gPosition, TexCoords).xyz;
    vec3 normal = texture(gNormal, TexCoords).xyz;
    vec3 ambient = texture(gAmbient, TexCoords).rgb;
    vec3 diffuse = texture(gDiffuse, TexCoords).rgb;
    vec3 specular = texture(gSpecularShininess, TexCoords).rgb;
    float shininess = texture(gSpecularShininess, TexCoords).a;

    vec3 lightDir, reflectDir;
    vec3 viewDir = normalize(cameraPos - position);

    if (ambient.r == 1000.0 || ambient.g == 1000.0 || ambient.b == 1000.0)
        return ambient / vec3(1000.0) * vec3(brightness * 5.0);

    vec3 light = ambient * lightAmbient;

    for (int i = 0; i < noofLights; i++) {
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        reflectDir = reflect(-lightDir, normal);
        light +=
            (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
            specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return light;
}

vec3 shadeBlinnPhong(void) {
    vec3 position = texture(gPosition, TexCoords).xyz;
    vec3 normal = texture(gNormal, TexCoords).xyz;
    vec3 ambient = texture(gAmbient, TexCoords).rgb;
    vec3 diffuse = texture(gDiffuse, TexCoords).rgb;
    vec3 specular = texture(gSpecularShininess, TexCoords).rgb;
    float shininess = texture(gSpecularShininess, TexCoords).a;

    vec3 lightDir, halfwayDir;
    vec3 viewDir = normalize(cameraPos - position);

    if (ambient.r == 1000.0 || ambient.g == 1000.0 || ambient.b == 1000.0)
        return ambient / vec3(1000.0) * vec3(brightness * 5.0);

    vec3 light = ambient * lightAmbient;

    for (int i = 0; i < noofLights; i++) {
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        halfwayDir = normalize(lightDir + viewDir);
        light +=
            (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
            specular * pow(max(dot(normal, halfwayDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return light;
}

vec3 shadeDiffuse(void) {
    vec3 position = texture(gPosition, TexCoords).xyz;
    vec3 normal = texture(gNormal, TexCoords).xyz;
    vec3 diffuse = texture(gDiffuse, TexCoords).rgb;

    vec3 lightDir, halfwayDir;

    vec3 light = vec3(0.0);

    for (int i = 0; i < noofLights; i++) {
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        light += (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i]) * (radius - distance) / radius * brightness;
    }
    return light;
}

vec3 shadeSpecularPhong(void) {
    vec3 position = texture(gPosition, TexCoords).xyz;
    vec3 normal = texture(gNormal, TexCoords).xyz;
    vec3 specular = texture(gSpecularShininess, TexCoords).rgb;
    float shininess = texture(gSpecularShininess, TexCoords).a;

    vec3 lightDir, reflectDir;
    vec3 viewDir = normalize(cameraPos - position);

    vec3 light = vec3(0.0);

    for (int i = 0; i < noofLights; i++) {
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        reflectDir = reflect(-lightDir, normal);
        light += (specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return light;
}

vec3 shadeSpecularBlinnPhong(void) {
    vec3 position = texture(gPosition, TexCoords).xyz;
    vec3 normal = texture(gNormal, TexCoords).xyz;
    vec3 specular = texture(gSpecularShininess, TexCoords).rgb;
    float shininess = texture(gSpecularShininess, TexCoords).a;

    vec3 lightDir, halfwayDir;
    vec3 viewDir = normalize(cameraPos - position);

    vec3 light = vec3(0.0);

    for (int i = 0; i < noofLights; i++) {
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        halfwayDir = normalize(lightDir + viewDir);
        light += (specular * pow(max(dot(normal, halfwayDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return light;
}

void main(void) {
    if (toShow == 0)
        lColor = shadingModel == 0 ? shadePhong() : shadeBlinnPhong();
    else if (toShow == 1)
        lColor = texture(gPosition, TexCoords).xyz;
    else if (toShow == 2)
        lColor = abs(texture(gNormal, TexCoords).xyz);
    else if (toShow == 3)
        lColor = texture(gAmbient, TexCoords).xyz * lightAmbient;
    else if (toShow == 4)
        lColor = shadeDiffuse();
    else
        lColor = shadingModel == 0 ? shadeSpecularPhong() : shadeSpecularBlinnPhong();

    float brightness = dot(lColor, vec3(0.2126, 0.7152, 0.0722));
    if (brightness > threshold)
        lBrightColor = lColor;
}
