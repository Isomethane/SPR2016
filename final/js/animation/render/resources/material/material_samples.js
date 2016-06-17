function phongMaterial(anim, ambient, diffuse, specular, shininess) {

    var mtl = new material(anim);
    mtl.setShader("geom_pass");

    mtl.ambient = ambient.toVec();
    mtl.diffuse = diffuse.toVec();
    mtl.specular = specular.toVec();
    mtl.shininess = {value: shininess};
    
    mtl.addVecUniform(mtl.ambient, "ambient");
    mtl.addVecUniform(mtl.diffuse, "diffuse");
    mtl.addVecUniform(mtl.specular, "specular");
    mtl.addFloatUniform(mtl.shininess, "shininess");

    return mtl;
}
