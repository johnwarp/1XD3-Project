<?php
header('Content-Type: application/json');
include "connect.php";

$name = filter_input(INPUT_GET, "name", FILTER_SANITIZE_SPECIAL_CHARS);
$macid = filter_input(INPUT_GET, "macid", FILTER_SANITIZE_SPECIAL_CHARS);
$instrument = filter_input(INPUT_GET, "instrument", FILTER_SANITIZE_SPECIAL_CHARS);
$json_times = filter_input(INPUT_GET, "alltimes", FILTER_SANITIZE_SPECIAL_CHARS);

$times = json_decode($json_times);

$member_id;
$success = true;

// automate this process later possibly using modular arithmetic and a combination of inbuilt functions
$timeslots = [];
$timeslots["2025-04-28"] = $times[0];
$timeslots["2025-04-29"] = $times[1];
$timeslots["2025-04-30"] = $times[2];
$timeslots["2025-05-01"] = $times[3];
$timeslots["2025-05-02"] = $times[4];

if (
    $name !== NULL && $name !== "" &&
    $macid !== NULL && $macid !== "" &&
    $instrument !== NULL && $instrument !== "" &&
    $times !== NULL && $times !== ""
) {
    // commands to get the member's id using their macid
    $member_cmd = "SELECT `id` FROM `members` WHERE `macID`=?";
    $member_stmt = $dbh->prepare($member_cmd);

    $member_args = [$macid];
    $member_success = $member_stmt->execute($member_args);

    // stops the program and echoes and error if something goes wrong
    if (!$member_success) {
        echo json_encode([
            "success" => false,
            "error" => "An unexpected server error has occured fetching member id"
        ]);
        die();
    }

    $member_data = $member_stmt->fetch();

    // takes the member id if they are in the band. otherwise echoes an error if they aren't in the band
    if ($member_data !== NULL && $member_data !== false) {
        $member_id = $member_data["id"];
    } else {
        echo json_encode([
            "success" => false,
            "error" => "macid doesn't exist in the band"
        ]);
        die();
    }

    // preparing a delete command to delete any duplicate entries
    $delete_cmd = "DELETE FROM `band_availability` WHERE `date`=? AND `timeslot_id`=? and `member_id`=?";
    $delete_stmt = $dbh->prepare($delete_cmd);

    // preparing the insert command
    $insert_cmd = "INSERT INTO `band_availability`(`date`, `timeslot_id`, `member_id`) VALUES (?, ?, ?)";
    $insert_stmt = $dbh->prepare($insert_cmd);

    // inserts each time slot into the band_availability data table
    foreach ($timeslots as $date => $time_arr) {
        foreach ($time_arr as $time_id) {
            $args = [$date, $time_id, $member_id];

            // deletes any duplicate entries
            $delete_success = $delete_stmt->execute($args);

            if (!$delete_success) {
                echo json_encode([
                    "success" => false,
                    "error" => "An unexpected error has occured"
                ]);
                die();
            }

            $insert_success = $insert_stmt->execute($args);
            
            if (!$insert_success) {
                echo json_encode([
                    "success" => false,
                    "error" => "An unexpected error has occured inserting your timeslot"
                ]);
                die();
            }
        }
    }

    echo json_encode([
        "success" => true,
        "error" => ""
    ]);
    die();
} else {
    echo json_encode([
        "success" => false,
        "error" => "Somethign went wrong with your parameters"
    ]);
}