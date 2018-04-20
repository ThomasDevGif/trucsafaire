<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Set ingredient property values
$id = $data->id;
$name = $data->name;

// Execute query
$sql = "UPDATE ingredient SET name = :name WHERE id = :id";
$stmt = $db->prepare($sql);
$stmt->bindParam(':id', $id);
$stmt->bindParam(':name', $name);

if($stmt->execute()){
  http_response_code(200);
} else {
  http_response_code(404);
}
?>
