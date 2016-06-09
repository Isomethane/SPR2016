function unitFantasy() {

    this.colors = [
        0xFF0000,
        0x00FF00,
        0x0000FF,
        0xFFFF00,
        0xFF99FF,
        0xFF7F00,
        0xBB00FF,
        0x73FF00
    ];
    
    this.loadStalin = function() {
        var self = this;
        var loader = new THREE.OBJLoader();
        loader.load('bin/objects/stalin.obj', function(object) {
            self.stalinCamera = new THREE.CubeCamera(0.1, 10000, 300);
            self.scene.add(self.stalinCamera);
            
            var stalinMirrorMaterial = new THREE.MeshBasicMaterial(
                { envMap: self.stalinCamera.renderTarget.texture, side: THREE.DoubleSide } );
            object.traverse( function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = stalinMirrorMaterial;
                    child.material.needsUpdate = true;

                    child.geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                    child.geometry.mergeVertices();
                    child.geometry.computeVertexNormals();
                }
            });

            object.position.set(0, 0, 0);
            object.rotation.y = Math.PI / 4;
            object.scale.set(0.2, 0.2, 0.2);

            self.stalinCamera.position = object.position;
            self.stalinCamera.lookAt(new THREE.Vector3(0, 0, 0));
            self.stalin = object;
            self.scene.add(object);
        });
    };

    this.loadSnails = function() {
        this.snails = [];
        var self = this;
        var loader = new THREE.OBJLoader();
        loader.load('bin/objects/snail.obj', function(object) {
            object.traverse( function (child) {
                if (child instanceof THREE.Mesh) {
                    child.geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                    child.geometry.mergeVertices();
                    child.geometry.computeVertexNormals();
                }
            });
            object.castShadow = object.receiveShadow = true;
            
            for (var i = 0; i < 8; i++) {
                self.snails[i] = new THREE.Object3D();
                self.snails[i] = object.clone();
                var scale = THREE.Math.randFloat(750, 1250);
                self.snails[i].scale.set(scale, scale, scale);
                self.snails[i].position.y = i * 10 - 40 + THREE.Math.randFloat(-2.5, 2.5);
                self.snails[i].angle = THREE.Math.randFloat(0, 2 * Math.PI);
                self.snails[i].radius = THREE.Math.randFloat(35, 50);
                self.snails[i].direction = THREE.Math.randInt(0, 1) * 2 - 1;
                self.snails[i].speed = THREE.Math.randFloat(1 / 7, 1 / 6);

                var color = self.colors[i];
                self.snails[i].traverse( function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshPhongMaterial({color: color, shininess: 500});
                    }
                });
                self.scene.add(self.snails[i]);
            }
        });
    };
    
    this.loadSkybox = function(name) {
        var path = 'bin/textures/sky/' + name + '/';
        var sides = [
            path + 'front.tga',
            path + 'back.tga',
            path + 'top.tga',
            path + 'bottom.tga',
            path + 'right.tga',
            path + 'left.tga'
        ];
        var loader = new THREE.TGALoader();
        var skyTexture = new THREE.CubeTexture();

        loader.load(sides[0], function(texture) {
            skyTexture.images[0] = texture.image;
        });
        loader.load(sides[1], function(texture) {
            skyTexture.images[1] = texture.image;
        });
        loader.load(sides[2], function(texture) {
            skyTexture.images[2] = texture.image;
        });
        loader.load(sides[3], function(texture) {
            skyTexture.images[3] = texture.image;
        });
        loader.load(sides[4], function(texture) {
            skyTexture.images[4] = texture.image;
        });
        loader.load(sides[5], function(texture) {
            skyTexture.images[5] = texture.image;
        });
        skyTexture.format = THREE.RGBFormat;
        skyTexture.needsUpdate = true;

        var skyShader = THREE.ShaderLib["cube"];
        skyShader.uniforms["tCube"].value = skyTexture;
        var skyMaterial = new THREE.ShaderMaterial( {
            fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
            uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
        });

        this.skyBox = new THREE.Mesh(new THREE.CubeGeometry(10000, 10000, 10000), skyMaterial);
        skyMaterial.needsUpdate = true;
        this.scene.add(this.skyBox);
    };
    
    this.init = function(anim) {
        this.anim = anim;
        this.scene = new THREE.Scene();

        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;

        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 10000;
        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add(this.camera);
        this.camera.position.set(150, 0, 150);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.renderer.setClearColor(0xffffff);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMapSoft = true;

        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.container.appendChild(this.renderer.domElement);

        THREEx.WindowResize(this.renderer, this.camera);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);

        this.clock = new THREE.Clock();

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        this.stats.domElement.style.zIndex = 10;
        this.container.appendChild(this.stats.domElement);

        this.dLight0 = new THREE.DirectionalLight(0xffffff);
        this.dLight0.position.set(1, 0, 1);
        this.dLight0.castShadow = true;
        this.scene.add(this.dLight0);

        this.dLight1 = new THREE.DirectionalLight(0xffffff);
        this.dLight1.position.set(0, 50, 0);
        this.dLight1.castShadow = true;
        this.scene.add(this.dLight1);

        this.particleLight0 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 10), new THREE.MeshBasicMaterial({color: 0xeeee00}));
        this.particleLight0.position = this.dLight0.position;
        this.scene.add(this.particleLight0);

        this.particleLight1 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 10), new THREE.MeshBasicMaterial({color: 0xeeee00}));
        this.particleLight1.position = this.dLight1.position;
        this.scene.add(this.particleLight1);

        this.loadSkybox('blue');
        this.loadStalin();
        this.loadSnails();
    };
    
    this.response = function() {
        this.controls.update(this.clock.getDelta());
        this.stats.update();

        var angle = this.anim.time / 7;
        this.dLight0.position.x = this.particleLight0.position.x = Math.sin(angle) * 100;
        this.dLight0.position.z = this.particleLight0.position.z = Math.cos(angle) * 100;

        this.dLight1.position.x = this.particleLight1.position.x = Math.sin(-angle) * 75;
        this.dLight1.position.z = this.particleLight1.position.z = -Math.cos(angle) * 75;

        this.skyBox.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);

        for (var i = 0; i < 8; i++) {
            if (this.snails[i]) {
                angle = this.snails[i].angle + this.snails[i].direction * this.snails[i].speed * this.anim.time;
                this.snails[i].position.x = Math.sin(angle) * this.snails[i].radius;
                this.snails[i].position.z = Math.cos(angle) * this.snails[i].radius;
                this.snails[i].rotation.y = angle + this.snails[i].direction * Math.PI / 2;
            }
        }
    };

    this.render = function() {
        if (this.renderer) {
            if (this.stalin) {
                this.stalin.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.visible = false;
                    }
                });
                this.stalinCamera.updateCubeMap(this.renderer, this.scene);
                this.stalin.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.visible = true;
                    }
                });
            }
            this.renderer.render(this.scene, this.camera);
        }
    };
}
