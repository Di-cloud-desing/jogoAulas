//variavel personagens
var pc, pc_CostaM, pc_DireitaM, pc_EsquerdaM, pc_FrenteM, pc_CostaP, pc_DireitaP, pc_EsquerdaP, pc_FrenteP
var nerd, nerdImage

//variavel botoes
var buttonMissao1, buttonMissao1Image, botaosaladeaula, botaosaladeaulaImage, botaoboblioteca, botaobibliotecaImage
var backgroundImage1, backgroundImage2

//sinalizadores de movimento
var moved = true

//estados de Jogos = cena 1 = "Inicio" cena2 = "Em frente a sala de aula ou cena3 = "dentro sala de aula" cena 4 = "dentro biblioteca"
var cena = 1

//estrelas
var star, star_display
var star_img, empty_star, one_star, two_star
var number1, number5,number9,number0
var meta,pontos

function preload() {
  //jogo principal
  backgroundImage1 = loadImage("mapa3.jpg");
  backgroundImage2 = loadImage("saladeaula.jpg");
  pc_FrenteP=loadAnimation("./menina/frente_m_5.png")

  nerdImage = loadImage("nerd.png")

  pc_CostaM=loadAnimation("m_costa1.png","m_costa2.png")
  pc_DireitaM=loadAnimation("./menina/direita_m_1.png","./menina/direita_m_2.png","./menina/direita_m_3.png")
  pc_EsquerdaM=loadAnimation("./menina/esquerda_m_1.png","./menina/esquerda_m_2.png","./menina/esquerda_m_3.png")
  pc_FrenteM=loadAnimation("./menina/frente_m_1.png","./menina/frente_m_2.png","./menina/frente_m_3.png","./menina/frente_m_4.png","./menina/frente_m_5.png","./menina/frente_m_6.png","./menina/frente_m_7.png")
  pc_CostaP = loadAnimation ("m_costa1.png")
  pc_EsquerdaP = loadAnimation ("./menina/esquerda_m_1.png")
  pc_DireitaP = loadAnimation ("./menina/direita_m_1.png")

  buttonMissao1Image=loadImage("botao_cena1.png")
  buttonMissao2Image=loadImage("Mate.png")
  buttonMissao3Image=loadImage("dinamarques.png")

  empty_star=loadAnimation("empty.png")
  one_star=loadAnimation("one_star.png")
  two_star=loadAnimation("stars.png")
  star_img=loadImage("star.png")

  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  number1Img = loadImage("");
  number5Img = loadImage("");
  number9Img = loadImage("");
  number0Img = loadImage("");
  endImg =loadAnimation("fimdeJogo.png");
}

function setup() {
 createCanvas(1800,1060);
 //moviemnto
 pc = createSprite(1006,900,20,30);
 pc.addAnimation("costa",pc_CostaM)
 pc.addAnimation("direita",pc_DireitaM)
 pc.addAnimation("esquerda",pc_EsquerdaM)
 pc.addAnimation("frente",pc_FrenteM)
 pc.addAnimation("pc_CostaP",pc_CostaP)
 pc.addAnimation("pc_EsquerdaP",pc_EsquerdaP)
 pc.addAnimation("pc_DireitaP",pc_DireitaP)
 pc.addAnimation("pc_FrenteP",pc_FrenteP)
pc.changeAnimation("frente")
pc.scale=0.7
 nerd = createSprite(1215,919,20,30);
 nerd.addImage("nerd", nerdImage)
 nerd.scale = 1.1

 buttonMissao1=createSprite(871,886)
 buttonMissao1.addImage("botaocena1", buttonMissao1Image)
 buttonMissao1.visible=false
 buttonMissao1.scale = 0.7
 


 botaosaladeaula=createSprite(908,809)
 botaosaladeaula.visible=false
 botaosaladeaula.addImage("bot", buttonMissao2Image)
 botaoboblioteca=createSprite(1166,809)
 botaoboblioteca.visible=false
 botaoboblioteca.addImage("botaoD", buttonMissao3Image)

 star_display=createSprite(20,100)
 star_display.addAnimation("empty",empty_star)
 star_display.addAnimation("onestar",one_star)
 star_display.addAnimation("twostar",two_star)
 star_display.changeAnimation("empty")
 star_display.scale=0.1

}

function draw() 
{  
  if(cena === 1){
    background(backgroundImage1);

  
   if(pc.collide(nerd)){
    moved=false
    buttonMissao1.visible=true
    pc.x=pc.x-50
    pc.changeAnimation("pc_FrenteP")
    $(document).ready(function () {
      displayBot()
    })
   }
   if(mousePressedOver(buttonMissao1)){
    //missao1()
    buttonMissao1.visible = false
    moved = true
    displayBot()
    pc.changeAnimation("pc_FrenteP") 
    pc.scale = 0.4
    pc.x = 803
    pc.y = 770

  }
  if(pc.x===803&&pc.y===770){
    cena=2
  }
  }
  //cena 2
  if(cena === 2){
    background(backgroundImage2)
    nerd.visible=false
    moved=false
    botaosaladeaula.visible=true
    botaoboblioteca.visible=true
    if(mousePressedOver(botaosaladeaula)){
     cena=3 
    }
    if(mousePressedOver(botaoboblioteca)){
      cena=4
     }
  }

  //cena 3
  if(cena === 3){
    background("white");

    
  }
  // cena 4
  if(cena === 4){
    
    
  }
  //cena 5
  if(cena === 5){
    
    
  }
  if(moved===true){
   if(keyWentDown("up")){
    pc.velocityY=-2
    pc.changeAnimation("costa")
    pc.scale=0.3
   }
   else if (keyWentUp("up")){
    pc.velocityY=0
    pc.changeAnimation("pc_CostaP")
   }
   if(keyWentDown("down")){
    pc.velocityY=2
    pc.scale=0.7
    pc.changeAnimation("frente")
   }
   else if (keyWentUp("down")){
    pc.velocityY=0
    pc.changeAnimation("pc_FrenteP")
   }
   if(keyWentDown("left")){
    pc.velocityX=-2
    pc.scale=0.7
    pc.changeAnimation("esquerda")
   }
   else if (keyWentUp("left")){
    pc.velocityX=0
    pc.changeAnimation("pc_EsquerdaP")
   }
   
   if(keyWentDown("right")){
    pc.velocityX=2
    pc.scale=0.7
    pc.changeAnimation("direita")
   }
   else if (keyWentUp("right")){
    pc.velocityX=0
    pc.changeAnimation("pc_DireitaP")
   }
  }

  
  //comportamentos fora do estado de jogo
  textSize(10);
  text (mouseX + "," + mouseY, mouseX, mouseY)
  drawSprites();
}
function displayBot() {
  $('.chatbox__chat').toggle()
}