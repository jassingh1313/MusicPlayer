console.log("Welcome to MusicPlayer")

//initializing song index
let songIndex = 0;
//creating an audio object
let audioElement = new Audio('songs/1.mp3');
//masterplay
let masterPlay = document.getElementById('masterPlay');
//progressbar
let myProgressBar = document.getElementById('myProgressBar');
//gif
let gif = document.getElementById('gif');
//song title in bottom section
let masterSongName = document.getElementById('masterSongName');
//songitems (the thumbnail div elements)
let songItems = Array.from(document.getElementsByClassName('songItem'));


//this is the "database" that will populate the website's thumbnails
//object array
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]


//populating html blocks (songItems) with our array of song data
songItems.forEach((element, i)=>{
    //tagname func returns an array and we choose the first element with the img tag
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//setting initial masterSongName with songIndex 0
masterSongName.innerText = songs[songIndex].songName;


//play/pause click for MASTER PLAY
//if audio is paused
//else, audioElement should be playing
masterPlay.addEventListener('click', ()=> {
    let thumbnails = Array.from(document.getElementsByClassName('songItemPlay'))
    if(audioElement.paused){ 
        
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        //gif appears when playing
        gif.style.opacity = 1;

        //whatever songIndex is current that thumbnail changes as well 
        thumbnails[songIndex].classList.remove('fa-play-circle');
        thumbnails[songIndex].classList.add('fa-pause-circle');

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        thumbnails[songIndex].classList.remove('fa-pause-circle');
        thumbnails[songIndex].classList.add('fa-play-circle');


    }

})


//Updating progress bar of song
//listen to time update event for audio
audioElement.addEventListener('timeupdate', ()=> {
    //update progress bar
    //no need for parseInt right?
    progress = audioElement.currentTime/audioElement.duration*100;

    //the progress is a number between 0 and 100 
    myProgressBar.value = progress;
})


//change position in song as progress bar is changed by user
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value/100 * audioElement.duration;
})


//making all plays when any particular song's thumbnail play button is clicked
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{ 
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}


//clicking the thumbnail buttons
//intial songIndex is 0
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
   
        //if song is playing
        if(!(audioElement.paused))
        {
            makeAllPlays();
            //pause song
            audioElement.pause();
            
            //make pause button into play button
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle')
            ;
            //make master pause to play as well.
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            //remove gif as well
            gif.style.opacity = 0;

        }
        
        //first:
        //if song is paused
        else if(audioElement.paused)
        {
            makeAllPlays();
            //then thumbnail play to pause button
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            //change song index:
            songIndex = parseInt(e.target.id);
            //change songname
            masterSongName.innerText = songs[songIndex].songName;
            //play song
            //Audio source changes
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            //when song playing gif shows up
            gif.style.opacity = 1;
        
            //masterplay goes from play to pause
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        

        }
            
        
    })

})




document.getElementById('next').addEventListener('click', ()=>{
    let thumbnails = Array.from(document.getElementsByClassName('songItemPlay'))
    if(songIndex == 9)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }

    //updating songName
    masterSongName.innerText = songs[songIndex].songName;
    //updating audiosource to next song
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    //updating masterplay
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    //want the appropriate thumbnail button to also change.
    //use the song index to change the icon
    makeAllPlays();
    //then retrieve the appropriate play button using updated songIndex and change it's classlist.
    string_songIndex = 
    thumbnails[songIndex].classList.remove('fa-play-circle');
    thumbnails[songIndex].classList.add('fa-pause-circle');



    
})




document.getElementById('previous').addEventListener('click', ()=>{
    let thumbnails = Array.from(document.getElementsByClassName('songItemPlay'))
    if(songIndex == 0)
    {
        songIndex = 9;
    }
    else
    {
        songIndex -= 1;
    }
    //updating masterPlay button and audio element
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');


    //want the appropriate thumbnail button to also change.
    //use the song index to change the icon
    makeAllPlays();
    //then retrieve the appropriate play button using updated songIndex and change it's classlist.
    string_songIndex = 
    thumbnails[songIndex].classList.remove('fa-play-circle');
    thumbnails[songIndex].classList.add('fa-pause-circle');

})

