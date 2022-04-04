const musics = [
  {
    id: '1',
    name: 'Itte',
    autor: 'Yurashika',
    sourse: 'musics/itte.mp3'
  },

  {
    id: '2',
    name: 'Shinzō o sasageyo',
    autor: 'Linked Horizon',
    sourse: 'musics/shinzo-o-sasageyo.mp3'
  },

  {
    id: '3',
    name: 'Como vovó já dizia',
    autor: 'Raul Seixas',
    sourse: 'musics/vovo-ja-dizia.mp3'
  },

  {
    id: '4',
    name: 'Tomara',
    autor: 'Pablo',
    sourse: 'musics/tomara.mp3'
  },

  {
    id: '5',
    name: 'A Desconhecida',
    autor: 'Mister mu',
    sourse: 'musics/a-desconhecida.mp3'
  },

  {
    id: '6',
    name: 'Casa vazia',
    autor: 'Pablo',
    sourse: 'musics/casa-vazia.mp3'
  },

  {
    id: '7',
    name: 'Caso encerrado',
    autor: 'Asas Livres',
    sourse: 'musics/caso-encerrado.mp3'
  },

  {
    id: '8',
    name: 'Cds e livros',
    autor: 'Asas Livres',
    sourse: 'musics/cds-e-livros.mp3'
  },

  {
    id: '9',
    name: 'Clocks',
    autor: 'Coldplay',
    sourse: 'musics/clocks.mp3'
  },

  {
    id: '10',
    name: 'Exagerado',
    autor: 'Cazuza',
    sourse: 'musics/exagerado.mp3'
  },

  {
    id: '11',
    name: 'Gatinha comunista',
    autor: 'Vitroles',
    sourse: 'musics/gatinha-comunista.mp3'
  },

  {
    id: '12',
    name: 'kokuhaku bungeejump',
    autor: 'Halca',
    sourse: 'musics/kokuhaku-bungee-jump.mp3'
  },

  {
    id: '13',
    name: 'Maps',
    autor: 'Maroon 5',
    sourse: 'musics/maps.mp3'
  },

  {
    id: '14',
    name: 'Naimononedari',
    autor: 'KANA-BOON feat. mossa',
    sourse: 'musics/naimononedari.mp3'
  },

  {
    id: '15',
    name: 'Sentimental crisis',
    autor: 'Halca',
    sourse: 'musics/sentimental-crisis.mp3'
  },

  {
    id: '16',
    name: 'Tropicana',
    autor: 'Alceu Valença',
    sourse: 'musics/tropicana.mp3'
  },

  {
    id: '17',
    name: 'Tudo Azul',
    autor: 'Asas Livres',
    sourse: 'musics/tudo-azul.mp3'
  },

  {
    id: '18',
    name: 'União Flasco',
    autor: 'Luckhaos',
    sourse: 'musics/uniao-flasco.mp3'
  },
]

const LoadMusics = () => {
  musics.forEach(el => {
    musicBox.insertAdjacentHTML('beforeend', 
    `<div class="music" data-id="${el.id}" data-autor="${el.autor}" data-Name="${el.name}" data-source="${el.sourse}">
        <div class="music-name">♪ ${el.name}</div>
        <div class="music-autor">${el.autor}</div>
      </div>`
    )
  })
}

LoadMusics();

let currId = 1;

musicBox.addEventListener('click', function(e) {
  const el = e.target.closest('.music');
  if(!el) return;
  setNewAudio(el);
  currId = el.dataset.id;
  setTimeout(MusicStart, 500);
})

controllerBox.addEventListener('click', function (e) {
  let el;
  if(!e.target.classList.contains('btn-change')) return;
  if(
    (e.target === btnRight && currId == 18) ||
    (e.target === btnLeft && currId == 1)
    ) return;

  if(e.target === btnRight) {
    el = document.querySelector(`[data-id="${Number(currId) + 1}"]`);
    currId = Number(currId) + 1;
  } else if (e.target === btnLeft) {
    el = document.querySelector(`[data-id="${currId - 1}"]`);
    currId -= 1;
  }

  setNewAudio(el);
  setTimeout(MusicStart, 300);
})

function setNewAudio (el) {
  audio.src = el.dataset.source;
  audio.dataset.autor = el.dataset.autor;
  audio.dataset.name = el.dataset.name;
  audio.dataset.id = el.dataset.id;
  currId = el.dataset.id;
}

musicBox.style.height = `${window.innerHeight}px`;

const changeWidth = () => {
  if(window.innerWidth < 670)
  musicBox.style.height = `${window.innerHeight - 322}px`;
  else musicBox.style.height = `${window.innerHeight}px`;
}
changeWidth();
window.addEventListener('resize', changeWidth);

