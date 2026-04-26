const ui = {
    toggleAuth: () => {
        document.getElementById('login-box').classList.toggle('hidden');
        document.getElementById('signup-box').classList.toggle('hidden');
    },

    switchTab: (tab, element) => {
        music.currentTab = tab;
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        element.classList.add('active');
        document.getElementById('view-title').innerText = tab === 'home' ? 'Discovery' : 'Liked Songs';
        ui.renderList(tab === 'home' ? music.playlist : likedSongs);
    },

    renderList: (songs) => {
        const container = document.getElementById('song-results');
        container.innerHTML = "";
        songs.forEach((s, i) => {
            const isLiked = likedSongs.some(ls => ls.trackId === s.trackId);
            const div = document.createElement('div');
            div.className = "song-item-premium";
            div.innerHTML = `
                <div style="display:flex; align-items:center;">
                    <img src="${s.artworkUrl60}">
                    <div>
                        <div style="font-weight:600; font-size:0.9rem;">${s.trackName}</div>
                        <div style="color:#a0a0a0; font-size:0.8rem;">${s.artistName}</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:15px;">
                    <i class="fa-solid fa-heart heart-icon ${isLiked ? 'liked' : ''}" 
                       onclick="music.toggleLike(event, ${JSON.stringify(s).replace(/"/g, '&quot;')})"></i>
                    <i class="fa-solid fa-circle-play" style="color:var(--accent); font-size:1.2rem;"></i>
                </div>
            `;
            div.onclick = () => music.play(i);
            container.appendChild(div);
        });
    }
};

document.getElementById('audio-engine').onplay = () => {
    document.getElementById('play-pause').innerHTML = '<i class="fa-solid fa-pause"></i>';
};
document.getElementById('audio-engine').onpause = () => {
    document.getElementById('play-pause').innerHTML = '<i class="fa-solid fa-play"></i>';
};