<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        get();
        break;
    case 'POST':
        post();
        break;
    case 'PUT':
        update();
        break;
    case 'DELETE':
        delete();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}
//OK
function get() {
    global $conn;
    $result = $conn->query("SELECT * FROM detalle_pedidos");
    $empresas = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($empresas);
}
//FALTA
function update() {
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
//FALTA
function delete() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("DELETE FROM empresa WHERE id = ?");
    $stmt->bind_param("i", $data["id"]);
    $stmt->execute();
    echo json_encode(["message" => "Empresa eliminada"]);
}
?>
