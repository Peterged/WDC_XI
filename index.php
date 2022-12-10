<?php
session_start();
require("connection\\db.php");
require_once("util/util.php");
require_once("util\\adfjsiop.php");

$user_data = $connection->query("SELECT * FROM `wdc1`.`user`");
$user_data->setFetchMode(PDO::FETCH_ASSOC);
$insert = $connection->prepare("INSERT INTO `user` (username, email, password) VALUES (?,?,?)");

if (isset($_POST['submit_register'])) {
    // $username = $connection->quote($_POST['username']);
    // $email = $connection->quote($_POST['email']);
    $username = $_POST["username"];
    $email = $_POST["email"];
    
    $password = hash('sha512',$_POST["password"].'$'.$key);
    // $password = $connection->quote(encrypt("sha512", $_POST['password']));
    $insert->execute([$username, $email, $password]);
    $_SESSION["logged"] = "true";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/global.css">
    <script src="./script/input.js" defer type="module"></script>
    <script src="./script/links.js" defer type="module"></script>
    <title>Register</title>
</head>

<body
    <?php if(isset($_SESSION["logged"])) : ?>
    <div class="m-container">
        <div class="m-content">
            <p>Am I logged in? <br>Yes, its just a session variable named "logged" stored containing a value... <br>Happy ? "You're welcome" : <a id="logout">"Log out"</a></p>
        </div>
    </div>
    <?php else : ?>
    <div class="container">
        <div class="content">
            <h1>Register</h1>
            <form method="POST" class="signup_form">
                <input type="text" name="username" placeholder="Username" autocomplete="off" required class="username">
                <p class="warnUsername inputWarn"></p>
                <input type="email" name="email" placeholder="Email" autocomplete="off" required class="email">
                <p class="warnEmail inputWarn"></p>
                <input type="password" name="password" placeholder="Password" required class="passwordInput">
                <p class="warnPassword inputWarn"></p>
                <input type="submit" value="Sign Up" name="submit_register">
            </form>
            <a href="./login.php">Login here</a>
        </div>
    </div>
    <?php endif; ?>
    <br><br>
    
</body>
</html>