function unitSkeleton() {

    this.init = function(anim) {
        this.anim = anim;

        this.rotate = 0;

        var colors = [
            new color(0, 1, 0),
            new color(0, 1, 1),
            new color(1, 0, 0),
            new color(1, 0, 1),
            new color(1, 1, 0)
        ];

        var position = new vec(0, 2, 0);
        position.radius = 1.5;
        position.angle = Math.random() * 2 * Math.PI;
        position.speed = Math.random() * 5;
        position.direction = Math.random() > 0.5 ? 1 : -1;
        anim.lightingManager.addPointLight(new pointLight(position, colors[2], colors[2]));
        for (var i = 1; i < 50; i++) {
            position = new vec(0, Math.random() * 13 - 10, 0);
            position.radius = 1.5 + Math.random() * 0.5;
            position.angle = Math.random() * 2 * Math.PI;
            position.speed = Math.random() * 5;
            position.direction = Math.random() > 0.5 ? 1 : -1;
            anim.lightingManager.addPointLight(new pointLight(position, colors[i % 5], colors[i % 5]));
        }

        this.sphere = createSphere(20, 20,
            phongMaterial(anim, new color(0.0, 0.0, 0.0), new color(0.0, 0.0, 0.0), new color(0.0, 0.0, 0.0), 1)
        );
        this.skeleton = createModel("skeleton.json",
            phongMaterial(anim, new color(0.6, 0.6, 0.6), new color(0.7, 0.7, 0.7), new color(1.0, 1.0, 1.0), 50)
        );
    };

    this.response = function() {
        this.rotate = this.anim.time * Math.PI / 50;

        for (var i = 0; i < 50; i++) {
            this.anim.lightingManager.pointLights[i].position.x =
                Math.sin(this.rotate * this.anim.lightingManager.pointLights[i].position.speed *
                    this.anim.lightingManager.pointLights[i].position.direction +
                    this.anim.lightingManager.pointLights[i].position.angle) *
                this.anim.lightingManager.pointLights[i].position.radius;
            this.anim.lightingManager.pointLights[i].position.z =
                Math.cos(this.rotate * this.anim.lightingManager.pointLights[i].position.speed *
                    this.anim.lightingManager.pointLights[i].position.direction +
                    this.anim.lightingManager.pointLights[i].position.angle) *
                this.anim.lightingManager.pointLights[i].position.radius;
        }
    };

    this.render = function() {
        this.anim.matrix.setScale(new vec(1 / 5, 1 / 5, 1 / 5));
        this.anim.matrix.translate(new vec(0, -2, 0));
        if (this.skeleton.isLoaded) {
            this.skeleton.draw();
        }

        for (var i = 0; i < document.getElementById("num_of_lights").value; i++) {
            this.anim.matrix.setScale(new vec(0.1, 0.1, 0.1));
            this.anim.matrix.translate(this.anim.lightingManager.pointLights[i].position);
            this.sphere.material.ambient.set(
                this.anim.lightingManager.pointLights[i].diffuseIntensity.r * 1000,
                this.anim.lightingManager.pointLights[i].diffuseIntensity.g * 1000,
                this.anim.lightingManager.pointLights[i].diffuseIntensity.b * 1000
            );
            this.sphere.draw();
        }
    };
}