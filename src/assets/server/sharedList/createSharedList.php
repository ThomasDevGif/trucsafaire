<?php
// get database connection
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$listId = $data->listId;
$userId = $data->userId;

// Execute request
$stmt = $db->prepare("INSERT INTO sharedList (listId, userId) VALUES (:listId, :userId);");
$stmt->bindParam(':listId', $listId);
$stmt->bindParam(':userId', $userId);
$stmt->execute();

?>
