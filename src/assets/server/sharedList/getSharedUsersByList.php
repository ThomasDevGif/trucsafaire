<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$listId = $data;

// Execute query
$sql = "SELECT *
        FROM user
        WHERE id IN (
          SELECT userId
          FROM sharedList
          WHERE listId = :listId
        )";

$stmt = $db->prepare($sql);
$stmt->bindParam(':listId', $listId);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

?>
