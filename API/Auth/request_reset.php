<?php
header("Access-Control-Allow-Origin: *"); // Permitir acceso desde cualquier dominio
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require __DIR__ . '/../config/db.php'; // Ajustar si es necesario
require __DIR__ . '/../vendor/autoload.php'; // Ajustar si es necesario

header("Content-Type: application/json");

// Leer datos JSON
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? null;

if (!$email) {
    echo json_encode(["error" => "Email es requerido"]);
    exit;
}

// Verificar si el email existe en la base de datos
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $user_id = $row["id"];

    // Generar un token único y una fecha de expiración (1 hora)
    $token = bin2hex(random_bytes(32));
    $expiration = date("Y-m-d H:i:s", strtotime("+1 hour"));

    // Guardar el token en la base de datos
    $stmt = $conn->prepare("UPDATE usuarios SET reset_token = ?, reset_expiration = ? WHERE id = ?");
    $stmt->bind_param("ssi", $token, $expiration, $user_id);
    $stmt->execute();

    // Enviar el email con el enlace de recuperación (simulado)
    $reset_link = "$token";
    
    // Simulamos el envío del email
    echo json_encode([
        "message" => "Se ha enviado un enlace de recuperación al correo.",
        "reset_link" => $reset_link // Esto sería reemplazado por un verdadero envío de correo
    ]);

} else {
    echo json_encode(["error" => "Email no encontrado"]);
}

$stmt->close();
$conn->close();
?>
