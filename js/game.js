class Player {
    constructor(name, time) {
        this.name = name;
        this.time = time;
    }
    toString() {
        return this.name + " - " + showTime(this.time);
    }
}

var ezPlayer = [];
var normalPlayer = [];
var proPlayer = [];
var mode = "Ez";
var uTime;
var game = false;
var interval;
var w, h;
var tiles = [];
var score;
var check = [];
var viewingLeaderboard = false;
var cheated = "";

function compare(a, b) {
    return a.time - b.time;
}

function showTime(t) {
    min = parseInt(t / 60) + "";
    if (min.length == 1) {
        min = "0" + min;
    }
    sec = t % 60 + "";
    if (sec.length == 1) {
        sec = "0" + sec;
    }
    return min + ":" + sec;
}

function fillLeaderboard(name, time) {
    if (mode == "Ez") {
        ezPlayer[ezPlayer.length] = new Player(name, time);
        ezPlayer.sort(compare);
        if (ezPlayer.length > 10) {
            ezPlayer = ezPlayer.slice(0, 10);
        }
        saveLeaderboard(ezPlayer, 'ez')
    }
    else if (mode == "Normal") {
        normalPlayer[normalPlayer.length] = new Player(name, time);
        normalPlayer.sort(compare);
        if (normalPlayer.length > 10) {
            normalPlayer = normalPlayer.slice(0, 10);
        }
        saveLeaderboard(normalPlayer, 'normal')
    }
    else if (mode == "Pro") {
        proPlayer[proPlayer.length] = new Player(name, time);
        proPlayer.sort(compare);
        if (proPlayer.length > 10) {
            proPlayer = proPlayer.slice(0, 10);
        }
        saveLeaderboard(proPlayer, 'pro')
    }
}

function _initFillLeaderboard(name, time) {
    if (mode == "Ez") {
        ezPlayer[ezPlayer.length] = new Player(name, time);
    }
    else if (mode == "Normal") {
        normalPlayer[normalPlayer.length] = new Player(name, time);
    }
    else if (mode == "Pro") {
        proPlayer[proPlayer.length] = new Player(name, time);
    }
}

function setTime() {
    document.getElementById("time").textContent = "Time: " + showTime(uTime);
}

function setWidth() {
    if (game == false) {
        clearBoard();
        mode = document.getElementById("mode").value;
        if (mode == "Ez") {
            document.getElementById("board").style.width = "600px";
        }
        else if (mode == "Normal") {
            document.getElementById("board").style.width = "900px";
        }
        else if (mode == "Pro") {
            document.getElementById("board").style.width = "1200px";
        }
        if (viewingLeaderboard) {
            leaderboard();
        }
    }
    else {
        alert("Selesaikan game dulu");
    }
}

function start() {
    if (game == false) {
        viewingLeaderboard = false;
        document.getElementById("board").innerHTML = "";
        mode = document.getElementById("mode").value;
        uTime = 0;
        setTime();
        game = true;
        tiles = [];
        check = [];
        w = 4;
        if (mode == "Ez") {
            h = 4;
            document.getElementById("board").style.width = "600px";
        }
        else if (mode == "Normal") {
            h = 6;
            document.getElementById("board").style.width = "900px";
        }
        else if (mode == "Pro") {
            h = 8;
            document.getElementById("board").style.width = "1200px";
        }
        document.getElementById("mode").disabled = true;
        score = w * h;
        for (var i = 1; i <= (score / 2); i++) {
            var div1 = document.createElement("div");
            div1.className = "tileHidden";
            div1.innerHTML = '<p><img src="./img/'+i+'.png" alt="'+i+'"></p>';
            div1.style.order = Math.floor(Math.random() * 1000) + "";
            div1.onclick = pickTile;
            div1.style.opacity = "0";
            tiles[tiles.length] = div1;

            var div2 = document.createElement("div");
            div2.className = "tileHidden";
            div2.innerHTML = '<p><img src="./img/'+i+'.png" alt="'+i+'"></p>';
            div2.style.order = Math.floor(Math.random() * 1000) + "";
            div2.onclick = pickTile;
            div2.style.opacity = "0";
            tiles[tiles.length] = div2;

            document.getElementById("board").appendChild(div1);
            document.getElementById("board").appendChild(div2);
        }
        setTimeout(appearTile, 100);
        interval = setInterval(tick, 1000);
    }
    else {
        alert("Selesaikan game dulu");
    }
}

function appearTile() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.opacity = "1";
    }
}

function fadeTile() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.opacity = "0";
    }
    setTimeout(clearBoard, 200)
}

function clearBoard() {
    document.getElementById("board").innerHTML = "";
}

function pickTile(e) {
    if (e.target.className == "tileHidden" && check.length < 2) {
        e.target.className = "tileAppear";
        check[check.length] = e.target;
        if (check.length >= 2) {
            setTimeout(checkTile, 100);
        }
    }
}

function checkTile() {
    if (check[0].innerHTML == check[1].innerHTML) {
        check[0].style.backgroundColor = "darkgreen";
        check[1].style.backgroundColor = "darkgreen";
        setTimeout(checkWin, 1000);
        check = [];
    }
    else {
        check[0].className = "tileWrong";
        check[1].className = "tileWrong";
        setTimeout(notTile, 500);
    }
}

function notTile() {
    check[0].className = "tileHidden";
    check[1].className = "tileHidden";
    check = [];
}

function checkWin() {
    var win = true;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].className == "tileHidden") {
            win = false;
        }
    }
    if (win) {
        clearInterval(interval);
        alert("You win!");
        var name = prompt("Your name :");
        if (name == "") {
            name = "Unknown";
        }
        fillLeaderboard(name + cheated, uTime);
        stopGame();
        saveLeaderboard();
    }
}

function cheat() {
    if (game) {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].className = "tileAppear";
            tiles[i].style.backgroundColor = "darkgreen";
        }
        cheated = " (Cheat)"
        setTimeout(checkWin, 2000);
    }
    else {
        alert("Belum mulai game");
    }
}

function leaderboard() {
    if (game == false) {
        if (document.getElementById("board").innerHTML == "") {
            mode = document.getElementById("mode").value;
            viewingLeaderboard = true;
            if (mode == "Ez") {
                showLeaderboard(ezPlayer);
            }
            else if (mode == "Normal") {
                showLeaderboard(normalPlayer);
            }
            else if (mode == "Pro") {
                showLeaderboard(proPlayer);
            }
        }
    }
    else {
        alert("Selesaikan game dulu");
    }
}

function showLeaderboard(arr) {
    var size = arr.length;
    if (size > 10) {
        size = 10;
    }
    for (let i = 0; i < size; i++) {
        var div = document.createElement("div");
        div.className = "leader";
        div.textContent = arr[i].toString();
        document.getElementById("board").appendChild(div);
    }
    setTimeout(growLeaderboard, 100);
}

function growLeaderboard() {
    var scores = document.getElementsByClassName("leader");
    for (let i = 0; i < scores.length; i++) {
        scores[i].style.opacity = "1";
    }
}

function tick() {
    uTime++;
    setTime();
}

function stopGame() {
    document.getElementById("time").textContent = "Time: -";
    setTimeout(fadeTile, 100);
    document.getElementById("mode").disabled = false;
    game = false;
    cheated = "";
}

function saveLeaderboard(player, diff) {
    var json = JSON.stringify(player);
    $.ajax({
        type: "get",
        url: "./leaderboard.php",
        data: {
            'action': 'save',
            'diff': diff,
            'json': json
        },
        success: function (response) {
            console.log(response);
        }
    });
}

function deleteLeaderboard() {
    if (confirm("Delete selected Leaderboard?")) {
        document.getElementById("board").innerHTML = "";
        var diff = "ez";
        if (mode == "Ez") {
            ezPlayer = [];
            diff = "ez";
        }
        else if (mode == "Normal") {
            normalPlayer = [];
            diff = "normal";
        }
        else if (mode == "Pro") {
            proPlayer = [];
            diff = "pro";
        }
        $.ajax({
            type: "get",
            url: "../leaderboard.php",
            data: {
                'action': 'delete',
                'diff': diff
            },
            success: function (response) {
                alert("Leaderboard deleted!");
            }
        });
    }

}

function loadLeaderboard(json, md) {
    mode = md;
    if (json.length === 0) {
        console.log("No data for " + md + "!");
    }
    else {
        for (var key in json) {
            _initFillLeaderboard(json[key]['name'], json[key]['time']);
        }
    }
}

