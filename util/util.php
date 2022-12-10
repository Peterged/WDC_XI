<?php 
    function require_json(string $path){
        $json = file_get_contents($path, true);
        return json_decode($json);
    }

    function encrypt(string $hash_type, string $password){
        return password_hash(hash($hash_type, $password), PASSWORD_DEFAULT);
    }
?>
