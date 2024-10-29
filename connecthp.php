
<?php
$dbname = 'mysql:dbname=mut_booking;host=localhost';
$username = 'root';
$password = '';
 
try {
    $conn = new PDO($dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if ($conn) {
           // echo "Connected to the database successfully!";
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    exit;
        }
 
?>