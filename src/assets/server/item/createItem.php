<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// instantiate item object
include_once './item.php';
$item = new Item($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set item property values
$item->name = $data->name;
$item->date = $data->date;
$item->done = $data->done;
$item->listId = $data->listId;

// create the item
if ($item->create()) {
  http_response_code(200);
} else {
  http_response_code(500);
}
?>
