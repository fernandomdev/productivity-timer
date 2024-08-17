
/* ==================== StopWatch ==================== */

var interval = null;
var currentIncrement = 0;
var isPaused = false;
var initialised = false;
var clicked = false;
var hours = 0;
var minutes = 0;
var seconds = 0;

$(document).on('keypress', function (e) {
    if (e.code == "Space") {
        if (clicked) {
            e.preventDefault();
            return false;
        }

        if (!initialised) {
            initialised = true;
            isPaused = false;
            $(".stopwatch i").removeClass("fa-play");
            $(".stopwatch i").removeClass("fa-pause");
            $(".stopwatch i").addClass("fa-play");
            initialiseTimer();
        } else {
            $(".stopwatch i").removeClass("fa-play");
            $(".stopwatch i").removeClass("fa-pause");
            if (isPaused) {
                isPaused = false;
                $(".stopwatch i").addClass("fa-play");
            } else {
                isPaused = true;
                $(".stopwatch i").addClass("fa-pause");
                $(document).prop('title', `En pausa`);
            }
        }
    }
});

function initialiseTimer() {
    interval = setInterval(function () {
        if (isPaused) return;
        var current = setCurrentIncrement();
        updateStopwatch(current);
    }, 1000)
}

function updateStopwatch(increment) {
    hours = Math.floor(increment / 3600);
    minutes = Math.floor((increment - (hours * 3600)) / 60);
    seconds = increment - (hours * 3600) - (minutes * 60);

    if (hours > 99){
        reset();
    }
    let horas = hours < 10 ? ("0" + hours.toString()) : hours.toString();
    let minutos = minutes < 10 ? ("0" + minutes.toString()) : minutes.toString();
    let segundos = seconds < 10 ? ("0" + seconds.toString()) : seconds.toString();

    $(".hours").text(horas);
    $(".minutes").text(minutos);
    $(".seconds").text(segundos);
    $(document).prop('title', `${horas}:${minutos}:${segundos}`);

}

function setCurrentIncrement() {
    currentIncrement += 1;
    return currentIncrement;
}

function reset() {
    currentIncrement = 0;
    isPaused = true;
    initialised = false;
    clearInterval(interval);
    $(".hours").text("00");
    $(".minutes").text("00");
    $(".seconds").text("00");
    $(".stopwatch i").removeClass("fa-pause");
    $(".stopwatch i").removeClass("fa-play");
}

// subir tiempo
$(document).on('keypress', function (e) {
    if (e.code == "Enter") {
        if (confirm("¿Está seguro de que desea subir su tiempo?") == true) {
            let horas = hours < 10 ? ("0" + hours.toString()) : hours.toString();
            let minutos = minutes < 10 ? ("0" + minutes.toString()) : minutes.toString();
            let segundos = seconds < 10 ? ("0" + seconds.toString()) : seconds.toString();
            $.ajax({
                type: "POST",
                url: "control.php",
                data: {
                    action: 'savetime',
                    time: `${horas}:${minutos}:${segundos}`
                },
                async: false,
                error: function(xhr, status, error) {
                    alert(xhr.responseText);
                },
                dataType: 'text',
                success: function(response){
                    // reset();
                    alert(response);
                    location.reload();
                }
            });
        }
    }
});