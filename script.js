console.log("Welcome to Spotify - Karan Aujla Edition");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Karan Aujla Songs
let songs = [
    {songName: "Chitta Kurta", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Don't Look", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Sheikh", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "No Need", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Haan Haige Aa", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Mexico", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Softly", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Gangsta", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Players", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "IDK HOW", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

// Load covers and song names
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    // Set a data attribute for reliable indexing
    element.querySelector('.songItemPlay').dataset.index = i;
});

// Play/Pause master button
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update Seekbar
audioElement.addEventListener('timeupdate', () => { 
    if(audioElement.duration){
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
        myProgressBar.value = progress;
    }
});

// Change position in song
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play icons
const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach((el) => {
        el.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
};

// Individual song play click
document.querySelectorAll('.songItemPlay').forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.dataset.index);
        e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});
