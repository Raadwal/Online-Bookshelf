<?php

class SQLiteCreateTable {
    private $pdo;

    public function __construct() {
        $PATH_TO_SQLITE_FILE = 'phpsqlite.db';
        if($this->pdo == null) {
            $this->pdo = new \PDO("sqlite:".$PATH_TO_SQLITE_FILE);
        }

        if($this->pdo) {
            echo("connected!<br>");
        }
    }

    public function createTables() {
        $commands = ['CREATE TABLE IF NOT EXISTS user (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            name VARCHAR(50) NOT NULL
        )',
            'CREATE TABLE IF NOT EXISTS book (
                book_id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(50) NOT NULL,
                author VARCHAR(50) NOT NULL,
                genre VARCHAR(50) NOT NULL,
                pages INTEGER NOT NULL,
                status VARCHAR(50) NOT NULL,
                score INTEGER NOT NULL,
                UNIQUE(title, author)
            )'];
        // execute the sql commands to create new tables
        foreach ($commands as $command) {
            $this->pdo->exec($command);
        }

        echo("Tables created<br>");
    }

    public function getTableList() {
        $stmt = $this->pdo->query("SELECT *
                                   FROM user");
        $tables = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $tables[] = $row['name'];
        }

        foreach($tables as $element) {
            echo($element."<br>");
        }
    }

    public function getTableList2() {
        $stmt = $this->pdo->query("SELECT *
                                   FROM book");
        $tables = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $tables[] = $row['title'];
        }

        foreach($tables as $element) {
            echo($element."<br>");
        }
    }

    public function insertData($name, $email, $password) {
        $sql = 'INSERT INTO user(name, email, password) VALUES(:name, :email, :password)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $password);
        $stmt->execute();

        echo($this->pdo->lastInsertId()."<br>");
    }

    public function insertData2($title, $author, $genre, $pages, $status, $score) {
        $sql = 'INSERT INTO book(title, author, genre, pages, status, score) 
                VALUES(:title, :author, :genre, :pages, :status, :score)';
        $stmt = $this->pdo->prepare($sql);

        $stmt->bindValue(':title', $title);
        $stmt->bindValue(':author', $author);
        $stmt->bindValue(':genre', $genre);
        $stmt->bindValue(':pages', $pages);
        $stmt->bindValue(':status', $status);
        $stmt->bindValue(':score', $score);
        $stmt->execute();

        echo($this->pdo->lastInsertId()."<br>");
    }
}

$test = new SQLiteCreateTable();
$test->createTables();
$test->getTableList();
$test->insertData("imie", "nazwisko", "haslo");
$test->insertData2("dsad", "dsa", "gatunek", 123, "status", 10);
$test->getTableList2();