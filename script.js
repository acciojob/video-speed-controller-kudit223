/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const volume=ranges[0];
const playback=ranges[1];
const minus10=skipButtons[0];
const plus25=skipButtons[1];
const body=document.querySelector('body')


//play/pause
toggle.addEventListener('click',(e)=>{
  if(video.paused){
    video.play();
    toggle.innerHTML='<span  class="pause">❚ ❚</span>';
  }
  else {
    video.pause();
    toggle.textContent="►";
  }
});
video.addEventListener('ended',(e)=>{
  toggle.textContent="►";
});
//Volume
volume.addEventListener('input',(e)=>{
  video.volume=volume.value;
})
//Playback speed
playback.addEventListener('input',(e)=>{
  video.playbackRate=playback.value;
});

//Progress bar
video.addEventListener('timeupdate',(e)=>{
  let per=(video.currentTime/video.duration)*100;
  progressBar.style.flexBasis=`${per}%`;
});

//Skip/Seek buttons
minus10.addEventListener('click',(e)=>{
  video.currentTime-=10;
});
plus25.addEventListener('click',(e)=>{
  video.currentTime+=25;
});

//Video's src invalid
video.addEventListener('error',(e)=>{
  let error=e.target.error;
  let errorMessage=document.createElement('h1');
  errorMessage.setAttribute('class','errorMsg');
  switch (error.code) {
    case error.MEDIA_ERR_ABORTED:
      errorMessage.textContent="Video playback aborted by user.";
      break;
    case error.MEDIA_ERR_NETWORK:
      errorMessage.textContent="Network error while downloading the video.";
      break;
    case error.MEDIA_ERR_DECODE:
      errorMessage.textContent="Video decoding failed — unsupported format or corrupted file.";
      break;
    case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
      errorMessage.textContent="Video source not supported or missing.";
      break;
    default:
      errorMessage.textContent="Unknown video error occurred.";
      break;
  }
  body.prepend(errorMessage);
  //error handling
  video.src="https://www.w3schools.com/html/mov_bbb.mp4";
});