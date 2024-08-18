<?php

// definir datos de la conexión a la base de datos
$db_config = array(
    'host' => 'localhost',
    'port' => '443',
    'basedatos' => 'productivity-timer',
    'usuario' => 'root',
    'pass' => ''
);

// conexión a la base de datos
function conexion($db_config){
    try {
        $dsn = "mysql:host=" . $db_config['host'] . ";dbname=" . $db_config['basedatos'].";charset=utf8mb4";
        $pdo = new PDO($dsn, $db_config['usuario'], $db_config['pass']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if ($pdo) {
            return $pdo;
        } else {
            return false;
        }
    } catch (PDOException $e) {
        die($e->getMessage());
    } finally {
        if ($pdo) {
            $pdo = null;
        }
    }
}

date_default_timezone_set('America/Asuncion');
// llamar a la conexión y activar las variables $_SESSION
$conn = conexion($db_config);
session_start();

?>