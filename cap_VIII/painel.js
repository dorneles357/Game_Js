function Painel(context, nave){
    this.context = context;
    this.nave = nave;
    this.spritesheet = new Spritesheets(context, nave.imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.coluna = 0;
}

Painel.prototype = {
    atualizar(){

    },
    desenhar(){
        this.context.scale(0.5, 0.5);
        
        let x = 20;
        let y = 20;

        for(let i = 1; i <= this.nave.vidasExtras; i++){
            this.spritesheet.desenhar(x, y);
            x += 40;
        }

        this.context.scale(2, 2);
    },

}