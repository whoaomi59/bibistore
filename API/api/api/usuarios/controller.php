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
    case 'POST':
        createUsuario();
        break;
    case 'PUT':
        updateUsuario();
        break;
    case 'DELETE':
        deleteUsuario();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}

function getUsuarios() {
    global $conn;
    try {
        if (!$conn) {
            throw new Exception("Conexión a la base de datos no establecida");
        }
        $sql = "SELECT * FROM usuarios";
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

function createUsuario() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data["nombre"], $data["email"], $data["password"])) {
            throw new Exception("Datos incompletos");
        }
        $empresa_id = $data["empresa_id"];
        $nombre = $data["nombre"];
        $email = $data["email"];
        $telefono = isset($data["telefono"]) ? $data["telefono"] : "";
        $password = password_hash($data["password"], PASSWORD_BCRYPT);
        $rol = $data["rol"];
        
        $sql = "INSERT INTO usuarios (empresa_id, nombre, email, telefono, password, rol)
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssss", $empresa_id, $nombre, $email, $telefono, $password, $rol);
        if (!$stmt->execute()) {
            throw new Exception("Error al crear usuario: " . $stmt->error);
        }
        echo json_encode(["message" => "Usuario creado con éxito"]);
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

function updateUsuario() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data["nombre"], $data["telefono"], $data["rol"], $data["id"])) {
            throw new Exception("Datos incompletos");
        }

        $id = $data["id"];
        $nombre = $data["nombre"];
        $telefono = $data["telefono"];
        $rol = $data["rol"];
        $ApiKey = isset($data["ApiKey"]) ? $data["ApiKey"] : null;

        $sql = "UPDATE usuarios SET nombre = ?, telefono = ?, rol = ?, ApiKey = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi", $nombre, $telefono, $rol, $ApiKey, $id);

        if (!$stmt->execute()) {
            throw new Exception("Error al actualizar usuario: " . $stmt->error);
        }

        echo json_encode(["message" => "Usuario actualizado"]);
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


function deleteUsuario() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data["id"])) {
            throw new Exception("ID requerido");
        }
        $id = $data["id"];
        
        $sql = "DELETE FROM usuarios WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            throw new Exception("Error al eliminar usuario: " . $stmt->error);
        }
        echo json_encode(["message" => "Usuario eliminado"]);
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