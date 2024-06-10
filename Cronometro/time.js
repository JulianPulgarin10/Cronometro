document.addEventListener("DOMContentLoaded", function() {
    const startButton1 = document.getElementById('start-button1');
    const timeDisplay1 = document.getElementById('time1');
    const minutesInput1 = document.getElementById('minutes1');
    const secondsInput1 = document.getElementById('seconds1');
    const statusMessage1 = document.getElementById('status-message1');

    const timeDisplay2 = document.getElementById('time2');
    const minutesInput2 = document.getElementById('minutes2');
    const secondsInput2 = document.getElementById('seconds2');
    const statusMessage2 = document.getElementById('status-message2');

    let timerInterval1, timerInterval2;

    function startTimer(duration, timeDisplay, statusMessage, nextCallback) {
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
                if (nextCallback) nextCallback();
            }
        }, 1000);
        return interval;
    }

    startButton1.addEventListener('click', function() {
        clearInterval(timerInterval1);
        clearInterval(timerInterval2);

        let minutes1 = parseInt(minutesInput1.value, 10) || 0;
        let seconds1 = parseInt(secondsInput1.value, 10) || 0;
        let duration1 = minutes1 * 60 + seconds1;

        if (duration1 > 0) {
            timerInterval1 = startTimer(duration1, timeDisplay1, statusMessage1, function() {
                let minutes2 = parseInt(minutesInput2.value, 10) || 0;
                let seconds2 = parseInt(secondsInput2.value, 10) || 0;
                let duration2 = minutes2 * 60 + seconds2;

                if (duration2 > 0) {
                    timerInterval2 = startTimer(duration2, timeDisplay2, statusMessage2);
                } else {
                    alert("Por favor, ingrese un tiempo válido para el segundo cronómetro.");
                }
            });
        } else {
            alert("Por favor, ingrese un tiempo válido para el primer cronómetro.");
        }
    });
});

