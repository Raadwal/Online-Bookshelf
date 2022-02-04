<?php


class Request
{
    public stdClass $body;
    public string $endpoint;
    public string $action;
    public array $params;
    public string $path;
    public string $method;
    public bool $valid;

    function __construct($path, $body, $method)
    {
        $this->path = $path;
        $this->body = $body;

        if (count(explode("/", $this->path)) < 2) {
            $this->valid = false;
            $this->endpoint = "";
            $this->action = "";
            $this->params = array();
            $this->method = "";
        } else {
            $this->valid = true;
            $this->endpoint = explode("/", $this->path)[0];
            $this->action = explode("/", $this->path)[1];

            $this->params = explode("/", $this->path);
            array_shift($this->params);
            array_shift($this->params);

            $this->method = $method;
        }
    }

    function Show()
    {
        echo (($this->valid) ? "Valid: True\n" : "Valid: False\n");
        echo ("Path: " . $this->path . "\n");
        echo ("Endpoint: " . $this->endpoint . "\n");
        echo ("Action:" . $this->action . "\n");
        echo ("Method: " . $this->method . "\n");

        echo ("====================\n");
        echo ("Array:\n");
        foreach ($this->params as $param) {
            echo ($param . "\n");
        }
        echo ("====================\n");

        if (isset($this->body->user) && isset($this->body->password)) {
            echo ($this->body->user . "\n");
            echo ($this->body->password . "\n");
        }
    }
}
