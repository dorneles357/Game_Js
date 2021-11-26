function Colisor() {
  this.sprites = [];
  this.spritesExcluir = [];
}

Colisor.prototype = {
  novoSprite: function (sprite) {
    this.sprites.push(sprite);
    sprite.colisor = this;
  },

  processar: function () {
    //inicio com o objeto vazio
    const jaTestados = new Object();

    for (let i in this.sprites) {
      for (let j in this.sprites) {
        //não colidir um sprite com ele mesmo
        if (i == j) continue;

        //gerar strings unicas
        const id1 = this.stringUnica(this.sprites[i]);
        const id2 = this.stringUnica(this.sprites[j]);

        //criar os arrays se não existirem
        if (!jaTestados[id1]) jaTestados[id1] = [];
        if (!jaTestados[id2]) jaTestados[id2] = [];

        //teste de repetição
        if (
          !(
            jaTestados[id1].indexOf(id2) >= 0 ||
            jaTestados[id2].indexOf(id1) >= 0
          )
        ) {
          //abstrair a colisão
          this.testarColisao(this.sprites[i], this.sprites[j]);
          //registrando o teste
          jaTestados[id1].push(id2);
          jaTestados[id2].push(id1);
        }
      }
    }

    this.processarExclusoes();
  },

  testarColisao: function (sprite1, sprite2) {
    //Obter retângulos de colisão de cada sprite
    const rests1 = sprite1.retangulosColisao();
    const rests2 = sprite2.retangulosColisao();

    //testar as colisões
    colisoes: for (let i in rests1) {
      for (let j in rests2) {
        if (this.retangulosColidem(rests1[i], rests2[j])) {
          sprite1.colidiuCom(sprite2);
          sprite2.colidiuCom(sprite1);

          //tratador geral
          if (this.aoColidir) this.aoColidir(sprite1, sprite2);

          break colisoes;
        }
      }
    }
  },

  retangulosColidem: function (ret1, ret2) {
    //interecção entre triângulos
    return (
      ret1.x + ret1.largura > ret2.x &&
      ret1.x < ret2.x + ret2.largura &&
      ret1.y + ret1.altura > ret2.y &&
      ret1.y < ret2.y + ret2.altura
    );
  },

  stringUnica: function (sprite) {
    var str = "";
    var retangulos = sprite.retangulosColisao();
    for (let i in retangulos) {
      str +=
        "x:" +
        retangulos[i].x +
        "," +
        "y:" +
        retangulos[i].y +
        "," +
        "l: " +
        retangulos[i].largura +
        "," +
        "a:" +
        retangulos[i].altura +
        "\n";
    }
    return str;
  },

  excluirSprite: function (sprite) {
    this.spritesExcluir.push(sprite);
  },

  processarExclusoes: function () {
    //criar novo array
    var new_array = [];

    //add apenas os elementos não excluidos
    for (let i in this.sprites) {
      if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
        new_array.push(this.sprites[i]);
    }

    //limpar new_array
    this.new_array = [];

    //subtituir o velho pelo novo;
    this.sprites = new_array;
  },
};
