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
            return array("status" => "Fail");
        

        $title = isset($request->body->title) ? $request->body->title : "";
        $author = isset($request->body->author) ? $request->body->author : "";
        $genre = isset($request->body->genre) ? $request->body->genre : "";
        $pages = isset($request->body->pages) ? $request->body->pages : "";
        $status = isset($request->body->status) ? $request->body->status : "";
        $score = isset($request->body->score) ? $request->body->score : "";

        if (!empty($title) && !empty($author) && !empty($genre) && !empty($pages)) {
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

                $lastId = $this->pdo->lastInsertId();
                
                return ($lastId != 0) ? array("status" => "Success") :  array("status" => "Fail");
            }
        }

        return array("status" => "Fail");
    }

    function update($request)
    {
        if (!isset($_SESSION['user']))
            return array("status" => "Fail");
            

        $title = isset($request->params[0]) ? $request->params[0] : "";
        $author = isset($request->params[1]) ? $request->params[1] : "";
        $status = isset($request->body->status) ? $request->body->status : "";
        $score = isset($request->body->score) ? $request->body->score : "";

        if(!empty($title) && !empty($author)) {
            
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
                    return array("status" => "Success");
                }
            }
        }

        array("status" => "Fail");
    }

    function delete($request)
    {
        if (!isset($_SESSION['user']))
            return array("status" => "Fail");

        $title = isset($request->params[0]) ? $request->params[0] : "";
        $author = isset($request->params[1]) ? $request->params[1] : "";

        if(!empty($title) && !empty($author)) {
            $sql = 'DELETE FROM Books WHERE title=:title AND author=:author';

            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':title', $title);
            $stmt->bindValue(':author', $author);
            
            if($stmt->execute()) {
                return array("status" => "Success");;
            };

            return array("status" => "Fail");;
        }

        return array("status" => "Fail");;
    }

    private function validateInsert($title, $author, $genre, $pages, $status, $score)
    {
        if(intval($pages) < 0)
            return false;

        if($status != "-1" && $status != "0" && $status != "1") 
            return false;
        
        if($status == "1")
            if(intval($score) < 0 && intval($score) > 10)
                return false;

        if($status == "-1" || $status = "0")
        {
            if($score != "0")
            {
                echo("Score");
            }
            
            echo("Score 2");
        }
            
        
        return true;
    }

    private function validateUpdate($status, $score)
    {
        if($status != "-1" && $status != "0" && $status != "1") 
            return false;
        
        if($status == "1")
            if(intval($score) < 0 && intval($score) > 10)
                return false;

        if($status == "-1" || $status = "0")
        {
            if($score != "0")
            {
                echo("Score");
            }
            
            echo("Score 2");
        }
            
        
        return true;
    }
}
