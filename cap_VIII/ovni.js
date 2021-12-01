function Ovni(context, imagem, imgExplosao) {
  this.context = context;
  this.imagem = imagem;
  this.imgExplosao = imgExplosao;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;
}

Ovni.prototype = {
  atualizar() {
    this.y += this.velocidade;

    //excluir quando sumir da tela
    if (this.y > this.context.canvas.height) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
    }
  },

  desenhar() {
    const ctx = this.context;
    const img = this.imagem;

    ctx.drawImage(img, this.x, this.y, img.width, img.height);
  },

  retangulosColisao() {
    var rets = [
      { x: this.x + 20, y: this.y + 1, largura: 25, altura: 10 },
      { x: this.x + 2, y: this.y + 11, largura: 60, altura: 12 },
      { x: this.x + 20, y: this.y + 23, largura: 25, altura: 7 },
    ];

   /*//desenhar retângulos
    const ctx = this.context;

    for (item in rets) {
      ctx.save();
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        rets[item].x,
        rets[item].y,
        rets[item].largura,
        rets[item].altura
      );

      ctx.restore();
    }  */

    return rets;
  },

  colidiuCom(outro) {
    //se colidiu com o tiro os dois somem
    if (outro instanceof Tiro) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
      this.animacao.excluirSprite(outro);
      this.colisor.excluirSprite(outro);

      const explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
      this.animacao.novoSprite(explosao);
    }
  },
};
