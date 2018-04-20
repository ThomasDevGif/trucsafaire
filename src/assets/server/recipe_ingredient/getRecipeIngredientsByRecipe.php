<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$recipeId = $data;

// Execute query
$sql = "SELECT * FROM recipeIngredient WHERE recipeId = :recipeId";
$stmt = $db->prepare($sql);
$stmt->bindParam(':recipeId', $recipeId);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

?>
