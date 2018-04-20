<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Set item property values
$id = $data->id;
$done = $data->done;

$sql = "UPDATE item SET done = :done WHERE id = :id";
$stmt = $db->prepare($sql);
$stmt->bindParam(':id', $id);
$stmt->bindParam(':done', $done);

if($stmt->execute()){
  http_response_code(200);
} else {
  http_response_code(404);
}
?>
