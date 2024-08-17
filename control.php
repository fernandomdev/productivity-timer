<?php
include('main.php');

if(!empty($_POST['action']) && $_POST['action'] == 'savetime') {
    $sql = "INSERT INTO registros (reg_fecha, reg_time) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ date("Y-m-d"), $_POST['time'] ]);
    die("Registrado correctamente!");
}


?>