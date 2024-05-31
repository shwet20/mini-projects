document.addEventListener("DOMContentLoaded", () => {
    const links = [
        {
            id: "Heater-1",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
            keyLetter: "q"
        },
        {
            id: "Heater-2",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
            keyLetter: "w"
        },
        {
            id: "Heater-3",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
            keyLetter: "e"
        },
        {
            id: "Heater-4",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
            keyLetter: "a"
        },
        {
            id: "Clap",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
            keyLetter: "s"
        },
        {
            id: "Open-HH",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
            keyLetter: "d"
        },
        {
            id: "Kick-n'-Hat",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
            keyLetter: "z"
        },
        {
            id: "Kick",
            path: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
            keyLetter: "x"
        },
        {
            id: "Closed-HH",
            path: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
            keyLetter: "c"
        }
    ];

    let currentSound = "";
    let drumOn = false;

    function setSound(sound) {
        currentSound = sound;
        document.getElementById("display").innerText = sound;
    }

    function handleKeydown(event) {
        if (!drumOn) return;
        const key = event.key.toLowerCase();
        const link = links.find(l => l.keyLetter === key);
        if (link) {
            setSound(link.id);
            const audio = document.getElementById(link.keyLetter).querySelector("audio");
            audio.play();
        }
    }

    function handleClick(event) {
        if (!drumOn) return;
        const key = event.currentTarget.id;
        const link = links.find(l => l.keyLetter === key);
        if (link) {
            setSound(link.id);
            const audio = document.getElementById(link.keyLetter).querySelector("audio");
            audio.play();
        }
    }

    function togglePower() {
        drumOn = !drumOn;
        const inner = document.querySelector(".inner");
        inner.classList.toggle("float-right", drumOn);
        inner.classList.toggle("float-left", !drumOn);
        if (!drumOn) {
            setSound("");
        }
    }

    function createButton(link) {
        const button = document.createElement("div");
        button.className = "drum-pad";
        button.id = link.keyLetter;
        button.innerHTML = `<audio class="clip" id="${link.keyLetter.toUpperCase()}" src="${link.path}"></audio>${link.keyLetter.toUpperCase()}`;
        button.addEventListener("click", handleClick);
        return button;
    }

    function createApp() {
        const app = document.createElement("div");
        app.id = "root";
        app.innerHTML = `
            <div class="inner-container" id="drum-machine">
            <h3>Turn On The Power & Volume Up To Create Your Own Music</h3>
                <div class="pad-board"></div>
                
                <div class="controls-container">
                    <div class="control">
                        <p>Power</p>
                        <div class="select">
                            <div class="inner float-left"></div>
                        </div>
                    </div>
                    <div id="display"></div>
                </div>
            </div>
        `;

        const padBoard = app.querySelector(".pad-board");
        links.forEach(link => {
            padBoard.appendChild(createButton(link));
        });

        const powerButton = app.querySelector(".select");
        powerButton.addEventListener("click", togglePower);

        return app;
    }

    document.body.appendChild(createApp());
    document.addEventListener("keydown", handleKeydown);
});
