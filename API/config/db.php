<?php
$host = "localhost";
$user = "runwayco_runwayco";
$pass = "L(4Yc0_eBYMC";
$dbname = "runwayco_bd";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Muestra errores de MySQL

try {
    $conn = new mysqli($host, $user, $pass, $dbname);

    mysqli_set_charset($conn, 'utf8mb4');
    
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
} catch (\Throwable $e) {
    echo json_encode(["error" => "Error: " . $e->getMessage()], JSON_PRETTY_PRINT);
}
?>



 