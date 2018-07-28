<?php
// Get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$description = $data->description;
$difficulty = $data->difficulty;
$time = $data->time;
$date = $data->date;
$userId = $data->userId;

// Execute query
$stmt = $db->prepare("INSERT INTO recipe (name, description, difficulty, time, date, userId)
                      VALUES (:name, :description, :difficulty, :time, :date, :userId);");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':description', $description);
$stmt->bindParam(':difficulty', $difficulty);
$stmt->bindParam(':time', $time);
$stmt->bindParam(':date', $date);
$stmt->bindParam(':userId', $userId);
$stmt->execute();

?>
