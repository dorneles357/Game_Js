function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.ligado = false;
  this.processamentos = [];

  //excluir
  this.spritesExcluir = [];
  this.processamentosExcluir = [];
}

Animacao.prototype = {
  novoSprite: function (sprite) {
    this.sprites.push(sprite);
    sprite.animacao = this;
  },
  ligar: function () {
    this.ligado = true;
    this.proximoFrame();
  },
  desligar: function () {
    this.ligado = false;
  },
  proximoFrame: function () {
    //posso continuar?
    if (!this.ligado) return;

    //a cada ciclo é feita a limpeza
    //this.limparTela();

    //atualizar estados dos sprites
    for (var i in this.sprites) this.sprites[i].atualizar();

    //desenhando sprites
    for (var i in this.sprites) this.sprites[i].desenhar();

    //processamentos gerais
    for (var i in this.processamentos) this.processamentos[i].processar();

    //processamento das exclusões
    this.processarExclusoes();

    //chamando o próximo ciclo
    var animacao = this;
    requestAnimationFrame(function () {
      animacao.proximoFrame();
    });
  },
  limparTela: function () {
    var ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },

  novoProcessamento: function (processamento) {
    this.processamentos.push(processamento);
    processamento.animacao = this;
  },

  excluirSprite: function (sprite) {
    this.spritesExcluir.push(sprite);
  },

  excluirProcessamento: function (processamento) {
    this.processamentosExcluir.push(processamento);
  },

  processarExclusoes: function () {
    //criar novos arrays
    var new_sprites = [];
    var new_processamentos = [];

    //add apenas elementos não excluidos
    for (i in this.sprites) {
      if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
        new_sprites.push(this.sprites[i]);
    }

    for (i in this.processamentos) {
      if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1)
        new_processamentos.push(this.processamentos[i]);
    }

    //limpar arrays
    this.spritesExcluir = [];
    this.processamentosExcluir = [];

    //substituir o velho pelo novo
    this.sprites = new_sprites;
    this.processamentos = new_processamentos;
  },
};
