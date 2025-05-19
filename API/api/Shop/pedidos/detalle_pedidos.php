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

    $id_pedido = isset($_GET['id_pedido']) ? intval($_GET['id_pedido']) : 0;

    if ($id_pedido > 0) {
        $query = "SELECT pe.id AS Pedido, u.nombre AS Cliente, n.nombre AS Negocio, p.nombre AS Producto, dp.cantidad, dp.subtotal
                FROM pedidos pe
                JOIN usuarios u ON pe.cliente_id = u.id
                JOIN negocios n ON pe.negocio_id = n.id
                JOIN detalle_pedidos dp ON pe.id = dp.pedido_id
                JOIN productos p ON dp.producto_id = p.id WHERE pe.id = ?";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id_pedido);
        $stmt->execute();
        $result = $stmt->get_result();

        $productos = [];
        while ($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }

        echo json_encode($productos);
        $stmt->close();
    } else {
        echo json_encode(["error" => "ID inválido"]);
    }
}


?>
