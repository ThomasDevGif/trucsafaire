<?php
class Database {

    private $host = "rdbms.strato.de";
    private $db_name = "DB3183233";
    private $username = "U3183233";
    private $password = "trucsafaire01";

    // get the database connection
    public function getConnection() {

      try {
        $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
        $conn = new PDO("mysql:host=".$this->host.";dbname=".$this->db_name,$this->username,$this->password,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',$pdo_options));
        $conn->exec("SET CHARACTER SET utf8");
      } catch(Exception $e) {
          echo "ERROR :".$e->getMessage()."<br>";
          echo "N° :".$e->getCode();
          die();
      }

      return $conn;
    }

}
?>
