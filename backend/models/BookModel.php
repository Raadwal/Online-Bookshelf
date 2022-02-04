<?php
require_once __DIR__ . "/../global/DatabaseConnector.php";


class BookModel extends DatabaseConnector
{
    function __construct()
    {
        parent::__construct();
    }

    function list($request)
    {
        if (!isset($_SESSION['user']))
            return "You need to be logged in!";

        $sql = 'SELECT title, author, genre, pages, status, score FROM Books';
        $stmt = $this->pdo->query($sql);

        $books = [];
        while($book = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            array_push($books, $book);
        }

        return $books;
    }

    function insert($request)
    {
        if (!isset($_SESSION['user']))
            return "You need to be logged in!";


        $title = isset($request->body->title) ? $request->body->title : "";
        $author = isset($request->body->author) ? $request->body->author : "";
        $genre = isset($request->body->genre) ? $request->body->genre : "";
        $pages = isset($request->body->pages) ? $request->body->pages : "";
        $status = isset($request->body->status) ? $request->body->status : "";
        $score = isset($request->body->score) ? $request->body->score : "";

        if (!empty($title) && !empty($author) && !empty($genre) && !empty($pages) && !empty($status) && !empty($score)) {
            if ($this->validateInsert($title, $author, $genre, $pages, $status, $score)) {
                $sql = 'INSERT INTO Books(title, author, genre, pages, status, score) 
                        VALUES(:title, :author, :genre, :pages, :status, :score)';

                $stmt = $this->pdo->prepare($sql);
                $stmt->bindValue(':title', $title);
                $stmt->bindValue(':author', $author);
                $stmt->bindValue(':genre', $genre);
                $stmt->bindValue(':pages', $pages);
                $stmt->bindValue(':status', $status);
                $stmt->bindValue(':score', $score);
                $stmt->execute();

                return $this->pdo->lastInsertId();
            }
        }

        return "";
    }

    function update($request)
    {
        if (!isset($_SESSION['user']))
            return "You need to be logged in!";

        $title = isset($request->params[0]) ? $request->params[0] : "";
        $author = isset($request->params[1]) ? $request->params[1] : "";
        $status = isset($request->body->status) ? $request->body->status : "";
        $score = isset($request->body->score) ? $request->body->score : "";

        if(!empty($title) && !empty($author) && !empty($status) && !empty($score)) {
            
            if($this->validateUpdate($status, $score)) {
                $sql = 'UPDATE Books 
                SET status=:status, score=:score
                WHERE title=:title AND author=:author';

                $stmt = $this->pdo->prepare($sql);
                $stmt->bindValue(':status', $status);
                $stmt->bindValue(':score', $score);
                $stmt->bindValue(':title', $title);
                $stmt->bindValue(':author', $author);

                if($stmt->execute()) {
                    return "Update success!";
                }
            }
        }

        return "";
    }

    function delete($request)
    {
        if (!isset($_SESSION['user']))
            return "You need to be logged in!";

        $title = isset($request->params[0]) ? $request->params[0] : "";
        $author = isset($request->params[1]) ? $request->params[1] : "";

        if(!empty($title) && !empty($author)) {
            $sql = 'DELETE FROM Books WHERE title=:title AND author=:author';
            
            echo($title.'--\n--');
            echo($author.'--\n--');

            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':title', $title);
            $stmt->bindValue(':author', $author);
            
            if($stmt->execute()) {
                return "Row deleted!";
            };

            return "";
        }
    }

    private function validateInsert($title, $author, $genre, $pages, $status, $score)
    {
        return true;
    }

    private function validateUpdate($status, $score)
    {
        return true;
    }
}
