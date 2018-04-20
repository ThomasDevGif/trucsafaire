<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Execute request
$sql = "SELECT * FROM user ORDER BY name";
$stmt = $db->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

?>
