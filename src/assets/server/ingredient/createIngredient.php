<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$name = $data->name;

// Execute query
$stmt = $db->prepare("INSERT INTO ingredient (name) VALUES (:name);");
$stmt->bindParam(':name', $name);
$stmt->execute();
?>
