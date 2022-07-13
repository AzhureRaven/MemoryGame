<?php
require_once('./connection.php');
$ez = $conn->query("SELECT ifnull(JSON,'[]') as 'json' FROM leaderboard WHERE difficulty = 'ez'")->fetch_assoc();
$normal = $conn->query("SELECT ifnull(JSON,'[]') as 'json' FROM leaderboard WHERE difficulty = 'normal'")->fetch_assoc();
$pro = $conn->query("SELECT ifnull(JSON,'[]') as 'json' FROM leaderboard WHERE difficulty = 'pro'")->fetch_assoc();
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Game by Azhure Raven</title>
    <link rel="stylesheet" href="./css/style.css">
    <script type="text/javascript" src="./js/game.js"></script>
    <script type="text/javascript" src="./js/jquery.min.js"></script>
</head>
<body>
    <h1>Memory Game by Azhure Raven</h1>
    <select name="mode" id="mode" onchange="setWidth()">
            <option value="Ez" selected>Ez</option>
            <option value="Normal">Normal</option>
            <option value="Pro">Pro</option>
        </select>
        <button type="button" id="start" onclick="start()">Start</button>
        <button type="button" id="cheat" onclick="cheat()">Cheat</button>
        <button type="button" id="leaderboard" onclick="leaderboard()" ondblclick="deleteLeaderboard()">Leaderboard</button>
    <p id="time">Time: -</p>
    <div id="board">
    
    </div>
    <script>
        proJson = <?=$pro['json']?>;
        loadLeaderboard(proJson,'Pro');
        normalJson = <?=$normal['json']?>;
        loadLeaderboard(normalJson,'Normal');
        ezJson = <?=$ez['json']?>;
        loadLeaderboard(ezJson,'Ez');
    </script>
</body>
</html>