<?php
// Get database connection
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$userId = $data->userId;
$listId = $data->listId;

// Execute query
$stmt=$db->prepare("DELETE FROM sharedList WHERE userId = :userId AND listId = :listId");
$stmt->bindParam(':userId', $userId);
$stmt->bindParam(':listId', $listId);
$stmt->execute();
?>
