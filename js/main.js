const btnVolumeDown = document.querySelector('.btnVolumeDown');
const btnVolumeUp = document.querySelector('.btnVolumeUp');
const currMusicName = document.querySelector('.curr-music-name');
const currMusicAutor = document.querySelector('.music-autor');
const progressBar = document.querySelector('.progress-bar');
const btnPlay = document.querySelector('.btn-play');
const audio = document.querySelector('audio');
const timerCurrProgress = document.querySelector('.curr-progress');
const timerTotalDuration = document.querySelector('.total-duration');
const musicBox = document.querySelector('.musics-box');
const volume = audio.volume;

const controllerBox = document.querySelector('.controller-box');
const btnLeft = document.querySelector('.audio-left');
const btnRight = document.querySelector('.audio-right');

let allowUpdate = true;
let isPlaying = false;
let isPaused = false;
let updateTimer = undefined;
let autoplay = true;

const updateAudioProgressBar = () => {
  if(!allowUpdate) return;

  const val = (audio.currentTime/audio.duration) * 100;
  progressBar.value = val;
  timerCurrProgress.innerHTML = Intl
  .DateTimeFormat('pt-BR', options)
  .format(audio.currentTime * 1000) + ' /';

  if(val === 100) {
    clearInterval(updateTimer);
    isPlaying = false;
    isPaused = false;
    btnPlay.textContent = '▶️';

    if(!autoplay) return;
    if(currId == 18) currId = 0;
    el = document.querySelector(`[data-id="${Number(currId) + 1}"`);
    setNewAudio(el);
    setTimeout(MusicStart, 400);
  } 
}

const Play = () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    isPaused = true;
    btnPlay.textContent = '▶️';

  } else if (isPaused) {
    audio.play();
    isPlaying = true;
    isPaused = false;
    btnPlay.textContent = '⏸';

  } else {
    MusicStart();
  }
}

const ChangeMusicPoint = () => {
  if(!isPlaying && !isPaused) MusicStart();
  allowUpdate = true;
  audio.currentTime = (progressBar.value/100) * audio.duration;
  updateTimer = CallUpdateBarTimer();

  if(isPaused) return;
  audio.play();
}

const CallUpdateBarTimer = () => {
  if(updateTimer) clearInterval(updateTimer);
  updateAudioProgressBar();
  const timer = setInterval(updateAudioProgressBar, 1000);
  return timer;
}

btnPlay.addEventListener('click', Play);
progressBar.addEventListener('click', ChangeMusicPoint);
progressBar.addEventListener('mousedown', () => allowUpdate = false);
progressBar.addEventListener('mouseup', () => allowUpdate = true);
btnVolumeDown.addEventListener('click', () => audio.volume -= 0.1);
btnVolumeUp.addEventListener('click', () => audio.volume += 0.1);

const options = {minute: 'numeric', second: 'numeric'}

function MusicStart () {
  audio.currentTime = 0;
  progressBar.value = 0;
  audio.play();
  isPlaying = true;
  btnPlay.textContent = '⏸';
  updateTimer = CallUpdateBarTimer();
  currMusicName.innerHTML = '&#x0266A; ' + audio.dataset.name;
  currMusicAutor.innerHTML = audio.dataset.autor;
  timerTotalDuration.innerHTML = '/ ' + Intl.DateTimeFormat('pt-BR', options)
  .format(audio.duration * 1000);
  selection();
}

const selection = () => {
  musicBox.querySelectorAll('.music')
  .forEach(el => el.classList
  .remove('highlighted') );

  musicBox.querySelector(`[data-id="${audio.dataset.id}"]`)
  .classList.add('highlighted');
}