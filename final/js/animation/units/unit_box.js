function unitBox() {

    this.init = function(anim) {
        this.anim = anim;

        this.rotate = 0;

        anim.lightingManager.addPointLight(new pointLight(new vec(0.0, 4.0, -8.0), new color(1.0, 1.0, 1.0), new color(1.0, 1.0, 1.0)));
        anim.lightingManager.addPointLight(new pointLight(new vec(-1.0, -2.0, -6.0), new color(1.0, 0.0, 0.0), new color(1.0, 0.0, 0.0)));
        anim.lightingManager.addPointLight(new pointLight(new vec(-6.0, 0.0, -9.0), new color(0.0, 0.0, 1.0), new color(0.0, 0.0, 1.0)));
        anim.lightingManager.addPointLight(new pointLight(new vec(6.0, 0.0, -9.0), new color(0.0, 1.0, 0.0), new color(0.0, 1.0, 0.0)));

        /*
         for (var i = 0; i < 50; i++) {
            anim.lightingManager.addPointLight(new pointLight(
                new vec((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 10, (Math.random() - 1) * 7),
                new color(Math.random(), Math.random(), Math.random()),
                new color(Math.random(), Math.random(), Math.random())
            ));
         }
         */

        var bMtl = phongMaterial(anim, new color(0.0, 0.0, 1.0), new color(0.5, 0.5, 0.5), new color(0.6, 0.6, 0.6), 10);
        var sMtl = phongMaterial(anim, new color(0.0, 0.8, 0.5), new color(0.7, 0.7, 0.4), new color(1.0, 1.0, 1.0), 500);
        var tMtl = phongMaterial(anim, new color(0.7, 0.1, 0.8), new color(0.7, 0.4, 0.7), new color(1.0, 1.0, 1.0), 400);

        this.box = createBox(bMtl);
        this.sphere = createSphere(30, 30, sMtl);
        this.teapot = createTeapot(tMtl);
    };

    this.response = function() {
        this.rotate = this.anim.time * Math.PI / 15;
    };

    this.render = function() {
        this.anim.matrix.setRotateX(this.rotate).rotateY(this.rotate).rotateZ(this.rotate);
        this.anim.matrix.scale(new vec(1.2, 1.2, 1.2));
        this.anim.matrix.translate(new vec(-1, 1, -10));
        this.box.draw();

        this.anim.matrix.setTranslate(new vec(1, Math.sin(this.rotate * 10), -7));
        this.sphere.draw();

        this.anim.matrix.setRotateY(this.rotate * 3).rotateZ(this.rotate * 4).rotateZ(this.rotate * 5);
        this.anim.matrix.scale(new vec(1 / 10, 1 / 10, 1 / 10));
        this.anim.matrix.translate(new vec(Math.sin(this.rotate) * 4, 0, -9 + Math.cos(this.rotate) * 4));
        if (this.teapot.isLoaded) {
            this.teapot.draw();
        }
    };
}