<?php
header("Access-Control-Allow-Origin: *"); // Permitir acceso desde cualquier dominio
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require __DIR__ . '/../config/db.php'; // Ajustar si es necesario
require __DIR__ . '/../vendor/autoload.php'; // Ajustar si es necesario

header("Content-Type: application/json");

// Leer los datos JSON
$data = json_decode(file_get_contents("php://input"), true);
$token = $data["token"] ?? null;
$new_password = $data["new_password"] ?? null;

if (!$token || !$new_password) {
    echo json_encode(["error" => "Token y nueva contraseña son requeridos"]);
    exit;
}

// Buscar el usuario con el token válido y no expirado
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE reset_token = ? AND reset_expiration > NOW()");
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $user_id = $row["id"];

    // Hashear la nueva contraseña
    $password_hashed = password_hash($new_password, PASSWORD_BCRYPT);

    // Actualizar la contraseña y limpiar el token
    $stmt = $conn->prepare("UPDATE usuarios SET password = ?, reset_token = NULL, reset_expiration = NULL WHERE id = ?");
    $stmt->bind_param("si", $password_hashed, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Contraseña actualizada con éxito"]);
    } else {
        echo json_encode(["error" => "Error al actualizar contraseña"]);
    }
} else {
    echo json_encode(["error" => "Token inválido o expirado"]);
}

$stmt->close();
$conn->close();
?>
