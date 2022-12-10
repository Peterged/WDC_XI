<?php
session_start();
require("connection\\db.php");
require_once("util/util.php");
require_once("util\\adfjsiop.php");

$user_data = $connection->query("SELECT * FROM `wdc1`.`user`");
$user_data->setFetchMode(PDO::FETCH_ASSOC);



if (isset($_POST['submit_login'])) {
    $email = $connection->quote($_POST['email']);
    $password = $connection->quote(hash('sha512',$_POST["password"].'$'.$key));
    $read = $connection->prepare("SELECT * FROM user where email=$email and password=$password");
    $read->execute();
    echo $email . " " . $password;
    if ($read->rowCount()) {
        $_SESSION["logged"] = "true";
        header("Location: index.php");
    }   
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/global.css">
    <script src="./script/input.js" type="module" defer></script>
    <title>Login</title>
</head>

<body>

    <div class="container">
        <div class="content">
            <h1>Login</h1>
            <form method="POST" class="signup_form">
                <input type="email" name="email" placeholder="Email" autocomplete="off" required class="email">
                <p class="warnEmail inputWarn"></p>
                <input type="password" name="password" placeholder="Password" required class="passwordInput">
                <p class="warnPassword inputWarn"></p>
                <input type="submit" value="Login" name="submit_login">
            </form>
            <a href="./index.php">Register here</a>
        </div>
    </div>
</body>
</html>