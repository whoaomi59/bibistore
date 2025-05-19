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

    $negocio_id = isset($_GET['negocio_id']) ? intval($_GET['negocio_id']) : 0;

    if ($negocio_id > 0) {
        $query = "SELECT 
                    p.id AS id_producto, 
                    p.nombre AS Producto, 
                    p.precio, 
                    p.img, 
                    n.nombre AS Negocio, 
                    t.nombre AS Tipo, 
                    p.negocio_id AS negocio_id,
                    p.estado
                    FROM productos p
                    JOIN negocios n ON p.negocio_id = n.id
                    JOIN tipos_productos t ON p.tipo_id = t.id 
                    WHERE p.negocio_id = ?";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $negocio_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $productos = [];
        while ($row = $result->fetch_assoc()) {
            // Convertir la imagen a Base64 si existe
            if (!empty($row['img'])) {
                $row['img'] = "data:image/jpeg;base64," . base64_encode($row['img']);
            } else {
                $row['img'] = null; // Si no hay imagen, devuelve null
            }
            $productos[] = $row;
        }

        echo json_encode($productos);
        $stmt->close();
    } else {
        echo json_encode(["error" => "ID inválido"]);
    }
}


?>
