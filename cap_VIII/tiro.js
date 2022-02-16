const SOM_TIRO = new Audio();
SOM_TIRO.src = 'sound/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

function Tiro(context, nave) {
  this.context = context;
  this.nave = nave;

  //posicionar o tiro
  this.largura =   4;
  this.altura = 20;
  this.x = nave.x + 36/2 ;
  this.y = nave.y - this.altura;
  this.velocidade = 10;

  this.cor = "purple";

  SOM_TIRO.currentTime = 0.0;
  SOM_TIRO.play();
}

Tiro.prototype = {
  atualizar() {
    this.y -= this.velocidade;
    //excluir tiro quando sumir da tela
    if (this.y < -this.altura) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
    }
  },

  desenhar() {
    var ctx = this.context;
    ctx.save();
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
    ctx.restore();
  },

  retangulosColisao() {
    return [
      {
        x: this.x,
        y: this.y,
        largura: this.largura,
        altura: this.altura,
      },
    ];
  },

  colidiuCom() {},
};
