<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode(file_get_contents("php://input"));
$listId = $data;

$sql = "SELECT * FROM item WHERE listId = :listId ORDER BY id";
$stmt = $db->prepare($sql);
$stmt->bindParam(':listId', $listId);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

?>
