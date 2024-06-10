document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    
    const timers = [
        {
            timeDisplay: document.getElementById('time1'),
            minutesInput: document.getElementById('minutes1'),
            secondsInput: document.getElementById('seconds1'),
            statusMessage: document.getElementById('status-message1')
        },
        {
            timeDisplay: document.getElementById('time2'),
            minutesInput: document.getElementById('minutes2'),
            secondsInput: document.getElementById('seconds2'),
            statusMessage: document.getElementById('status-message2')
        },
        {
            timeDisplay: document.getElementById('time3'),
            minutesInput: document.getElementById('minutes3'),
            secondsInput: document.getElementById('seconds3'),
            statusMessage: document.getElementById('status-message3')
        }
    ];

    function startTimer(duration, timeDisplay, statusMessage) {
        let timer = duration, minutes, seconds;
        statusMessage.textContent = "Ejecutándose";
        statusMessage.classList.add("ejecutando");

        const interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timeDisplay.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                statusMessage.textContent = "En Pausa";
                statusMessage.classList.remove("ejecutando");
            }
        }, 1000);
        return interval;
    }

    startButton.addEventListener('click', function() {
        timers.forEach(timer => {
            clearInterval(timer.interval);

            let minutes = parseInt(timer.minutesInput.value, 10) || 0;
            let seconds = parseInt(timer.secondsInput.value, 10) || 0;
            let duration = minutes * 60 + seconds;

            if (duration > 0) {
                timer.interval = startTimer(duration, timer.timeDisplay, timer.statusMessage);
            } else {
                alert("Por favor, ingrese un tiempo válido para todos los cronómetros.");
            }
        });
    });
});
