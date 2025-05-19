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
    $result = $conn->query("SELECT rutas.nombre, rutas.path,rol,icono,estado
FROM rol_rutas
JOIN rutas ON rol_rutas.ruta_id = rutas.id WHERE estado = 0;");
    $empresas = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($empresas);
}
//OK
function post() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data["usuario_id"],$data["categoria_id"],$data["nombre"],$data["email"])) {
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    $stmt = $conn->prepare("INSERT INTO negocios (usuario_id, categoria_id, nombre, direccion, telefono, email) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("ssssss", $data["usuario_id"],$data["categoria_id"],$data["nombre"],$data["email"],$data["direccion"],$data["telefono"]);
    $stmt->execute();
    echo json_encode(["message" => "registro creado"]);
}

?>
