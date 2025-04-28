<?php
/*
Description: This file is meant to be called by an ajax request where a date and timeslot are given.
    The file will then echo a json encoded object containing keys "success", "num_members", and "error".
    "success" is a bool that denotes if the ajax request was a success. "num_members" is an int that
    dentoes the amount of members available for the given date and timeslot. "error" is a string that
    denotes that error that caused the ajax request to fail.
*/

header('Content-Type: application/json');

include "connect.php";

$date = filter_input(INPUT_GET, "date", FILTER_SANITIZE_SPECIAL_CHARS);             // accepts any date
$timeslot = filter_input(INPUT_GET, "timeslot", FILTER_SANITIZE_SPECIAL_CHARS);     // only accepts 11:00:00, 13:00:00, or 17:00:00

// assigned date and timeslot values for debugging only
// $date = "2025-04-28";
// $timeslot = "13:00:00";

$timeslot_id;

// get the timeslot_id for the given timeslot by the user
if ($timeslot !== NULL && $timeslot !== "") {
    $cmd = "SELECT `id` FROM `timeslots` WHERE `Time`=?";
    $stmt = $dbh->prepare($cmd);

    $args = [$timeslot];
    $success = $stmt->execute($args);

    if ($success) {
        $row = $stmt->fetch();
        $timeslot_id = $row["id"];
    } else {
        echo json_encode([
            "success" => false,
            "num_members" => NULL,
            "error" => "Something went wrong fetching data from the server"
        ]);
        die();
    }

} else {
    echo json_encode([
        "success" => $success,
        "num_members" => NULL,
        "error" => "timeslot parameter is invalid"
    ]);
}

if ($date !== NULL && $date !== "") {
    // using the timeslot_id we get the id of the available members
    $cmd = "SELECT `member_id` FROM `band_availability` WHERE `date`=? AND `timeslot_id`=?";
    $stmt = $dbh->prepare($cmd);

    $args = [$date, $timeslot_id];
    $success = $stmt->execute($args);

    if (!$success) {
        echo json_encode([
            "success" => false,
            "num_members" => NULL,
            "error" => "Something went wrong fetching data from the server"
        ]);
        die();
    }

    $num_members = 0;

    $instrumentation = [];

    // preparing to retrieve the instrument id of the member
    $member_cmd = "SELECT `Instrument_id` FROM `members` WHERE `id`=?";
    $member_stmt = $dbh->prepare($member_cmd);

    // preparing the command to retrieve the instrument based on its id
    $instrument_cmd = "SELECT `Instrument` FROM `instruments` WHERE `id`=?";
    $instrument_stmt = $dbh->prepare($instrument_cmd);

    // retrieving instrumentation data from the server and counting the amount of members available that timeslot
    while ($available_data = $stmt->fetch()) {
        $member_args = [$available_data["member_id"]];
        $member_success = $member_stmt->execute($member_args);

        if (!$member_success) {
            echo json_encode([
                "success" => false,
                "num_members" => NULL,
                "error" => "Something went wrong fetching data from the server"
            ]);
            die();
        }

        $member_data = $member_stmt->fetch();

        $instrument_args = [$member_data["Instrument_id"]];
        $instrument_success = $instrument_stmt->execute($instrument_args);

        if (!$instrument_success) {
            echo json_encode([
                "success" => false,
                "num_members" => NULL,
                "error" => "Something went wrong fetching data from the server"
            ]);
            die();
        }

        $instrument_data = $instrument_stmt->fetch();
        $instrument = $instrument_data["Instrument"];

        // adds to the associative array of instruments
        if (isset($instrumentation[$instrument])) {
            $instrumentation[$instrument] += 1;
        } else {
            $instrumentation[$instrument] = 1;
        }
        
        $num_members++;
    }

    echo json_encode([
        "success" => true,
        "num_members" => $num_members,
        "instrumentation" => $instrumentation,
        "error" => NULL
    ]);
    die();
} else {
    // echo json_encode("bad");
    die("something went wrong");
}