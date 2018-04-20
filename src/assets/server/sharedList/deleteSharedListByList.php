<?php
// Get database connection
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$listId = $data;

// Execute query
$stmt=$db->prepare("DELETE FROM sharedList WHERE listId = :listId");
$stmt->bindParam(':listId', $listId);
$stmt->execute();
?>
