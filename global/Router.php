<?php

require_once __DIR__ . "/../models/UserModel.php";
require_once __DIR__ . "/../models/BookModel.php";

class Router
{
    private Request $request;
    private UserModel $userModel;
    private BookModel $bookModel;

    public function __construct($request)
    {
        $this->request = $request;
        $this->userModel = new UserModel();
        $this->bookModel = new BookModel();
    }

    function error404()
    {
        header("HTTP/1.0 404 Not Found");
    }

    function error400()
    {
        header("HTTP/1.0 400 Bad Request");
    }

    private function resolve()
    {
        $result = null;
        $method = strtolower($this->request->method);
        $action = strtolower($this->request->action);
        $route = strtolower($this->request->endpoint);

        if ($route == "user") {
            if ($method == "post" && ($action == "login" || $action == "register" || $action == "logout")) {
                $result = call_user_func_array(array($this->userModel, $action), array($this->request));
            } else if ($method == "get" && ($action == "status")) {
                $result = call_user_func_array(array($this->userModel, $action), array($this->request));
            } else {
                $this->error404();
                return;
            }
        } else if ($route == "book") {
            if ($method == "get" && $action == "list") {
                $result = call_user_func_array(array($this->bookModel, $action), array($this->request));
            } else if ($method == "post" && $action == "insert") {
                $result = call_user_func_array(array($this->bookModel, $action), array($this->request));
            } else if ($method == "delete" && $action = "delete") {
                $result = call_user_func_array(array($this->bookModel, $action), array($this->request));
            } else if ($method == "put" && $action == "update") {
                $result = call_user_func_array(array($this->bookModel, $action), array($this->request));
            } else {
                $this->error404();
                return;
            }
        } else {
            $this->error404();
            return;
        }

        if (!$result) {
            $this->error400();
            return;
        }

        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode($result);
    }

    function __destruct()
    {
        if ($this->request->valid) {
            $this->resolve();
        } else {
            $this->error404();
        }
    }
}
