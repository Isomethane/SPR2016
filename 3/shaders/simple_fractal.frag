precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D gradient;

struct compl {
    float re, im;
};

compl set(float re, float im) {
    compl c;
    c.re = re;
    c.im = im;
    return c;
}

compl copy(compl c) {
    return set(c.re, c.im);
}

compl add(compl a, compl b) {
    return set(a.re + b.re, a.im + b.im);
}

compl sqr(compl c) {
    return set(c.re * c.re - c.im * c.im, 2.0 * c.re * c.im);
}

float norm(compl c) {
    return sqrt(c.re * c.re + c.im * c.im);
}

void main(void) {
    float l = -2.0, r = 1.0, b = -1.5, t = 1.5, m = 2.0, n = 25.0;
    compl c = set(l + vTextureCoord.s * (r - l), b + vTextureCoord.t * (t - b)), z = copy(c);
    float k = 0.0;
    for (int i = 0; i < 5000; i++)
    {
        z = add(sqr(z), c);
        if (norm(z) > m || k >= n)
            break;
        else
            k += 1.0;
    }

    gl_FragColor = texture2D(gradient, vec2(k / n, k / n));
}