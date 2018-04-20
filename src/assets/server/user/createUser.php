<?php
// get database connection
include_once '../config/database.php';

function createUser() {
  $database = new Database();
  $db = $database->getConnection();

  // Get posted data
  $data = json_decode(file_get_contents("php://input"));
  $name = $data->name;
  $password = $data->password;

  $stmt = $db->prepare("INSERT INTO user (name, password) VALUES (:name, :password);");
  $stmt->bindParam(':name', $name);
  $stmt->bindParam(':password', $password);
  $stmt->execute();
}

// Execute
createUser();
?>
