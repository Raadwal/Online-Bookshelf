<?php
session_start();

require_once __DIR__ . "/../global/Request.php";
require_once __DIR__ . "/../global/Router.php";


$path = isset($_GET['path']) ? $_GET['path'] : "";
$body = !empty(file_get_contents("php://input")) ? json_decode(file_get_contents("php://input")) : new stdClass();
$method = $_SERVER['REQUEST_METHOD'];

$request = new Request($path, $body, $method);
$router = new Router($request);
