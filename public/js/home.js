function toggleVideo(){
    const trailer=document.querySelector('.trailer');
    const video=document.querySelector('video');

    trailer.classList.toggle('active');
    video.currentTime=0;
    video.pause();
}

const demo=document.querySelector('.demo');
demo.addEventListener("click",toggleVideo);

const democlose=document.querySelector('.close');
democlose.addEventListener("click",toggleVideo);

