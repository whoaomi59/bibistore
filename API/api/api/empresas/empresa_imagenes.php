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
        post();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}
//OK
function get() {
    global $conn;
    $result = $conn->query("SELECT * FROM `empresa_imagenes` ORDER BY id DESC;");
 
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

    if (!isset($_POST['empresa_id'])) {
        echo json_encode(["error" => "Falta empresa_id"]);
        return;
    }

    $empresa_id = intval($_POST['empresa_id']);

    if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        $img = file_get_contents($_FILES['img']['tmp_name']);

        $stmt = $conn->prepare("INSERT INTO empresa_imagenes (empresa_id, img) VALUES (?, ?)");
        if (!$stmt) {
            echo json_encode(["error" => "Error preparando la consulta", "mysqli_error" => $conn->error]);
            return;
        }

        $null = NULL;
        $stmt->bind_param("ib", $empresa_id, $null);
        $stmt->send_long_data(1, $img); // segundo parámetro = índice 1

        if ($stmt->execute()) {
            echo json_encode(["success" => "Imagen guardada correctamente"]);
        } else {
            echo json_encode(["error" => "Error al guardar la imagen", "mysqli_error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            "error" => "Error al subir la imagen",
            "file_error" => $_FILES['img']['error'] ?? 'No se recibió ningún archivo'
        ]);
    }
}

?>
