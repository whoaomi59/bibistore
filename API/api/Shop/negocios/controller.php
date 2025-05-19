<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];
$action = isset($_GET['Get']) ? $_GET['Get'] : '';

switch ($request_method) {
    case 'GET':
        if ($action === 'Get') {
            get();
        }
        if ($action === 'GetOne') {
            GetOneNegocio();
        }
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
function utf8_encode_array($array) {
    array_walk_recursive($array, function (&$item) {
        if (is_string($item)) {
            $item = utf8_encode($item);
        }
    });
    return $array;
}

function get() {
    global $conn;
    $result = $conn->query("SELECT * FROM negocios n LEFT JOIN ( SELECT * FROM negocios_imagenes WHERE id_Negocios IN ( SELECT MAX(id_Negocios) FROM negocios_imagenes GROUP BY negocios_id ) ) i ON i.negocios_id = n.id ORDER BY n.id DESC;");

    $empresas = [];

    while ($row = $result->fetch_assoc()) {
        // Convertir la imagen a Base64 si existe
        if (!empty($row['logo'])) {
            $row['logo'] = "data:image/jpeg;base64," . base64_encode($row['logo']);
            $row['img'] = "data:image/jpeg;base64," . base64_encode($row['img']);
        } else {
            $row['logo'] = null; // Si no hay imagen, devuelve nullimg
            $row['img'] = null; // Si no hay imagen, devuelve nullimg
        }
        $empresas[] = $row;
    }

    echo json_encode($empresas);
}

function GetOneNegocio() {
    global $conn;
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    
    if ($id === null) {
        http_response_code(400);
        echo json_encode(['error' => 'ID del negocio es requerido']);
        return;
    }
            $query = "
            SELECT * FROM negocios n
            LEFT JOIN (
                SELECT * FROM negocios_imagenes
                WHERE id_Negocios IN (
                    SELECT MAX(id_Negocios)
                    FROM negocios_imagenes
                    GROUP BY negocios_id
                )
            ) i ON i.negocios_id = n.id
            WHERE n.id = $id
            ORDER BY n.id DESC
            ";
    
    $result = $conn->query($query);
    $empresas = [];
    while ($row = $result->fetch_assoc()) {
        if (!empty($row['logo'])) {
            $row['logo'] = "data:image/jpeg;base64," . base64_encode($row['logo']);
            $row['img'] = "data:image/jpeg;base64," . base64_encode($row['img']);
        } else {
            $row['logo'] = null;
            $row['img'] = null;
        }
        $empresas[] = $row;
    }
    echo json_encode($empresas);
}
?>
