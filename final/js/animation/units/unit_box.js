function unitBox() {

    this.init = function(anim) {
        this.anim = anim;

        this.rotate = 0;

        anim.lightingManager.addPointLight(new pointLight(new vec(0.0, 4.0, -8.0), new color(1.0, 1.0, 1.0), new color(1.0, 1.0, 1.0)));
        anim.lightingManager.addPointLight(new pointLight(new vec(-1.0, -2.0, -6.0), new color(1.0, 0.0, 0.0), new color(1.0, 0.0, 0.0)));
        anim.lightingManager.addPointLight(new pointLight(new vec(-6.0, 0.0, -9.0), new color(0.0, 0.0, 1.0), new color(0.0, 0.0, 1.0)));
        anim.lightingManager.addPointLight(new pointLight(new vec(6.0, 0.0, -9.0), new color(0.0, 1.0, 0.0), new color(0.0, 1.0, 0.0)));

         for (var i = 0; i < 50; i++) {
            anim.lightingManager.addPointLight(new pointLight(
                new vec(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 17),
                new color(Math.random(), Math.random(), Math.random()),
                new color(Math.random(), Math.random(), Math.random())
            ));
         }

        this.room = createSkyBox(
            phongMaterial(anim, new color(0.0, 0.0, 0.0), new color(0.1, 0.1, 0.1), new color(0.3, 0.3, 0.3), 400)
        );
        this.box = createBox(
            phongMaterial(anim, new color(0.0, 0.0, 1.0), new color(0.5, 0.5, 0.5), new color(0.1, 0.1, 0.1), 10)
        );
        this.sphere = createSphere(30, 30,
            phongMaterial(anim, new color(0.0, 0.8, 0.5), new color(0.7, 0.7, 0.4), new color(1.0, 1.0, 1.0), 500)
        );
        this.teapot = createTeapot(
            phongMaterial(anim, new color(0.7, 0.1, 0.8), new color(0.7, 0.4, 0.7), new color(1.0, 1.0, 1.0), 400)
        );
    };

    this.response = function() {
        this.rotate = this.anim.time * Math.PI / 15;
    };

    this.render = function() {
        this.anim.matrix.setRotateY(Math.PI / 3);
        this.anim.matrix.scale(new vec(10, 10, 10));
        this.anim.matrix.translate(new vec(0, 0, -7));
        this.room.draw();

        this.anim.matrix.setRotateX(this.rotate).rotateY(this.rotate).rotateZ(this.rotate);
        this.anim.matrix.scale(new vec(1.2, 1.2, 1.2));
        this.anim.matrix.translate(new vec(-1, 1, -10));
        this.box.draw();

        this.anim.matrix.setTranslate(new vec(1, Math.sin(this.rotate * 10), -7));
        this.sphere.draw();

        this.anim.matrix.setRotateY(this.rotate * 3).rotateZ(this.rotate * 4).rotateZ(this.rotate * 5);
        this.anim.matrix.scale(new vec(1 / 11, 1 / 11, 1 / 11));
        this.anim.matrix.translate(new vec(Math.sin(this.rotate) * 4, 0, -9 + Math.cos(this.rotate) * 4));
        if (this.teapot.isLoaded) {
            this.teapot.draw();
        }
    };
}