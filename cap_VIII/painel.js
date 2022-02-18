function Painel(context, nave){
    this.context = context;
    this.nave = nave;
    this.spritesheet = new Spritesheets(context, nave.imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.coluna = 0;
    this.pontuacao = 0;
}

Painel.prototype = {
    atualizar(){

    },
    desenhar(){
        const ctx = this.context;
        //vidas
        ctx.scale(0.5, 0.5);
        
        let x = 20;
        let y = 20;

        for(let i = 1; i <= this.nave.vidasExtras; i++){
            this.spritesheet.desenhar(x, y);
            x += 40;
        }

        ctx.scale(2, 2);

        //pontuação
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '18px sans-serif';
        ctx.fillText(this.pontuacao, 100, 27);
        ctx.restore();
    },

}