<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Datos de la conexión a MySQL
$servername = "asuprocolombiasas.com";
$username = "sisottsa_hacker";
$password = "aAeewMH_WsgE";
$database = "sisottsa_shopp";

// Conectar a MySQL
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode([
        "message" => "Error al conectar a la base de datos.",
        "error" => $conn->connect_error
    ]));
}

// Obtener el método HTTP de la solicitud
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Función para subir imágenes
function uploadImage($image, $folder) {
    if ($image['error'] === UPLOAD_ERR_OK) {
        $uploadDir = $folder;  
        $absoluteUploadDir = __DIR__ . '/' . $uploadDir; 
        if (!is_dir($absoluteUploadDir)) {
            mkdir($absoluteUploadDir, 0777, true);
        }
        $imgPath = $absoluteUploadDir . basename($image['name']);
        if (move_uploaded_file($image['tmp_name'], $imgPath)) {
            return $uploadDir . basename($image['name']);
        }
    }
    return null;
}

// CRUD - CREATE (POST)
if ($method == 'POST' && preg_match('/\/php\/server\.php\/items/', $requestUri)) {
    if (isset($_FILES['img']) && isset($_POST['nombre']) && isset($_POST['precio'])) {
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $descripcion = $_POST['descripcion'];
        $img = $_FILES['img'];
        $imgone = isset($_FILES['imgone']) ? $_FILES['imgone'] : null;
        $imgtwo = isset($_FILES['imgtwo']) ? $_FILES['imgtwo'] : null;
        $imgtree = isset($_FILES['imgtree']) ? $_FILES['imgtree'] : null;

        $imgPath = uploadImage($img, 'uploads/productos/');
        $imgonePath = $imgone ? uploadImage($imgone, 'uploads/productos/') : null;
        $imgtwoPath = $imgtwo ? uploadImage($imgtwo, 'uploads/productos/') : null;
        $imgtreePath = $imgtree ? uploadImage($imgtree, 'uploads/productos/') : null;

        $query = "INSERT INTO Productos (nombre, descripcion, img, precio, imgone, imgtwo, imgtree) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssssss", $nombre, $descripcion, $imgPath, $precio, $imgonePath, $imgtwoPath, $imgtreePath);


        if ($stmt->execute()) {
            echo json_encode(["message" => "Item agregado exitosamente.", "id" => $stmt->insert_id]);
        } else {
            echo json_encode(["message" => "Error al agregar el item.", "error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "Datos incompletos."]);
    }
}

// CRUD - READ (GET)
if ($method == 'GET' && preg_match('/\/php\/server\.php\/items/', $requestUri)) {
    $query = "SELECT * FROM Productos";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $items = [];
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
        echo json_encode($items);
    } else {
        echo json_encode(["message" => "No se encontraron productos."]);
    }
}

// CRUD - UPDATE (PUT)
if ($method == 'PUT' && preg_match('/\/php\/server\.php\/items\/(\d+)/', $requestUri, $matches)) {
    $id = $matches[1];
    parse_str(file_get_contents("php://input"), $put_vars);

    $nombre = $put_vars['nombre'] ?? null;
    $precio = $put_vars['precio'] ?? null;

    $query = "UPDATE Productos SET nombre=?, precio=? WHERE id=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssd", $nombre, $precio, $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Item actualizado exitosamente."]);
    } else {
        echo json_encode(["message" => "Error al actualizar el item.", "error" => $stmt->error]);
    }

    $stmt->close();
}

// CRUD - DELETE (DELETE)
if ($method == 'DELETE' && preg_match('/\/php\/server\.php\/items\/(\d+)/', $requestUri, $matches)) {
    $id = $matches[1];

    $query = "DELETE FROM Productos WHERE id=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("d", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Item eliminado exitosamente."]);
    } else {
        echo json_encode(["message" => "Error al eliminar el item.", "error" => $stmt->error]);
    }

    $stmt->close();
}



//CATEGORIAS

//GET
if ($method == 'GET' && preg_match('/\/php\/server\.php\/categorias/', $requestUri)) {
    $query = "SELECT * FROM categoria";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $items = [];
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
        echo json_encode($items);
    } else {
        echo json_encode(["message" => "No se encontraron categorias."]);
    }
}

//POST
if ($method == 'POST' && preg_match('/\/php\/server\.php\/categorias/', $requestUri)) {
    if (isset($_FILES['img']) && isset($_POST['nombre'])) {
        $nombre = $_POST['nombre'];
        $img = $_FILES['img'];

        $imgPath = uploadImage($img, 'uploads/categorias/');

        $query = "INSERT INTO categoria (nombre, img) VALUES (?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $nombre, $imgPath);


        if ($stmt->execute()) {
            echo json_encode(["message" => "Item agregado exitosamente.", "id" => $stmt->insert_id]);
        } else {
            echo json_encode(["message" => "Error al agregar el item.", "error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "Datos incompletos."]);
    }
}
//CHANGUES
if ($method == 'POST' && preg_match('/\/php\/server\.php\/changues/', $requestUri)) {
    parse_str(file_get_contents("php://input"), $put_vars);

    $status = $put_vars['status'] ?? null;

    $query = "UPDATE changues SET status=? where id=1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Item actualizado exitosamente."]);
    } else {
        echo json_encode(["message" => "Error al actualizar el item.", "error" => $stmt->error]);
    }

    $stmt->close();
}

// Cerrar la conexión a MySQL
$conn->close();
?>
