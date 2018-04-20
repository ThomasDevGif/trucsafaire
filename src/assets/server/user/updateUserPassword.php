<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Set user property values
$id = $data->id;
$password = $data->password;

$sql = "UPDATE user SET password = :password WHERE id = :id";
$stmt = $db->prepare($sql);
$stmt->bindParam(':id', $id);
$stmt->bindParam(':password', $password);

if($stmt->execute()){
  http_response_code(200);
} else {
  http_response_code(404);
}
?>
