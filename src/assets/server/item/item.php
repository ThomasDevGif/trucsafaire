<?php
class Item {
	private $conn;

	public $id;
	public $name;
	public $date;
	public $done;
	public $listId;

	public function __construct($db) {
		$this->conn = $db;
	}

	// create item
	public function create() {
		$stmt = $this->conn->prepare("INSERT INTO item (
			name,
			date,
			done,
			listId
		)
		VALUES (
			:name,
			:date,
			:done,
			:listId
		)");

		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":date", $this->date);
		$stmt->bindParam(":done", $this->done);
		$stmt->bindParam(":listId", $this->listId);

		// Insertion
		if ($stmt->execute()) {
			return true;
		} else {
			echo "<pre>";
			print_r($stmt->errorInfo());
			echo "</pre>";

			return false;
		}
	}

}
?>
