//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro /2;
let comprimento = 10;
let altura = 90;

//variáveis da velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let velocidadeYoponente;


//variáveis do oponente
let xOponente = 585;
let yOponente = 150;

let colidir = false;

//placar do jogo
let meusPontos =0;
let pontosOponente = 0;
let chanceErrar = 0;

//sons do jogo
let somRaquetada;
let somPontuacao;
let somTrilha;

function setup() {
  createCanvas(600, 400);
  somTrilha.loop();
}

function draw() {
  background('rgba(0,255,0, 0.25)');
  mostrarBolinha();
  movimentarBolinha();
  verificarColisaoBolinha(); 
  mostrarRaquetes(xRaquete, yRaquete);
  movimentarRaquete();
  colidirComRaquetesBiblioteca(xRaquete, yRaquete);
  mostrarRaquetes(xOponente, yOponente);
  movimentarOponente();
  colidirComRaquetesBiblioteca(xOponente, yOponente);
  incluirPlacar();
  marcarPontuacao();
  bolinhaNaoFicaPresa()
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
  
}

function movimentarBolinha() {
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function verificarColisaoBolinha() {
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

function mostrarRaquetes(x, y) {
  fill(color(255, 140, 0));
  rect(x, y, comprimento, altura);
  
}

function movimentarRaquete() {
  if (keyIsDown(UP_ARROW)){
    yRaquete-= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
  yRaquete+= 10;
  }
}

function movimentarOponente(){
  velocidadeYoponente = yBolinha -yOponente - comprimento / 2 - 30;
  yOponente += velocidadeYoponente + chanceErrar
  calcularChanceErrar();
}

//2º jogados usa as teclas "w" e "s"
//function movimentarOponente() {
//  if (keyIsDown(87)){
//  yOponente-= 10;
//  }
//  if (keyIsDown(83)) {
//  yOponente+= 10;
//  }
//}

function colidirComRaquetesBiblioteca(x, y){
  colidir = collideRectCircle(x, y, comprimento, altura, xBolinha, yBolinha, raio);
  
  if (colidir) {
     velocidadeXbolinha *= -1;
     somRaquetada.play();
  }
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPontuacao() {
  if (xBolinha > 590){
    meusPontos += 1;
    somPontuacao.play();
  }
  
  if (xBolinha < 10){
    pontosOponente += 1;
    somPontuacao.play();
  }
}

function preload(){
  somTrilha = loadSound("Reggae.wav");
  somRaquetada = loadSound("raquetada.mp3");
  somPontuacao = loadSound("ponto.mp3");

}

function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function calcularChanceErrar() {
  if (pontosOponente >= meusPontos) {
    chanceErrar += 1
  if (chanceErrar >= 39){
    chanceErrar = 40
    }
  } else {
    chanceErrar -= 1
  if (chanceErrar <= 35){
    chanceErrar = 35
    }
  }
}

