precision highp float;

const int MAX_NUM_OF_LIGHTS = 100;

uniform vec3 ambient;
uniform vec3 diffuse;
uniform vec3 specular;
uniform float shininess;

uniform vec3 cameraPos;

uniform vec3 lightPos[MAX_NUM_OF_LIGHTS];

uniform vec3 lightAmbient;
uniform vec3 lightDiffuse[MAX_NUM_OF_LIGHTS];
uniform vec3 lightSpecular[MAX_NUM_OF_LIGHTS];
uniform int noofLights;

varying vec4 position;
varying vec3 normalVec;

void main(void) {
    vec3 normal = normalize(normalVec);
    vec3 lightDir, reflectDir;
    vec3 viewDir = normalize(cameraPos - position.xyz);

    vec3 light = ambient * lightAmbient;

    for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
        if (i >= noofLights)
            break;
        lightDir = normalize(lightPos[i] - position.xyz);
        reflectDir = reflect(-lightDir, normal);
        light +=
            (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
            specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i]);
    }
    gl_FragColor = vec4(light, 1);
}
