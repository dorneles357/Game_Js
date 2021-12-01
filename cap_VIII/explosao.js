function Explosao(context, imagem, x, y){
    this.context = context;
    this.imagem = imagem;
    this.spriteseet = new Spritesheets(context, imagem, 1, 5);
    this.spriteseet.intervalo = 50;
    this.x = x;
    this.y = y;
    var explosao = this;
    this.spriteseet.fimDoCiclo = () =>{
        explosao.animacao.excluirSprite(explosao);

        if(explosao.fimDaExplosao) explosao.fimDaExplosao();
    }
}

Explosao.prototype = {
    atualizar(){

    },
    desenhar(){
        this.spriteseet.desenhar(this.x, this.y);
        this.spriteseet.proximoQuadro();
    }
}