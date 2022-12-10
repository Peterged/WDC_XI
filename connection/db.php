<?php 
    require_once(__DIR__ . "/../util/util.php"); 
    $data = require_json(__DIR__ . "/data.json")->connection;
    $dbname = $data->dbname;
    $servername = $data->servername;
    $username = $data->username;
    $password = $data->password;

    class database {
        public function connect(string $dbname, string $servername = "localhost", string $username = "root", string $password = ""): PDO{
            try {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch(PDOException $e) {
                die("Connection failed: " . $e->getMessage());
            }
        }
    }

    $db = new database();
    $connection = $db->connect($dbname, $servername, $username, $password);
?>