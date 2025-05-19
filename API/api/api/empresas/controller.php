<?php
header("Access-Control-Allow-Origin: *"); // Permitir acceso desde cualquier dominio
header("Content-Type: application/json"); // Responder en formato JSON
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');

require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        getEmpresas();
        break;
    case 'POST':
        createEmpresa();
        break;
    case 'PUT':
        updateEmpresa();
        break;
    case 'DELETE':
        deleteEmpresa();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}

function getEmpresas() {
    global $conn;
    $result = $conn->query("SELECT * FROM empresa limit 1 ");
    $empresas = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($empresas);
}

function createEmpresa() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data["nombre"], $data["email"])) {
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    $stmt = $conn->prepare("INSERT INTO empresa (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data["nombre"], $data["direccion"], $data["telefono"], $data["email"]);
    $stmt->execute();
    echo json_encode(["message" => "Empresa creada"]);
}

function updateEmpresa() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data["id"], $data["nombre"], $data["email"])) {
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    $stmt = $conn->prepare("UPDATE empresa SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $data["nombre"], $data["direccion"], $data["telefono"], $data["email"], $data["id"]);
    $stmt->execute();
    echo json_encode(["message" => "Empresa actualizada"]);
}

function deleteEmpresa() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("DELETE FROM empresa WHERE id = ?");
    $stmt->bind_param("i", $data["id"]);
    $stmt->execute();
    echo json_encode(["message" => "Empresa eliminada"]);
}
?>
