function Tiro(context, nave) {
  this.context = context;
  this.nave = nave;

  //posicionar o tiro
  this.largura = 4;
  this.altura = 20;
  this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
  this.y = nave.y - this.altura;
  this.velocidade = 10;

  this.cor = "purple";
}

Tiro.prototype = {
  atualizar() {
    this.y -= this.velocidade;
  },

  desenhar() {
    var ctx = this.context;
    ctx.save();
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
    ctx.restore();
  },
};
