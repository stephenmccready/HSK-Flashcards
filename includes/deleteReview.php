<?php
include_once 'db_connect.php';

$sql="DELETE FROM Review WHERE ID=" . $_GET['id'];
if ($mysqli->query($sql) === TRUE) {
    echo "<br>Removed from rev list";
} else {
   	echo "Error: " . $sql . "<br>" . $conn->error;
}
$mysqli->close();
