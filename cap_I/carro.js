//função construtora 

function Carro(cor, velocMax){
	this.cor = cor;
	this.velocMax = velocMax;
	this.velocAtual = 0;
}

//prototype

Carro.prototype = {
	acelerar: function(){
		this.velocAtual += 10;
	}
}
