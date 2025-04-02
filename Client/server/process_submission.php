<?php
/*
php form for processing the user's information from the form 
*/

header('Content-Type: application/json');

include "connect.php";

// get post parameters from the user filled form
$name = filter_input(INPUT_GET, "name", FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_GET, "email", FILTER_SANITIZE_SPECIAL_CHARS);
$time = filter_input(INPUT_GET, "time", FILTER_SANITIZE_SPECIAL_CHARS);
$insta = filter_input(INPUT_GET, "insta", FILTER_SANITIZE_SPECIAL_CHARS);
$msg2 = filter_input(INPUT_GET, "msg2", FILTER_SANITIZE_SPECIAL_CHARS);
$msg3 = filter_input(INPUT_GET, "msg3", FILTER_SANITIZE_SPECIAL_CHARS);

$paramsok = true;

try {
if (
    $name !== null && $name !== "" &&
    $email !== null && $email !== "" &&
    $time !== null && $time !== "" &&
    $insta !== null && $insta !== "" &&
    $msg2 !== null && $msg2 !== "" &&
    $msg3 !== null && $msg3 !== ""
) {
    // preparing the insert command
    $cmd = "INSERT INTO `submission`(`email`, `name`, `timeslot`, `insta`, `msg2`, `msg3`) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $dbh->prepare($cmd);

    // executing the insert command
    $args = [$email, $name, $time, $insta, $msg2, $msg3];
    $success = $stmt->execute($args);

    if ($success) {
        echo json_encode("ok");
    } else {
        echo json_encode("bad");
    }
} else {
    echo json_encode("bad");
}

} catch (PDOException $e) {         // TODO remember to add the citation for this code
    if ($e->getCode() === "23000") {
        echo json_encode("duplicate");
    }
} catch (Exception $e) {
    echo json_encode("bad");
}

?>