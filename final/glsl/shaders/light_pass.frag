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

varying vec2 coord;

void main(void) {
    if (toShow == 0) {
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
                (diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i] +
                specular * pow(max(dot(reflectDir, viewDir), 0.0), shininess) * lightSpecular[i]);
        }
        gl_FragColor = vec4(light, 1.0);
    }
    else if (toShow == 1)
        gl_FragColor = texture2D(gPosition, coord);
    else if (toShow == 2)
        gl_FragColor = texture2D(gNormal, coord);
    else if (toShow == 3)
        gl_FragColor = vec4(texture2D(gAmbient, coord).xyz * lightAmbient, 1.0);
    else if (toShow == 4) {
        vec3 position = texture2D(gPosition, coord).xyz;
        vec3 normal = texture2D(gNormal, coord).xyz;
        vec3 diffuse = texture2D(gDiffuse, coord).rgb;

        vec3 lightDir;
        vec3 light = vec3(0.0);

        for (int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
            if (i >= noofLights)
                break;
            lightDir = normalize(lightPos[i] - position);
            light += diffuse * max(dot(normal, lightDir), 0.0) * lightDiffuse[i];
        }
        gl_FragColor = vec4(light, 1.0);
    }
    else {
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
         gl_FragColor = vec4(light, 1.0);
     }

}
