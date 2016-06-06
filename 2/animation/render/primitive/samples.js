function createTriangle(context, p0, p1, p2, material) {
    var vertices = [
        p0.x, p0.y, p0.z,
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
    ];
    var indices = [
        0, 1, 2
    ];
    var triangle = new primitive(context);
    triangle.create(vertices, indices, material);
    return triangle;
}

function createQuadrangle(context, p0, p1, p2, p3, material) {
    var vertices = [
        p0.x, p0.y, p0.z,
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z
    ];
    var indices = [
        0, 2, 1, 0, 3, 2
    ];
    var textureCoords = [
        0, 0, 0, 1, 1, 1, 1, 0
    ];
    var triangle = new primitive(context);
    triangle.create(vertices, indices, material, textureCoords);
    return triangle;
}