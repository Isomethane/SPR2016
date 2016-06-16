function lightingManager(anim) {
    
    this.pointLights = [];
    this.ambientIntensity = new color(0.4, 0.4, 0.4);
    this.noofLights = {value: 0};
    
    this.geomManager = new geometryPassManager().init();
    this.lightManager = new lightingPassManager().init();
    this.postProcManager = new postProcessingManager().init();

    this.toShow = {value: 0};
    this.shadingModel = {value: 0};
    this.gamma = {value: 0};
    this.toneMappingType = {value: 0};
    this.exposure = {value: 10};
    this.malysheva = {value: 10};

    this.init = function() {
        this.screenQuad = new screenQuad().init();
        this.screenQuad.loadShader("light_pass");
        this.screenQuad.loadShader("bloom");
        this.screenQuad.loadShader("blend");
        
        this.screenQuad.addTexture(0, this.geomManager.gPosition, "gPosition");
        this.screenQuad.addTexture(0, this.geomManager.gNormal, "gNormal");
        this.screenQuad.addTexture(0, this.geomManager.gAmbient, "gAmbient");
        this.screenQuad.addTexture(0, this.geomManager.gDiffuse, "gDiffuse");
        this.screenQuad.addTexture(0, this.geomManager.gSpecularShininess, "gSpecularShininess");

        this.screenQuad.addVecUniform(0, this.ambientIntensity.toVec(), "lightAmbient");
        this.screenQuad.addIntUniform(0, this.noofLights, "noofLights");
        this.screenQuad.addPointLightArray(0, this.pointLights);

        this.screenQuad.addIntUniform(0, this.toShow, "toShow");
        this.screenQuad.addIntUniform(0, this.shadingModel, "shadingModel");
        this.screenQuad.addIntUniform(0, this.gamma, "gamma");
        this.screenQuad.addIntUniform(0, this.toneMappingType, "toneMappingType");
        this.screenQuad.addFloatUniform(0, this.exposure, "exposure");
        this.screenQuad.addFloatUniform(0, this.malysheva, "malysheva");

        return this;
    };

    this.addPointLight = function(light) {
        this.pointLights.push(light);
        
        return this;
    };

    this.geometryPass = function() {
        this.geomManager.use(gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    this.updateLightingPassUniforms = function() {

        this.noofLights.value = document.getElementById("num_of_lights").value;

        if (document.getElementById("lighting").checked)
            this.toShow.value = 0;
        else if (document.getElementById("position").checked)
            this.toShow.value = 1;
        else if (document.getElementById("normal").checked)
            this.toShow.value = 2;
        else if (document.getElementById("ambient").checked)
            this.toShow.value = 3;
        else if (document.getElementById("diffuse").checked)
            this.toShow.value = 4;
        else if (document.getElementById("specular").checked)
            this.toShow.value = 5;
        
        if (document.getElementById("phong").checked)
            this.shadingModel.value = 0;
        else
            this.shadingModel.value = 1;

        if (document.getElementById("gamma_off").checked)
            this.gamma.value = 0;
        else
            this.gamma.value = 1;

        if (document.getElementById("tone_mapping_off").checked)
            this.toneMappingType.value = 0;
        else if (document.getElementById("tone_mapping_reinhard").checked)
            this.toneMappingType.value = 1;
        else if (document.getElementById("tone_mapping_exposure").checked)
            this.toneMappingType.value = 2;
        else
            this.toneMappingType.value = 3;
        
        this.exposure.value = document.getElementById("exposure_value").value / 10;
        this.malysheva.value = document.getElementById("malysheva_value").value / 10;
    };

    this.lightingPass = function() {
        this.lightManager.use(gl.drawingBufferWidth, gl.drawingBufferHeight);
        this.updateLightingPassUniforms();
        this.screenQuad.draw(0);
        this.postProcManager.bloom(gl.drawingBufferWidth, gl.drawingBufferHeight,
            this.screenQuad, this.lightManager.textures);
    };
    
    return this;
}
