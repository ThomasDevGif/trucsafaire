<?php
// get database connection
include_once '../config/database.php';

// Delete item
function deleteItem(){
  $database = new Database();
  $db = $database->getConnection();

  // get posted data
  $data = json_decode(file_get_contents("php://input"));
  $id = $data;

  $stmt=$db->prepare("DELETE FROM item WHERE id=:id");
  $stmt->bindParam(':id', $id);
  $stmt->execute();
}

// Execute
deleteItem();

?>
