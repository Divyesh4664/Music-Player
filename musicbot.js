console.log("hi")
let songIndex=0;
let audioElement = new Audio('Girlslikeyou.mp3');
var play = document.getElementById("ply")
let bar = document.getElementById("volume")
let gif = document.getElementById("gifimg")
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songs'));

let songs = [
    {songName:"Shiddat" , filepath:"", coverpath:""},
    {songName:"You Belong With Me" , filepath:"", coverpath:""},
    {songName:"Jaan Ban Gaye" , filepath:"", coverpath:""},
    {songName:"Itni Si Baat Hai" , filepath:"", coverpath:""},
    {songName:"Mai Rahoon Ya Na Rahoon" , filepath:"", coverpath:""},
    {songName:"Qaafirana" , filepath:"", coverpath:""},
    {songName:"Raatan Lambiyan" , filepath:"", coverpath:""},
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

play.addEventListener('click',()=>{

    
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        play.classList.remove('fa-play')
        play.classList.add('fa-pause')
        gif.style.opacity=1
    }
    else{
        audioElement.pause();
        play.classList.remove('fa-pause')
        play.classList.add('fa-play')
        gif.style.opacity=0
    }
})

audioElement.addEventListener('timeupdate',()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    bar.value = progress
})

bar.addEventListener('change',()=>
{
    audioElement.currentTime = (bar.value * audioElement.duration)/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
})
