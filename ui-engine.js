const ui = {
    tempAvatar: null,

    toggleAuth: () => {
        document.getElementById('login-box').classList.toggle('hidden');
        document.getElementById('signup-box').classList.toggle('hidden');
    },

    handleImageUpload: (input) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profile-img-display').src = e.target.result;
                ui.tempAvatar = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    },

    saveProfile: () => {
        const newName = document.getElementById('edit-username').value;
        const currentName = document.getElementById('edit-username').getAttribute('data-original') || newName;
        
        if (newName) {
            // Save avatar if updated
            if(ui.tempAvatar) {
                localStorage.setItem(`moosic_avatar_${newName}`, ui.tempAvatar);
            }
            alert("Profile saved successfully!");
        }
    },

    switchTab: (tab, element) => {
        music.currentTab = tab;
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        if(element) element.classList.add('active');

        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('trending-view').classList.add('hidden');
        document.getElementById('profile-view').classList.add('hidden');

        if(tab === 'home') {
            document.getElementById('home-view').classList.remove('hidden');
            document.getElementById('view-title').innerText = 'Discovery';
            ui.renderList(music.playlist, 'song-results');
        } else if(tab === 'trending') {
            document.getElementById('trending-view').classList.remove('hidden');
            music.loadTrending();
        } else if(tab === 'liked') {
            document.getElementById('home-view').classList.remove('hidden');
            document.getElementById('view-title').innerText = 'Liked Songs';
            ui.renderList(likedSongs, 'song-results');
        } else if(tab === 'profile') {
            document.getElementById('profile-view').classList.remove('hidden');
        }
    },

    renderList: (songs, targetId) => {
        const container = document.getElementById(targetId);
        if(!container) return;
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
            div.onclick = () => music.play(i, music.currentTab);
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