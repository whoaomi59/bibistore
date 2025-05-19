<?php
header("Access-Control-Allow-Origin: *"); // Permitir acceso desde cualquier dominio
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require __DIR__ . '/../config/db.php'; // Ajustar si es necesario
require __DIR__ . '/../vendor/autoload.php'; // Ajustar si es necesario


use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$secret_key = "secreto_super_seguro";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

   

    $sql = "SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row["password"])) {
            $payload = [
                "id" => $row["id"],
                "nombre" => $row["nombre"],
                "email" => $row["email"],
                "rol" => $row["rol"],
                "exp" => time() + (60 * 60) // 1 hora
            ];

            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            echo json_encode(["token" => $jwt]);
        } else {
            echo json_encode(["error" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["error" => "Usuario no encontrado"]);
    }
}
?>
