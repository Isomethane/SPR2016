function pointLight(position, diffuseIntensity, specularIntensity) {
    this.position = position.clone();
    
    this.diffuseIntensity = diffuseIntensity;
    this.specularIntensity = specularIntensity;
}