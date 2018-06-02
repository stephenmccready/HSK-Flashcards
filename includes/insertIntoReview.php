<?php
include_once 'db_connect.php';

if ($result = $mysqli->query("SELECT id FROM Review WHERE id=" . $_GET['id'])) {
	if($result->num_rows==0) {
		$sql="INSERT INTO Review(id,HSK) VALUES (" . $_GET['id'] . "," . $_GET['HSK'] . ")";
		if ($mysqli->query($sql) === TRUE) {
    		echo "<br>Added to rev list";
		} else {
   	 		echo "Error: " . $sql . "<br>" . $conn->error;
		}
	} else {
		echo "<br>Already on rev list";
	}
}
$mysqli->close();
