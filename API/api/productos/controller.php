<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($request_method) {
    case 'GET':
        get();
        break;
    case 'POST':
        if ($action === 'update') {
            update();
        } else {
            post();
        }
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
    $result = $conn->query("SELECT n.nombre AS Negocio, t.nombre AS Tipo,
                    p.nombre AS nombre_producto,
                    p.descripcion AS descripcion_productos,
                    p.id AS id_producto,
                    p.negocio_id AS id_negocio,
                    p.precio AS precio_producto,
                    p.estado AS estado_producto,
                    p.created_at AS fecha_producto,p.img,n.usuario_id,p.tipo_id AS idtipo
                    FROM productos p
                    JOIN negocios n ON p.negocio_id = n.id
                    JOIN tipos_productos t ON p.tipo_id = t.id");
 
    $empresas = [];
    while ($row = $result->fetch_assoc()) {
        // Convertir la imagen a Base64 si existe
        if (!empty($row['img'])) {
            $row['img'] = "data:image/jpeg;base64," . base64_encode($row['img']);
        } else {
            $row['img'] = null; // Si no hay imagen, devuelve null
        }
        $empresas[] = $row;
    }


    echo json_encode($empresas);
}
//OK
function post() {
    global $conn;

    $negocio_id = intval($_POST['negocio_id']);
    $tipo_id = intval($_POST['tipo_id']);
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = floatval($_POST['precio']);
    $estado = intval($_POST['estado']);

    if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        $img = file_get_contents($_FILES['img']['tmp_name']); // Leer imagen binaria
        
        $stmt = $conn->prepare("INSERT INTO productos (negocio_id, tipo_id, nombre, descripcion, precio, estado, img) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iissdib", $negocio_id, $tipo_id, $nombre, $descripcion, $precio, $estado, $null);
        $stmt->send_long_data(6, $img); // Enviar datos binarios de la imagen

        if ($stmt->execute()) {
            echo json_encode(["success" => "Producto guardado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al guardar el producto", "mysqli_error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Error al subir la imagen", "file_error" => $_FILES['img']['error']]);
    }
}
//OK
function update() {
    global $conn;

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    $id = intval($_POST['id']);
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = floatval($_POST['precio']);

        $hayLogo = isset($_FILES["img"]) && $_FILES["img"]["error"] === UPLOAD_ERR_OK;

        if ($hayLogo) {
            $logo = file_get_contents($_FILES["img"]["tmp_name"]);
            $sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, img = ? WHERE id = ?";
        
            $stmt = $conn->prepare($sql);
        
            if (!$stmt) {
                echo json_encode(["error" => "Error preparando consulta con logo", "mysqli_error" => $conn->error]);
                return;
            }
        
            $null = NULL;
            $stmt->bind_param("ssdbi", $nombre, $descripcion, $precio, $null, $id);
            $stmt->send_long_data(3, $logo); // índice 4 para img
        }else {
            $sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?";
    
            $stmt = $conn->prepare($sql);
    
            if (!$stmt) {
                echo json_encode(["error" => "Error preparando consulta sin logo", "mysqli_error" => $conn->error]);
                return;
            }
    
            $stmt->bind_param("ssdi", $nombre, $descripcion, $precio, $id);
        }
    
        if ($stmt->execute()) {
            echo json_encode(["message" => "Registro actualizado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al actualizar", "mysqli_error" => $stmt->error]);
        }
    
        $stmt->close();


}

//Ok
function delete() {
    global $conn;
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);
    if (!isset($data['id']) || !isset($data['estado'])) {
        echo json_encode(["error" => "Faltan parámetros requeridos (id o estado)", "debug" => $data]);
        return;
    }
    $id = $data['id'];
    $estado = $data['estado'];
    $stmt = $conn->prepare("UPDATE productos SET estado = ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode(["error" => "Error al preparar la consulta", "mysqli_error" => $conn->error]);
        return;
    }

    $stmt->bind_param("ii", $estado, $id);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Estado actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar estado", "mysqli_error" => $stmt->error]);
    }
    $stmt->close();
}
?>
