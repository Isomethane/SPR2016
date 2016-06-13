function phongMaterial(anim, ambient, diffuse, specular, shininess) {

    var mtl = new material(anim);
    mtl.setShader("geom_pass");
    
    mtl.addVecUniform(ambient.toVec(), "ambient");
    mtl.addVecUniform(diffuse.toVec(), "diffuse");
    mtl.addVecUniform(specular.toVec(), "specular");
    mtl.addFloatUniform({value: shininess}, "shininess");

    return mtl;
}
