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
        Update();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}
//OK
function get() {
    global $conn;
    try {
        $result = $conn->query("SELECT pe.id AS id_pedido, u.nombre AS usuario_pedido, n.logo AS logo_pedido, n.nombre AS nombre_negocio,pe.estado, pe.total, n.usuario_id,n.direccion AS dire_negocio,pe.Telefono AS tel_user_pedi,pe.ubicacion AS ubica_domici,pe.tipoUbicacion,n.direccion AS direc_negocio ,pe.created_at AS fecha_pedido,n.id AS id_negocio FROM pedidos pe LEFT JOIN usuarios u ON pe.cliente_id = u.id LEFT JOIN negocios n ON pe.negocio_id = n.id ORDER BY pe.id DESC");
     
        $data = [];
        while ($row = $result->fetch_assoc()) {
            // Convertir la imagen a Base64 si existe
            if (!empty($row['logo_pedido'])) {
                $row['logo_pedido'] = "data:image/jpeg;base64," . base64_encode($row['logo_pedido']);
            } else {
                $row['logo_pedido'] = null; // Si no hay imagen, devuelve null
            }
            $data[] = $row;
        }
    
    
        echo json_encode($data);
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
//OK
function post() {
    global $conn;
    
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["cliente_id"], $data["negocio_id"], $data["total"], $data["estado"], $data["productos"]) || !is_array($data["productos"])) {
        echo json_encode(["error" => "Faltan datos o formato incorrecto"]);
        return;
    }

    $conn->begin_transaction();

    try {
        // Insertar el pedido
        $stmt = $conn->prepare("INSERT INTO pedidos (cliente_id, negocio_id, domiciliario_id, total, estado,ubicacion,tipoUbicacion,Telefono) VALUES (?, ?, ?, ?, ?,?,?,?)");
        $stmt->bind_param(
            "iiidssss", 
            $data["cliente_id"], 
            $data["negocio_id"], 
            $data["domiciliario_id"], 
            $data["total"], 
            $data["estado"],
            $data["ubicacion"],
            $data["tipoUbicacion"],
            $data["Telefono"]
        );

        if (!$stmt->execute()) {
            throw new Exception("Error al crear el pedido: " . $stmt->error);
        }

        // Obtener el ID del pedido recién creado
        $pedido_id = $conn->insert_id;

        // Insertar los detalles del pedido
        $stmt_detalle = $conn->prepare("INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)");

        foreach ($data["productos"] as $producto) {
            if (!isset($producto["producto_id"], $producto["cantidad"], $producto["precio_unitario"], $producto["subtotal"])) {
                throw new Exception("Datos incompletos en productos: " . json_encode($producto));
            }

            $stmt_detalle->bind_param(
                "iiidd", 
                $pedido_id, 
                $producto["producto_id"], 
                $producto["cantidad"], 
                $producto["precio_unitario"], 
                $producto["subtotal"]
            );

            if (!$stmt_detalle->execute()) {
                throw new Exception("Error al insertar detalle del pedido: " . $stmt_detalle->error);
            }
        }

        // Ahora hacer el SELECT que quieres
        $stmt_info = $conn->prepare("
            SELECT p.id, n.telefono, n.ApiKey,n.direccion 
            FROM pedidos p 
            JOIN negocios n ON p.negocio_id = n.id 
            WHERE p.id = ?
        ");
        $stmt_info->bind_param("i", $pedido_id);

        if (!$stmt_info->execute()) {
            throw new Exception("Error al obtener información del pedido: " . $stmt_info->error);
        }

        $result = $stmt_info->get_result();
        $info = $result->fetch_assoc();

        $conn->commit();

        echo json_encode([
            "message" => "Pedido y detalle insertados correctamente",
            "pedido_id" => $pedido_id,
            "info_negocio" => $info // Aquí mandas teléfono y ApiKey también
        ]);

    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function Update() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["estado"], $data["id"])) {
            throw new Exception("Datos incompletos");
        }

        $id = $data["id"];
        $estado = $data["estado"];

        // Actualizar el estado del pedido
        $sql = "UPDATE pedidos SET estado = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $estado, $id);

        if (!$stmt->execute()) {
            throw new Exception("Error al actualizar estado: " . $stmt->error);
        }

        // Ahora hacer el SELECT que quieres
        $stmt_info = $conn->prepare("
            SELECT n.telefono,n.ApiKey,pedido_id,pr.nombre,pr.precio,cantidad FROM `detalle_pedidos` LEFT JOIN pedidos p ON pedido_id=p.id LEFT JOIN negocios n ON negocio_id=n.id LEFT JOIN productos pr ON producto_id=pr.id where pedido_id =?;
        ");
        $stmt_info->bind_param("i", $id);

        if (!$stmt_info->execute()) {
            throw new Exception("Error al obtener información del pedido: " . $stmt_info->error);
        }

        $result = $stmt_info->get_result();
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        
        // Extraer teléfono y ApiKey desde la primera fila
        $telefono = $rows[0]['telefono'] ?? null;
        $keyNegocio = $rows[0]['ApiKey'] ?? null;
        
        // Eliminar teléfono y KeyNegocio de cada producto
        $productos = array_map(function($item) {
            unset($item['telefono'], $item['ApiKey']);
            return $item;
        }, $rows);
        
        echo json_encode([
            "message" => "Estado actualizado correctamente",
            "pedido_info" => [
                "telefono" => $telefono,
                "KeyNegocio" => $keyNegocio,
                "productos" => $productos
            ]
        ]);

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