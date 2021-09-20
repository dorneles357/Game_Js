
const MAN_DIREITA = 1;
const MAN_ESQUERDA = 2;

function Man(context, teclado, imagem){
	this.context = context;
	this.teclado = teclado;
	this.x = 0;
	this.y = 0;
	this.velocidade = 10;

	//criando spritesheet com imagem recebida
	this.sheet = new Spritesheets(context, imagem, 3, 8);
	this.sheet.intervalo = 60;

	//estado inicial 
	this.andando = false;
	this.direcao = MAN_DIREITA;
}

Man.prototype = {
	atualizar: function(){
		if(this.teclado.pressionada(SETA_DIREITA)){
			//se não estava neste estado ...
			if(! this.andando || this.direcao != MAN_DIREITA){
				//quadro de spritsheet
				this.sheet.linha = 1;
				this.sheet.coluna = 0;
			}

			//configurção do estado atual 
			this.andando = true;
			this.direcao = MAN_DIREITA;

			this.sheet.proximoQuadro();

			this.x += this.velocidade;
		}

		else if(this.teclado.pressionada(SETA_ESQUERDA)){
			if(! this.andando || this.direcao != MAN_ESQUERDA){
				this.sheet.linha = 2;
				this.sheet.coluna = 0;
			}

			this.andando = true;
			this.direcao = MAN_ESQUERDA;

			this.sheet.proximoQuadro();

			this.x -= this.velocidade;
		}

		else{
			if(this.direcao == MAN_DIREITA)
				this.sheet.coluna = 0;
			else if(this.direcao == MAN_ESQUERDA)
				this.sheet.coluna = 1;

			this.sheet.linha = 0;
			this.andando = false;
		}
	},

	desenhar: function(){
		//utilizando os métodos da classe spritsheet
		this.sheet.desenhar(this.x, this.y);
	}
}
