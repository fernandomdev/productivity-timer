<?php include './header.php' ?>
<body>
    <div class="container">

        <div class="title">
            <i class="fa-solid fa-brain"></i>
            <span>Productividad</span>
        </div>

        <div class="stopwatch main_trigger">
            <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>
        </div>

        <div class="buttons">
            <a class="secondary" href="stats.php" target="_BLANK">
                <i class="fa-solid fa-ellipsis"></i>
            </a>
            <button class="primary main_trigger">
                <i class="fa-solid fa-play"></i>
            </button>
            <button class="secondary send_trigger">
                <i class="fa-solid fa-forward"></i>
            </button>
        </div>

    </div>
</body>
</html>