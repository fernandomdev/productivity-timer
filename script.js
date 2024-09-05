
/* ==================== StopWatch ==================== */

var interval = null;
var currentIncrement = 0;
var isPaused = false;
var initialised = false;
var clicked = false;
var hours = 0;
var minutes = 0;
var seconds = 0;

$(document).on('click', '.main_trigger', function (e) {
    if (clicked) {
        e.preventDefault();
        return false;
    }

    if (!initialised) {
        initialised = true;
        isPaused = false;
        $(".primary i").removeClass("fa-pause");
        $(".primary i").removeClass("fa-play");
        $(".primary i").addClass("fa-pause");
        $(".stopwatch").addClass("active");
        initialiseTimer();
    } else {
        $(".primary i").removeClass("fa-pause");
        $(".primary i").removeClass("fa-play");
        if (isPaused) {
            isPaused = false;
            $(".primary i").addClass("fa-pause");
            $(".stopwatch").addClass("active");
        } else {
            isPaused = true;
            $(".stopwatch").removeClass("active");
            $(".primary i").addClass("fa-play");
            $(document).prop('title', `En pausa`);
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
    $(".primary i").removeClass("fa-pause");
    $(".primary i").removeClass("fa-play");
    $(".primary i").addClass("fa-play");
    $(".stopwatch").removeClass("active");
}

// subir tiempo
$(document).on('click', '.send_trigger', function (e) {
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
});