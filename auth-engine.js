const auth = {
    signup: () => {
        const u = document.getElementById('new-user').value;
        const p = document.getElementById('new-pass').value;
        if(u && p) {
            localStorage.setItem(`moosic_user_${u}`, p);
            alert("Account Registered! Please Login.");
            ui.toggleAuth();
        }
    },
    login: () => {
        const u = document.getElementById('user-id').value;
        const p = document.getElementById('user-pass').value;
        if(localStorage.getItem(`moosic_user_${u}`) === p && u !== "") {
            document.getElementById('auth-overlay').classList.add('hidden');
            document.getElementById('main-app').classList.remove('hidden');
            music.loadDefaults();
        } else {
            alert("Invalid Credentials");
        }
    },
    logout: () => location.reload()
};