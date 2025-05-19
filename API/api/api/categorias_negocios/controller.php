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
    $result = $conn->query("SELECT * FROM categorias_negocios");
    $empresas = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($empresas);
}
//OK
function post() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data["nombre"])) {
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    $stmt = $conn->prepare("INSERT INTO categorias_negocios (nombre,icono) VALUES (?,?)");
    $stmt->bind_param("ss", $data["nombre"],$data["icono"]);
    $stmt->execute();
    echo json_encode(["message" => "registro creada"]);
}

function update() {
    global $conn;
    $rawData = file_get_contents("php://input");

    $data = json_decode($rawData, true);

    file_put_contents("debug.txt", "RAW:\n" . $rawData . "\n\nPARSED:\n" . print_r($data, true));
    if (!isset($data['id']) || !isset($data['nombre'])) {
        echo json_encode(["error" => "Faltan parámetros requeridos (id o nombre)", "debug" => $data]);
        return;
    }
    $id = $data['id'];
    $nombre = $data['nombre'];
    $icono = $data['icono'];
    $stmt = $conn->prepare("UPDATE categorias_negocios SET nombre = ?,icono = ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode(["error" => "Error al preparar la consulta", "mysqli_error" => $conn->error]);
        return;
    }

    $stmt->bind_param("ssi", $nombre, $icono, $id);
    if ($stmt->execute()) {
        echo json_encode(["message" => "nombre actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar nombre", "mysqli_error" => $stmt->error]);
    }
    $stmt->close();
}


?>
