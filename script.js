
let musicas = [
  {titulo: 'A Brand New Start', artista:'TrackTribe', src:'music/A Brand New Start - TrackTribe - JAZZ.mp3'
, img:'img/jazz.jpg'},
{titulo: 'Sunset Strut', artista:'Dan Lebowitz', src:'music/Sunset Strut - Dan Lebowitz - ROCK.mp3'
, img:'img/rock.jpg'},
{titulo: 'Nilly Willy ', artista:'Yung Logos', src:'music/Nilly Willy - Yung Logos - HIP.mp3'
, img:'img/hip-hop.jpg'},
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i')

renderizarMusica(indexMusica); //carregar


// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica) /* 
Sempre quando for selecionar uma classe, informar o ponto AuthenticatorResponse. 
*/
document.querySelector('.botao-pause').addEventListener('click', pausarMusica)

musica.addEventListener('timeupdate', atualizarBarra); //Progressão da barra ao tocar música

document.querySelector('.anterior').addEventListener('click', () => {
  indexMusica--;
  if (indexMusica < 0){  /*Se for menor que zero ,vai dar erro, não existe elemento
    que ta na posição -1, e na posição 3, 4, 5, etc.*/
    indexMusica = 2;
  }
renderizarMusica(indexMusica);
})

document.querySelector('.proximo').addEventListener('click', () => {
  indexMusica++;
  if (indexMusica > 2){
    indexMusica = 0;
  }
renderizarMusica(indexMusica);
})



// Funções
function renderizarMusica(index){
musica.setAttribute('src', musicas[index].src)
musica.addEventListener('loadeddata', () =>{ //Funções anonimas
nomeMusica.textContent = musicas[index].titulo;
nomeArtista.textContent = musicas[index].artista;
imagem.src = musicas[index].img;
duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
});
}


function tocarMusica() {
  musica.play();
  document.querySelector('.botao-pause').style.display = "block"; //Aparecer o botão pause
  document.querySelector('.botao-play').style.display = "none"; //Inversão, esconde o botão play
}

function pausarMusica() {
  musica.pause();
  document.querySelector('.botao-pause').style.display = "none"; //esconde o pause
  document.querySelector('.botao-play').style.display = "block"; //aparece o player
}


function atualizarBarra() {
  let barra = document.querySelector('progress');
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100); + '%'; /* 
  Conforme a música vai progredindo, a barra vai subindo, atualizando,e essa atualização
  tem que ser em porcentagem. Para obtermos dinamicamente o valor em porcentagem 
  da música atual, Pegando o musica.currentTime + musica.duration * 100 e usando 
  a concatenação para informa que é uma porcentagem. 
  Math.floor: para pegar o número inteiro, arredonda o número para baixo.
  Podemos testar pelo console do navegador, indo em console
  se digitarmos musica.duration, irá retornar em segundos
  musica.currentTime: Estado atual da música (Conforme a música toque, vai mudando)
  se a música estiver na metade, o currentTime vai valer metade do music.duration,
  para pegarmos em porcentagem dos dois é somente seguir o procedimento acima.

  */
let tempoDecorrido = document.querySelector('.inicio'); /*Início da musica, 
pegamos da div 'tempo',*/
tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));


}

function segundosParaMinutos(segundos){
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10){
    campoSegundos = '0' + campoSegundos
  }

  return campoMinutos+ ':' +campoSegundos;

}

