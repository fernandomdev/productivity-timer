<?php
include('main.php');
$sql = "SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( `reg_time` ) ) ) AS suma FROM registros WHERE reg_fecha = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([date("Y-m-d")]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($data) > 0){
    $hoy = $data[0]['suma'];
}

$sql = "SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( `reg_time` ) ) ) AS suma FROM registros WHERE reg_fecha <= ? AND reg_fecha >= ?";
$stmt = $conn->prepare($sql);
$stmt->execute([date("Y-m-d"), date('Y-m-d', strtotime('-7 day', strtotime(date("Y-m-d"))))]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($data) > 0){
    $semana = $data[0]['suma'];
}

$sql = "SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( `reg_time` ) ) ) AS suma FROM registros WHERE reg_fecha <= ? AND reg_fecha >= ?";
$stmt = $conn->prepare($sql);
$stmt->execute([date("Y-m-d"), date("Y-m-01")]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($data) > 0){
    $mes = $data[0]['suma'];
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productivity</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./script.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet"/>
    <link rel="shortcut icon" href="https://icons.iconarchive.com/icons/flat-icons.com/flat/512/Clock-icon.png" type="image/x-icon">
</head>
<body>
    <div class="header">
        <div class="stat">Hoy: <span><?php echo $hoy ?></span></div>
        <div class="stat">Esta semana: <span><?php echo $semana ?></span></div>
        <div class="stat">Este mes: <span><?php echo $mes ?></span></div>
    </div>
    <div class="stopwatch">
        <i class="fa-solid"></i>
        <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>
    </div>
</body>
</html>