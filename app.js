const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById("userInfo").textContent =
        `Hello ${user.first_name}! Your Mini App is working.`;
} else {
    document.getElementById("userInfo").textContent =
        "Open this app inside Telegram to see your Telegram information.";
}

function startApp() {
    tg.showAlert("🚀 Your Mini App is working!");
}
