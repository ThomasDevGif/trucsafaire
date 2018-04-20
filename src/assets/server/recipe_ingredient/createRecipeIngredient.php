<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$idRecipe = $data->idRecipe;
$idIngredient = $data->idIngredient;
$quantity = $data->quantity;

// Execute query
$stmt = $db->prepare("INSERT INTO recipeIngredient (idRecipe, idIngredient, quantity)
VALUES (:idRecipe, :idIngredient, :quantity);");
$stmt->bindParam(':idRecipe', $idRecipe);
$stmt->bindParam(':idIngredient', $idIngredient);
$stmt->bindParam(':quantity', $quantity);
$stmt->execute();
?>
