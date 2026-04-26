let audioCtx, analyser, dataArray, source;
let likedSongs = JSON.parse(localStorage.getItem('moosic_liked')) || [];

const music = {
    playlist: [],
    currentIndex: 0,
    currentTab: 'home',
    audio: document.getElementById('audio-engine'),

    loadDefaults: async () => {
        const res = await fetch('https://itunes.apple.com/search?term=lofi&limit=50&entity=song');
        const data = await res.json();
        music.playlist = data.results;
        ui.renderList(music.playlist);
    },

    search: async (e) => {
        if(e.key === "Enter") {
            const query = e.target.value;
            const res = await fetch(`https://itunes.apple.com/search?term=${query}&limit=60&entity=song`);
            const data = await res.json();
            music.playlist = data.results;
            music.currentTab = 'home';
            ui.renderList(music.playlist);
        }
    },

    toggleLike: (e, song) => {
        e.stopPropagation();
        const index = likedSongs.findIndex(s => s.trackId === song.trackId);
        if (index === -1) {
            likedSongs.push(song);
        } else {
            likedSongs.splice(index, 1);
        }
        localStorage.setItem('moosic_liked', JSON.stringify(likedSongs));
        ui.renderList(music.currentTab === 'home' ? music.playlist : likedSongs);
    },

    play: (index) => {
        const list = music.currentTab === 'home' ? music.playlist : likedSongs;
        if(!list[index]) return;
        music.currentIndex = index;
        const song = list[index];
        music.audio.src = song.previewUrl;
        document.getElementById('track-title').innerText = song.trackName;
        document.getElementById('track-artist').innerText = song.artistName;
        document.getElementById('track-art').src = song.artworkUrl100.replace('100x100', '600x600');
        music.initVisualizer();
        music.audio.play();
    },

    toggle: () => music.audio.paused ? music.audio.play() : music.audio.pause(),
    next: () => music.play(music.currentIndex + 1),
    prev: () => music.play(music.currentIndex - 1),
    seek: (val) => music.audio.currentTime = (val / 100) * music.audio.duration,

    initVisualizer: () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            source = audioCtx.createMediaElementSource(music.audio);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            analyser.fftSize = 128;
            music.draw();
        }
    },

    draw: () => {
        const canvas = document.getElementById('waveform');
        const ctx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        function renderFrame() {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let barWidth = (canvas.width / bufferLength) * 2;
            let x = 0;
            for(let i = 0; i < bufferLength; i++) {
                let barHeight = dataArray[i] / 2;
                ctx.fillStyle = `rgba(0, 255, 136, ${barHeight / 100})`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 2;
            }
        }
        renderFrame();
    }
};

music.audio.ontimeupdate = () => {
    const p = (music.audio.currentTime / music.audio.duration) * 100;
    document.getElementById('progress-bar-fill').style.width = p + "%";
    document.getElementById('time-current').innerText = formatTime(music.audio.currentTime);
    if(music.audio.duration) document.getElementById('time-total').innerText = formatTime(music.audio.duration);
};

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}