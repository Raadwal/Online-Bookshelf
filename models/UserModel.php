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
        return isset($_SESSION['user']) ? array("status" => "Success", "user" => $_SESSION['user']) : array("status" => "Fail");
    }

    function logout($request)
    {
        session_destroy();
        return array("status" => "Success");
    }

    function login($request)
    {
        $email = isset($request->body->email) ? $request->body->email : "";
        $password = isset($request->body->password) ? $request->body->password : "";

        if (!empty($email) && !empty($password) && !isset($_SESSION['user'])) {
            $sql = 'SELECT name, email, password FROM Users';
            
            $stmt = $this->pdo->query($sql);

            while($user = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                if($user['email'] == $email && $user['password'] == md5($password)) {
                    $_SESSION['user'] = $user['name'];
                    return array("status" => "Success", "user" => $user['name']);
                }
            }

            return array("status" => "Fail");
        }

        return array("status" => "Fail");;
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
                $stmt->bindValue(':password', md5($password));
                $stmt->execute();

                $lastId = $this->pdo->lastInsertId();
                return ($lastId != 0) ? array("status" => "Success"): array("status" => "Fail");
            }
        };

        return array("status" => "Fail");
    }

    private function validateRegister($user, $email, $password, $passwordRepeated)
    {
        if(strlen($user) < 3 || !$this->validateEmail($email) || strcmp($password, $passwordRepeated) != 0)
            return false;

        return true;
    }

    private function validateEmail($email) 
    {
        if(preg_match('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', strtolower($email)))
            return true;
        
        return false;
    }
}
