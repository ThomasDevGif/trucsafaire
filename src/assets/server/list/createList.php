<?php
// get database connection
include_once '../config/database.php';

// Display lists
function createList() {
  $database = new Database();
  $db = $database->getConnection();

  // Get posted data
  $data = json_decode(file_get_contents("php://input"));
  $name = $data->name;
  $userId = $data->userId;

  $stmt = $db->prepare("INSERT INTO list (name, userId) VALUES (:name, :userId);");
  $stmt->bindParam(':name', $name);
  $stmt->bindParam(':userId', $userId);
  $stmt->execute();
}

// Execute
createList();
?>
