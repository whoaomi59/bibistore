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
        getUsuarios();
        break;
    default:
        echo json_encode(["error" => "M茅todo no permitido"]);
}

function getUsuarios() {
    global $conn;
    try {
        if (!$conn) {
            throw new Exception("Conexi贸n a la base de datos no establecida");
        }
        $sql = "SELECT telefono,ApiKey FROM `usuarios` where rol='admin'";
        $result = $conn->query($sql);
        if (!$result) {
            throw new Exception("Error en la consulta: " . $conn->error);
        }
        $usuarios = [];
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }
            echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(["message" => "No hay usuarios"]);
        }
    } catch (Exception $e) {
        $error = [
            "error" => $e->getMessage(),
            "linea" => $e->getLine(),
            "archivo" => $e->getFile()
        ];
        http_response_code(500);
        echo json_encode($error);
    }
}

?>