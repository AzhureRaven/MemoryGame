<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'memorygame';
$port = '3306';
$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_errno) {
    die($conn->connect_error);
}
function alert($message) {
    echo "<script>alert('$message');</script>";
  }
?>