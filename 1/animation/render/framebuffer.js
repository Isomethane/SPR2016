function framebuffer(context, texture) {

    this.init = function(w, h, id) {
        this.framebuffer = context.createFramebuffer();
        context.bindFramebuffer(context.FRAMEBUFFER, this.framebuffer);
        this.framebuffer.width = w;
        this.framebuffer.height = h;

        texture.texture = context.createTexture();
        texture.texture.id = id;
        context.bindTexture(context.TEXTURE_2D, texture.texture);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_NEAREST);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, this.framebuffer.width, this.framebuffer.height,
                           0, context.RGBA, context.UNSIGNED_BYTE, null);
        context.generateMipmap(context.TEXTURE_2D);

        this.renderbuffer = context.createRenderbuffer();
        context.bindRenderbuffer(context.RENDERBUFFER, this.renderbuffer);
        context.renderbufferStorage(context.RENDERBUFFER, context.DEPTH_COMPONENT16, this.framebuffer.width, this.framebuffer.height);

        context.framebufferTexture2D(context.FRAMEBUFFER, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, texture.texture, 0);
        context.framebufferRenderbuffer(context.FRAMEBUFFER, context.DEPTH_ATTACHMENT, context.RENDERBUFFER, this.renderbuffer);

        context.bindTexture(context.TEXTURE_2D, null);
        context.bindRenderbuffer(context.RENDERBUFFER, null);
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    };

    this.enable = function() {
        context.bindFramebuffer(context.FRAMEBUFFER, this.framebuffer);
    };

    this.disable = function() {
        context.bindTexture(context.TEXTURE_2D, texture.texture);
        context.generateMipmap(context.TEXTURE_2D);
        context.bindTexture(context.TEXTURE_2D, null);
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    };
}