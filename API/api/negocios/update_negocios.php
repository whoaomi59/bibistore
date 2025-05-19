<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'POST':
        update();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}

function update() {
    global $conn;

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $id = $_POST["id"] ?? null;
    $usuario_id = $_POST["usuario_id"] ?? null;
    $categoria_id = $_POST["categoria_id"] ?? null;
    $nombre = $_POST["nombre"] ?? null;
    $direccion = $_POST["direccion"] ?? null;
    $telefono = $_POST["telefono"] ?? null;
    $ApiKey = $_POST["ApiKey"] ?? null;
    $email = $_POST["email"] ?? null;
    $horario_inicial = $_POST["Horario_inicial"] ?? null;
    $horario_final = $_POST["Horario_final"] ?? null;

    if (!$id || !$usuario_id || !$categoria_id || !$nombre || !$direccion || !$telefono || !$email || !$horario_inicial || !$horario_final) {
        echo json_encode(["error" => "Faltan datos obligatorios"]);
        return;
    }

    $hayLogo = isset($_FILES["logo"]) && $_FILES["logo"]["error"] === UPLOAD_ERR_OK;

    if ($hayLogo) {
        $logo = file_get_contents($_FILES["logo"]["tmp_name"]);
        $sql = "UPDATE negocios SET 
                    usuario_id = ?,  
                    categoria_id = ?, 
                    nombre = ?, 
                    direccion = ?, 
                    telefono = ?, 
                    ApiKey = ?, 
                    email = ?, 
                    Horario_inicial = ?, 
                    Horario_final = ?, 
                    logo = ?
                WHERE id = ?";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            echo json_encode(["error" => "Error preparando consulta con logo", "mysqli_error" => $conn->error]);
            return;
        }

        $null = NULL; // marcador temporal
        $stmt->bind_param("iisssssssbi",
            $usuario_id,
            $categoria_id,
            $nombre,
            $direccion,
            $telefono,
            $ApiKey,
            $email,
            $horario_inicial,
            $horario_final,
            $null, // el blob se manda con send_long_data
            $id
        );

        // Aquí se envía el logo
        $stmt->send_long_data(9, $logo); // índice 8 porque es el noveno parámetro (base 0)

    } else {
        $sql = "UPDATE negocios SET 
                    usuario_id = ?,  
                    categoria_id = ?, 
                    nombre = ?, 
                    direccion = ?, 
                    telefono = ?,
                    ApiKey = ?,
                    email = ?, 
                    Horario_inicial = ?, 
                    Horario_final = ?
                WHERE id = ?";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            echo json_encode(["error" => "Error preparando consulta sin logo", "mysqli_error" => $conn->error]);
            return;
        }

        $stmt->bind_param("iisssssssi",
            $usuario_id,
            $categoria_id,
            $nombre,
            $direccion,
            $telefono,
            $ApiKey,
            $email,
            $horario_inicial,
            $horario_final,
            $id
        );
    }

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registro actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar", "mysqli_error" => $stmt->error]);
    }

    $stmt->close();
}

?>
