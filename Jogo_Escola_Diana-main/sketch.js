//variavel personagens
var pc, pc_CostaM, pc_DireitaM, pc_EsquerdaM, pc_FrenteM, pc_CostaP, pc_DireitaP, pc_EsquerdaP, pc_FrenteP;
var nerd, nerdImage;

//variavel botoes
var buttonMissao1, buttonMissao1Image, buttonMissao2Image,buttonMissao3Image, botaosaladeaula, botaoBiblioteca;
var backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4,backgroundImage5;

//sinalizadores de movimento
var moved = true;

//estados de Jogos = cena 1 = "Inicio" cena2 = "Em frente a sala de aula ou cena3 = "dentro sala de aula" cena 4 = "dentro biblioteca" 5=final do jogo
var cena = 1;

//estrelas
var star, star_display;
var star_img, empty_star, one_star, two_star

//jogo da soma
var number1, number5,number9,number0, number1Img, number5Img, number9Img,number0Img;
var number1Group, number5Group, number9Group, number0Group;
var meta = 30;
var pontos = 0;
var girl, girlImg;
var PLAY=1;
var END=0;
var gameState=1;

function preload() {
  //imagens do Jogo
  backgroundImage1 = loadImage("./cenas/cena1.jpg");
  backgroundImage2 = loadImage("./cenas/cena2.jpg");
  backgroundImage3 = loadImage("./cenas/cena3.png");
  backgroundImage4 = loadImage("./cenas/cena4.jpg");
  backgroundImage5 = loadImage("./cenas/cena5.jpg");

  //jogador principal
  pc_CostaM=loadAnimation("./menina/costa_1.png","./menina/costa_2.png", "./menina/costa_3.png")
  pc_DireitaM=loadAnimation("./menina/direita_m_1.png","./menina/direita_m_2.png","./menina/direita_m_3.png")
  pc_EsquerdaM=loadAnimation("./menina/esquerda_m_1.png","./menina/esquerda_m_2.png","./menina/esquerda_m_3.png")
  pc_FrenteM=loadAnimation("./menina/frente_m_1.png","./menina/frente_m_2.png","./menina/frente_m_3.png","./menina/frente_m_4.png","./menina/frente_m_5.png","./menina/frente_m_6.png","./menina/frente_m_7.png")

  pc_FrenteP=loadAnimation("./menina/frente_m_5.png")
  pc_CostaP = loadAnimation ("./menina/costa_1.png")
  pc_EsquerdaP = loadAnimation ("./menina/esquerda_m_1.png")
  pc_DireitaP = loadAnimation ("./menina/direita_m_1.png")
  girlImage=loadAnimation("./menina/frente_m_1.png","./menina/frente_m_2.png","./menina/frente_m_3.png","./menina/frente_m_4.png","./menina/frente_m_5.png","./menina/frente_m_6.png","./menina/frente_m_7.png")
  //npc nao jogador
  nerdImage = loadImage("./nerd/nerd.png")

  //botões
  buttonMissao1Image=loadImage("./sinalizadores/botao_cena1.png")
  buttonMissao2Image=loadImage("./sinalizadores/botaoSala.png")
  buttonMissao3Image=loadImage("./sinalizadores/botaoBiblioteca.png")
  //placar das estrelas
  empty_star=loadAnimation("./sinalizadores/empty.png")
  one_star=loadAnimation("./sinalizadores/one_star.png")
  two_star=loadAnimation("./sinalizadores/stars.png")
  star_img=loadImage("./sinalizadores/star.png")
  endImg =loadAnimation("./sinalizadores/fimdeJogo.png");

  //Jogo sala de aula
  girlImg = loadAnimation("Runner-1.png","Runner-2.png");
  number1Img = loadImage("./sinalizadores/1.png");
  number5Img = loadImage("./sinalizadores/5.png");
  number9Img = loadImage("./sinalizadores/9.png");
  number0Img = loadImage("./sinalizadores/0.png");
  
}

function setup() {
 createCanvas(700,600);
 //moviemnto
 pc = createSprite(420,500,20,30);
 pc.addAnimation("costa",pc_CostaM)
 pc.addAnimation("direita",pc_DireitaM)
 pc.addAnimation("esquerda",pc_EsquerdaM)
 pc.addAnimation("frente",pc_FrenteM)
 pc.addAnimation("pc_CostaP",pc_CostaP)
 pc.addAnimation("pc_EsquerdaP",pc_EsquerdaP)
 pc.addAnimation("pc_DireitaP",pc_DireitaP)
 pc.addAnimation("pc_FrenteP",pc_FrenteP)
 pc.changeAnimation("pc_FrenteP")
 pc.scale=0.4

 nerd = createSprite(490,500,20,30);
 nerd.addImage("nerd", nerdImage)
 nerd.scale = 0.6

 buttonMissao1=createSprite(300,520)
 buttonMissao1.addImage("botaocena1", buttonMissao1Image)
 buttonMissao1.visible=false
 buttonMissao1.scale = 0.5
 
 botaosaladeaula=createSprite(350,450)
 botaosaladeaula.scale = 0.5
 botaosaladeaula.visible=false
 botaosaladeaula.addImage("bot", buttonMissao2Image)
 
 botaoBiblioteca=createSprite(480,450)
 botaoBiblioteca.scale = 0.5
 botaoBiblioteca.visible=false
 botaoBiblioteca.addImage("botaoD", buttonMissao3Image)

 star_display=createSprite(70,40)
 star_display.addAnimation("empty",empty_star)
 star_display.addAnimation("onestar",one_star)
 star_display.addAnimation("twostar",two_star)
 star_display.changeAnimation("empty")
 star_display.scale=0.2

 
 girl=createSprite(300,100)
 girl.addAnimation("menina",girlImage)
 girl.velocityY=0
 girl.visible=false
 girl.scale = 0.9
 
 star=createSprite(350,300)
 star.addImage(star_img)
 star.scale=0.1
 star.visible=false

 
number1Group=new Group()
number9Group=new Group()
number5Group=new Group()
number0Group=new Group()
}

function draw() 
{  
  if(cena === 1){
    background(backgroundImage1);

   //colisão com o nerd
   if(pc.collide(nerd)){
    moved=false //desabilitar controles do jogador
    buttonMissao1.visible=true //mostrar botão
    pc.x=pc.x-50 //colocar jogador ao lado do nerd
    pc.changeAnimation("pc_FrenteP") //mudar animação
    pc.scale = 0.4
    //abrir janela de chat
    $(document).ready(function () {
      displayBot()
    })
   }
   //ações ao clicar no botão start
   if(mousePressedOver(buttonMissao1)){
    buttonMissao1.visible = false //esconder botão
    displayBot() //fechar chat
    pc.changeAnimation("pc_FrenteP") //mudar animação
    pc.scale = 0.4
    pc.x = 420
    pc.y = 420
    console.log(cena)
  }
  if(pc.x===420&&pc.y===420){
    cena=2
    console.log(cena)
  }
  }
  //cena 2
  if(cena === 2){ 

    background(backgroundImage2)
    nerd.visible=false //esconder nerd
    moved=false //desabailitar controles do jogador
    botaosaladeaula.visible=true //mostrar botao
    

     //se pressionar o botao da sala de aula
    if(mousePressedOver(botaosaladeaula)){
        cena=3 //sala de aula
        console.log(cena)   
    }
    //se pressionar o botao da biblioteca
    if(mousePressedOver(botaoBiblioteca)){
        cena=4 //biblioteca
        console.log(cena)
     }

  }

  //cena 3
  if(cena === 3){
    //backgroundImage3
    background(backgroundImage3);
    nerd.visible=false
    pc.visible=false
    girl.visible=true
    botaosaladeaula.visible=false
    botaoBiblioteca.visible=false
    
    if(gameState===PLAY){
    girl.x = World.mouseX;
    edges= createEdgeSprites();
    girl.collide(edges);
    createZero()
    createum()
    createcinco()
    createnove()
    if(number0Group.isTouching(girl)){
      number0Group.destroyEach()
    }
    else  if(number1Group.isTouching(girl)){
      number1Group.destroyEach()
      pontos+=1
    }
    else if(number5Group.isTouching(girl)){
      number5Group.destroyEach()
      pontos+=5
    }
    else  if(number9Group.isTouching(girl)){
      number9Group.destroyEach()
      pontos+=9
    }
    
    if(pontos>=30

    ){
      gameState=END
    }
    
  }
  if(gameState===END){
  if(pontos===30){
    number0Group.destroyEach()
    number1Group.destroyEach()
    number5Group.destroyEach()
    number9Group.destroyEach()
    number0Group.setVelocityYEach(0)
    number1Group.setVelocityYEach(0)
    number5Group.setVelocityYEach(0)
    number9Group.setVelocityYEach(0)
    star.visible=true
    star_display.changeAnimation("onestar")
    girl.visible=false
    setTimeout(()=>{
      girl.destroy()
      pc.visible=true
      star.visible=false
      botaoBiblioteca.visible=true
      cena=2
    },3000)
  }
  if(pontos>30){
    textSize(20);
    fill("white")
    text("voce ultrapasou a meta tente novamente",120,339)
    setTimeout(() => {
    number0Group.destroyEach()
    number1Group.destroyEach()
    number5Group.destroyEach()
    number9Group.destroyEach()
    pontos=0
    gameState=PLAY
    }, 3000)

    number0Group.setVelocityYEach(0)
    number1Group.setVelocityYEach(0)
    number5Group.setVelocityYEach(0)
    number9Group.setVelocityYEach(0)
    
   }
  
   }


    //pontuação
    textSize(20);
    fill(0);
    text("Mål: "+ meta,550,30);
    text("Points: "+ pontos,550,50);
    //text pontos
  }
  // cena 4
  if(cena === 4){
    background(backgroundImage4);
    nerd.visible=false
    pc.visible=false
    botaosaladeaula.visible=false
    botaoBiblioteca.visible=false
    

    
    
  }
  //cena 5
  if(cena === 5){
    
    
  }

  //controles do jogador
  if(moved===true){
   if(keyWentDown(UP_ARROW)){
    pc.velocityY=-2
    pc.changeAnimation("costa")
    pc.scale=0.222
   }
   else if (keyWentUp(UP_ARROW)){
    pc.velocityY=0
    pc.changeAnimation("pc_CostaP")
   }
   if(keyWentDown(DOWN_ARROW)){
    pc.velocityY=2
    pc.scale=0.4
    pc.changeAnimation("frente")
   }
   else if (keyWentUp(DOWN_ARROW)){
    pc.velocityY=0
    pc.changeAnimation("pc_FrenteP")
   }
   if(keyWentDown(LEFT_ARROW)){
    pc.velocityX=-2
    pc.scale=0.4
    pc.changeAnimation("esquerda")
   }
   else if (keyWentUp(LEFT_ARROW)){
    pc.velocityX=0
    pc.changeAnimation("pc_EsquerdaP")
   }
   
   if(keyWentDown(RIGHT_ARROW)){
    pc.velocityX=2
    pc.scale=0.4
    pc.changeAnimation("direita")
   }
   else if (keyWentUp(RIGHT_ARROW)){
    pc.velocityX=0
    pc.changeAnimation("pc_DireitaP")
   }
  }
  edges= createEdgeSprites();
  pc.collide(edges);
  
  //comportamentos fora do estado de jogo
  textSize(10);
  text (mouseX + "," + mouseY, mouseX, mouseY)
  drawSprites();
}
//abrir janela de chat
function displayBot() {
  $('.chatbox__chat').toggle()
}
function createZero(){
  if (World.frameCount % 200 == 0) {
    var zero = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    zero.addImage(number0Img);
    zero.scale=0.5;
    zero.velocityY = -5;
    zero.lifetime = 130;
    number0Group.add(zero);
    }
}
function createum(){
  if (World.frameCount % 350 == 0) {
    var um = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    um.addImage(number1Img);
    um.scale=0.5;
    um.velocityY = -5;
    um.lifetime = 130;
    number1Group.add(um);
    }
}
function createcinco(){
  if (World.frameCount % 420 == 0) {
    var cinco = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    cinco.addImage(number5Img);
    cinco.scale=0.5;
    cinco.velocityY = -5;
    cinco.lifetime = 130;
    number5Group.add(cinco);
    }
}
function createnove(){
  if (World.frameCount % 540 == 0) {
    var nove = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    nove.addImage(number9Img);
    nove.scale=0.5;
    nove.velocityY = -5;
    nove.lifetime = 130;
    number9Group.add(nove);
    }
}