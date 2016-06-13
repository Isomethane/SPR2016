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
uniform int gamma;
uniform int toneMappingType;
uniform float exposure;
uniform float malysheva;

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

    vec3 light = ambient * lightAmbient;

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        lightDir = normalize(lightPos[i] - position);
        reflectDir = reflect(-lightDir, normal);
        light +=
            diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
            specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i];
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

    vec3 light = ambient * lightAmbient;

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        lightDir = normalize(lightPos[i] - position);
        halfwayDir = normalize(lightDir + viewDir);
        light +=
            diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
            specular * pow(max(dot(normal, halfwayDir), 0.0), shininess) * lightSpecular[i];
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
        lightDir = normalize(lightPos[i] - position);
        light += diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i];
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
        lightDir = normalize(lightPos[i] - position);
        reflectDir = reflect(-lightDir, normal);
        light += specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i];
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
        lightDir = normalize(lightPos[i] - position);
        halfwayDir = normalize(lightDir + viewDir);
        light += specular * pow(max(dot(normal, halfwayDir), 0.0), shininess) * lightSpecular[i];
    }
    return vec4(light, 1.0);
}

void main(void) {
    if (toShow == 0)
        gl_FragColor = shadingModel == 0 ? shadePhong() : shadeBlinnPhong();
    else if (toShow == 1)
        gl_FragColor = texture2D(gPosition, coord);
    else if (toShow == 2)
        gl_FragColor = texture2D(gNormal, coord);
    else if (toShow == 3)
        gl_FragColor = vec4(texture2D(gAmbient, coord).xyz * lightAmbient, 1.0);
    else if (toShow == 4)
        gl_FragColor = shadeDiffuse();
    else
        gl_FragColor = shadingModel == 0 ? shadeSpecularPhong() : shadeSpecularBlinnPhong();

    if (toShow == 0 || toShow == 4 || toShow == 5) {
        if (toneMappingType == 1)
            gl_FragColor = vec4(gl_FragColor.rgb / (gl_FragColor.rgb + vec3(1.0)), 1.0);
        else if (toneMappingType == 2)
            gl_FragColor = vec4(vec3(1.0) - exp(-gl_FragColor.rgb * exposure), 1.0);
        else if (toneMappingType == 3)
             gl_FragColor = vec4(gl_FragColor.rgb / vec3(malysheva), 1.0);

        if (gamma == 1) {
            gl_FragColor = vec4(pow(gl_FragColor.rgb, vec3(1.0 / 2.2)), 1.0);
        }
    }
}
