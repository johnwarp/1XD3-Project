<?php
/*
php form for processing the user's information from the form 
*/

header('Content-Type: application/json');
include "connect.php";

// Get post parameters from the user-filled form
$name = filter_input(INPUT_GET, "name", FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_GET, "email", FILTER_SANITIZE_SPECIAL_CHARS);
$insta = filter_input(INPUT_GET, "insta", FILTER_SANITIZE_SPECIAL_CHARS);

$paramsok = true;

try {
    if (
        $name !== null && $name !== "" &&
        $email !== null && $email !== "" &&
        $insta !== null && $insta !== ""
    ) {
        // Preparing the insert command
        $cmd = "INSERT INTO `submission`(`email`, `name`, `insta`) VALUES (?, ?, ?)";
        $stmt = $dbh->prepare($cmd);

        // Executing the insert command
        $args = [$email, $name, $insta];
        $success = $stmt->execute($args);

        if ($success) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Database insert failed."]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Missing required fields."]);
    }
} catch (PDOException $e) {
    if ($e->getCode() === "23000") {
        echo json_encode(["success" => false, "error" => "Duplicate entry."]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "An unexpected error occurred."]);
}
?>
