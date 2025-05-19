<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'POST':
        post();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}
function post() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        // Validar que lleguen los datos necesarios
        if (
            !isset(
                $data["numeroNegocio"], 
                $data["keyNegocios"], 
                $data["numero_Factura"], 
                $data["cliente_id"], 
                $data["negocio_id"], 
                $data["total"], 
                $data["estado"], 
                $data["productos"], 
                $data["ubicacion"], 
                $data["tipoUbicacion"], 
                $data["telefono"], 
                $data["costoEnvio"], 
                $data["fk_pedido"]
            )
        ) {
            throw new Exception("Datos incompletos");
        }

        $sql = "INSERT INTO mensajesapi (
                    numeroNegocio, keyNegocios, numero_Factura, cliente_id, 
                    negocio_id, total, estado, productos, ubicacion, 
                    tipoUbicacion, telefono, costoEnvio, fk_pedido
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sssiiisssssdi", 
            $data["numeroNegocio"], 
            $data["keyNegocios"], 
            $data["numero_Factura"], 
            $data["cliente_id"], 
            $data["negocio_id"], 
            $data["total"], 
            $data["estado"], 
            $data["productos"], 
            $data["ubicacion"], 
            $data["tipoUbicacion"], 
            $data["telefono"], 
            $data["costoEnvio"], 
            $data["fk_pedido"]
        );

        if (!$stmt->execute()) {
            throw new Exception("Error al insertar en mensajesapi: " . $stmt->error);
        }

        echo json_encode(["message" => "Registro en mensajesapi creado con éxito"]);
        
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