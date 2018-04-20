<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$id = $data;

// Execute query
$stmt=$db->prepare("DELETE FROM ingredient WHERE id=:id");
$stmt->bindParam(':id', $id);
$stmt->execute();

?>
