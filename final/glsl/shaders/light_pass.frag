#extension GL_EXT_draw_buffers : require

precision highp float;

uniform vec3 cameraPos;

uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAmbient;
uniform sampler2D gDiffuse;
uniform sampler2D gSpecularShininess;

const int MAX_NUM_OF_LIGHTS = 100;

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

varying vec2 coord;

vec4 shadePhong(void) {
    vec3 position = texture2D(gPosition, coord).xyz;
    vec3 normal = texture2D(gNormal, coord).xyz;
    vec3 ambient = texture2D(gAmbient, coord).rgb;
    vec3 diffuse = texture2D(gDiffuse, coord).rgb;
    vec3 specular = texture2D(gSpecularShininess, coord).rgb;
    float shininess = texture2D(gSpecularShininess, coord).a;

    vec3 lightDir, reflectDir;
    vec3 viewDir = normalize(cameraPos - position.xyz);

    if (ambient.x == 1000.0 || ambient.y == 1000.0 || ambient.z == 1000.0)
        return vec4(ambient.x / 1000.0 * brightness, ambient.y / 1000.0 * brightness, ambient.z / 1000.0 * brightness, 1.0);

    vec3 light = ambient * lightAmbient;

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        reflectDir = reflect(-lightDir, normal);
        light +=
            (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
            specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return vec4(light, 1.0);
}

vec4 shadeBlinnPhong(void) {
    vec3 position = texture2D(gPosition, coord).xyz;
    vec3 normal = texture2D(gNormal, coord).xyz;
    vec3 ambient = texture2D(gAmbient, coord).rgb;
    vec3 diffuse = texture2D(gDiffuse, coord).rgb;
    vec3 specular = texture2D(gSpecularShininess, coord).rgb;
    float shininess = texture2D(gSpecularShininess, coord).a;

    vec3 lightDir, halfwayDir;
    vec3 viewDir = normalize(cameraPos - position.xyz);

    if (ambient.x == 1000.0 || ambient.y == 1000.0 || ambient.z == 1000.0)
        return vec4(ambient.x / 1000.0 * brightness, ambient.y / 1000.0 * brightness, ambient.z / 1000.0 * brightness, 1.0);

    vec3 light = ambient * lightAmbient;

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        halfwayDir = normalize(lightDir + viewDir);
        light +=
            (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
            specular * pow(max(dot(normal, halfwayDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return vec4(light, 1.0);
}

vec4 shadeDiffuse(void) {
    vec3 position = texture2D(gPosition, coord).xyz;
    vec3 normal = texture2D(gNormal, coord).xyz;
    vec3 diffuse = texture2D(gDiffuse, coord).rgb;

    vec3 lightDir, halfwayDir;

    vec3 light = vec3(0.0);

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        light += (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i]) * (radius - distance) / radius * brightness;
    }
    return vec4(light, 1.0);
}

vec4 shadeSpecularPhong(void) {
    vec3 position = texture2D(gPosition, coord).xyz;
    vec3 normal = texture2D(gNormal, coord).xyz;
    vec3 specular = texture2D(gSpecularShininess, coord).rgb;
    float shininess = texture2D(gSpecularShininess, coord).a;

    vec3 lightDir, reflectDir;
    vec3 viewDir = normalize(cameraPos - position.xyz);

    vec3 light = vec3(0.0);

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        reflectDir = reflect(-lightDir, normal);
        light += (specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return vec4(light, 1.0);
}

vec4 shadeSpecularBlinnPhong(void) {
    vec3 position = texture2D(gPosition, coord).xyz;
    vec3 normal = texture2D(gNormal, coord).xyz;
    vec3 specular = texture2D(gSpecularShininess, coord).rgb;
    float shininess = texture2D(gSpecularShininess, coord).a;

    vec3 lightDir, halfwayDir;
    vec3 viewDir = normalize(cameraPos - position.xyz);

    vec3 light = vec3(0.0);

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        float distance = length(lightPos[i] - position);
        if (distance > radius)
            continue;
        lightDir = normalize(lightPos[i] - position);
        halfwayDir = normalize(lightDir + viewDir);
        light += (specular * pow(max(dot(normal, halfwayDir), 0.0), shininess) * lightSpecular[i]) * (radius - distance) / radius * brightness;
    }
    return vec4(light, 1.0);
}

void main(void) {
    if (toShow == 0)
        gl_FragData[0] = shadingModel == 0 ? shadePhong() : shadeBlinnPhong();
    else if (toShow == 1)
        gl_FragData[0] = texture2D(gPosition, coord);
    else if (toShow == 2)
        gl_FragData[0] = vec4(abs(texture2D(gNormal, coord).x), abs(texture2D(gNormal, coord).y), abs(texture2D(gNormal, coord).z), 1.0);
    else if (toShow == 3)
        gl_FragData[0] = vec4(texture2D(gAmbient, coord).xyz * lightAmbient, 1.0);
    else if (toShow == 4)
        gl_FragData[0] = shadeDiffuse();
    else
        gl_FragData[0] = shadingModel == 0 ? shadeSpecularPhong() : shadeSpecularBlinnPhong();


    float brightness = dot(gl_FragData[0].rgb, vec3(0.2126, 0.7152, 0.0722));
    if (brightness > threshold)
        gl_FragData[1] = vec4(gl_FragData[0].rgb, 1.0);
}
