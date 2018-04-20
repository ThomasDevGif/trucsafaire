<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$userId = $data;

// Execute query
$sql = "SELECT *
        FROM list
        WHERE id IN (
          SELECT listId
          FROM sharedList
          WHERE userId = :userId
        )";

$stmt = $db->prepare($sql);
$stmt->bindParam(':userId', $userId);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

?>
