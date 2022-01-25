<?php


class DatabaseConnector
{
    private $path = "../database/phpsqlite.db";
    public $pdo;

    function __construct()
    {
        if ($this->pdo == null) {
            $this->pdo = new \PDO("sqlite:" . $this->path);
        }

        if ($this->pdo) {
            $this->createDatabaseIfNotExist();
        }
    }

    private function createDatabaseIfNotExist()
    {
        $usersTable = '
        CREATE TABLE IF NOT EXISTS Users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            name VARCHAR(50) NOT NULL
        )
        ';

        $booksTable = '
        CREATE TABLE IF NOT EXISTS Books (
            book_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(50) NOT NULL,
            author VARCHAR(50) NOT NULL,
            genre VARCHAR(50) NOT NULL,
            pages INTEGER NOT NULL,
            status INTEGER NOT NULL,
            score INTEGER NOT NULL,
            UNIQUE(title, author)
        )
        ';

        $this->pdo->exec($usersTable);
        $this->pdo->exec($booksTable);
    }
}
