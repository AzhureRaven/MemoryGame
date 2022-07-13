<?php
    require_once('connection.php');
    $action = $_REQUEST["action"];
    
    if($action=="save"){
        $diff = $_REQUEST["diff"];
        $json = $_REQUEST["json"];
        $res = $conn->prepare("UPDATE leaderboard SET JSON = ? WHERE difficulty = ?");
        $res->bind_param("ss",$json,$diff);
        $result = $res->execute();
        if($result){
            echo 'Leaderboard saved!';
        }
        else{
            echo 'Leaderboard failed to save!';
        }
    }
    else if($action == "delete"){
        $diff = $_REQUEST["diff"];
        $res = $conn->prepare("UPDATE leaderboard SET JSON = NULL WHERE difficulty = ?");
        $res->bind_param("s",$diff);
        $result = $res->execute();
    }
?>