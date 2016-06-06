precision highp float;

varying vec2 coord;

uniform sampler2D gradient;

uniform float l;
uniform float r;
uniform float b;
uniform float t;

uniform float m;
uniform float n;

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
    compl c = set(l + coord.s * (r - l), b + coord.t * (t - b)), z = copy(c);
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