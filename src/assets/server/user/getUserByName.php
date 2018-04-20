<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode(file_get_contents("php://input"));
$name = $data->name;

$sql = "SELECT * FROM user WHERE name = :name";
$stmt = $db->prepare($sql);
$stmt->bindParam(':name', $name);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

?>
