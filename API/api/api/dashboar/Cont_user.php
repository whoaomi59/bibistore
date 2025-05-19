<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($request_method) {
    case 'GET':
        if ($action === 'usuarios') {
            GetUsuarios();
        } 
        if ($action === 'negocios') {
            GetNegocio();
        } 
        if ($action === 'productos') {
            GetProductos();
        } 
        if ($action === 'pedidos') {
            GetPedidos();
        } 
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}

function GetUsuarios() {
    global $conn;
    $result = $conn->query("SELECT COUNT(*) AS total FROM usuarios");
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $response = [
        'modulo' => 'usuarios',
        'data' => $data
    ];
    echo json_encode($response);
}

function GetNegocio() {
    global $conn;
    $result = $conn->query("SELECT COUNT(*) AS total FROM negocios");
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $response = [
        'modulo' => 'negocios',
        'data' => $data
    ];
    echo json_encode($response);
}

function GetPedidos() {
    global $conn;
    $result = $conn->query("SELECT COUNT(*) AS total FROM pedidos");
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $response = [
        'modulo' => 'pedidos',
        'data' => $data
    ];
    echo json_encode($response);
}

function GetProductos() {
    global $conn;
    $result = $conn->query("SELECT COUNT(*) AS total FROM productos");
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $response = [
        'modulo' => 'productos',
        'data' => $data
    ];

    echo json_encode($response);
}
?>
