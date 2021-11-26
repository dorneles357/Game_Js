function Fundo(context, imagem) {
  this.context = context;
  this.imagem = imagem;
  this.velocidade = 0;
  this.posicaoEmendada = 0;
}

Fundo.prototype = {
  atualizar() {
    //atualizar posição da emenda
    this.posicaoEmendada += this.velocidade * this.animacao.decorrido / 1000;

    //Se a emenda passou da posição
    if (this.posicaoEmendada > this.imagem.height) this.posicaoEmendada = 0;
  },

  desenhar() {
    var img = this.imagem;

    //primeira cópia
    var posicaoY = this.posicaoEmendada - img.height;
    this.context.drawImage(img, 0, posicaoY, img.width, img.height);

    //segunda cópia
    posicaoY = this.posicaoEmendada;
    this.context.drawImage(img, 0, posicaoY, img.width, img.height);
  },
};
