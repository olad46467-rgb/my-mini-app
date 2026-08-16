const tg = window.Telegram?.WebApp;

/*
 * Telegram-only access
 */
if (!tg || !tg.initData) {
    document.body.innerHTML = `
        <div style="
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            text-align:center;
            padding:30px;
            margin:0;
            background:#101820;
            color:white;
            font-family:Arial,sans-serif;
        ">
            <div style="max-width:420px;">
                <div style="font-size:64px;margin-bottom:15px;">🎮</div>

                <h2 style="
                    margin:0 0 12px;
                    font-size:24px;
                ">
                    Game available on Telegram
                </h2>

                <p style="
                    color:#c5d0d8;
                    font-size:16px;
                    line-height:1.5;
                    margin:8px 0;
                ">
                    This game can only be played inside Telegram.
                </p>

                <p style="
                    color:#c5d0d8;
                    font-size:15px;
                    line-height:1.5;
                ">
                    Open it from our Telegram bot to start playing! 🚀
                </p>
            </div>
        </div>
    `;

    throw new Error("Telegram Mini App required");
}

tg.ready();
tg.expand();


/*
 * Telegram user
 */
const user = tg.initDataUnsafe?.user;

const userInfo =
    document.getElementById("userInfo");

if (userInfo) {

    if (user) {

        userInfo.textContent =
            `Hello ${user.first_name}! Your Mini App is working.`;

    } else {

        userInfo.textContent =
            "Welcome to your Telegram Mini App!";
    }
}


/*
 * Start button
 */
function startApp() {

    tg.showAlert(
        "🚀 Your Mini App is working!"
    );
}
