<?php

require_once __DIR__ . "/../global/DatabaseConnector.php";

class UserModel extends DatabaseConnector
{
    function __construct()
    {
        parent::__construct();
    }

    function status($request)
    {
        return isset($_SESSION['user']) ? $_SESSION['user'] : "Not logged in";
    }

    function logout($request)
    {
        session_destroy();
        return "Logout";
    }

    function login($request)
    {
        $email = isset($request->body->email) ? $request->body->email : "";
        $password = isset($request->body->password) ? $request->body->password : "";

        if (!empty($email) && !empty($password) && !isset($_SESSION['user'])) {
            $sql = 'SELECT name, email, password FROM Users';
            
            $stmt = $this->pdo->query($sql);

            while($user = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                if($user['email'] == $email && $user['password'] == $password) {
                    $_SESSION['user'] = $user['name'];
                    return "Zalogowany";
                }
            }

            return "test";
        }

        return "";
    }

    function register($request)
    {
        $name = isset($request->body->name) ? $request->body->name : "";
        $email = isset($request->body->email) ? $request->body->email : "";
        $password = isset($request->body->password) ? $request->body->password : "";
        $passwordRepeated = isset($request->body->passwordRepeated) ? $request->body->passwordRepeated : "";

        if (!empty($name) && !empty($email) && !empty($password)  && !empty($passwordRepeated)) {

            if ($this->validateRegister($name, $email, $password, $passwordRepeated)) {
                $sql = 'INSERT INTO Users (name, email, password) VALUES (:user, :email, :password)';

                $stmt = $this->pdo->prepare($sql);
                $stmt->bindValue(':user', $name);
                $stmt->bindValue(':email', $email);
                $stmt->bindValue(':password', $password);
                $stmt->execute();

                return $this->pdo->lastInsertId();
            }
        };

        return "";
    }

    private function validateRegister($user, $email, $password, $passwordRepeaded)
    {
        return true;
    }
}
