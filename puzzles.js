// var rows = 5;
// var columns = 5;

// window.onload = function () {
//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < columns; c++) {
//             //let tile = document.document.createElement("img");
//             document.getElementById("puzzleBoard");
//         }
//     }


//     let pieces = [];
//     for (let i = 1; i <= rows * columns; i++) {
//         pieces.push(i.toString());
//     }
//     for (let i = 1; i < pieces.length; i++) {
//         let tile = document.createElement("img");
//         tile.src = "/media/puzzles/northernLights" + pieces[i] + ".png";
//         document.getElementById("puzzleBoard").append(tile);
//     }
// }
$(document).ready(function () {
    $("#northernLightsBtn").click(function () {
        $.get("northernLights.html", function (data, status) {
            if (status == "success") {
                $("#puzzleDisplay").html(data);
            }
            else {
                $("#puzzleDisplay").html("Error retrieving puzzle");
            }
        });
    });
    $("#sunriseBtn").click(function () {
        $.get("sunrise.html", function (data, status) {
            if (status == "success") {
                $("#puzzleDisplay").html(data);
            }
            else {
                $("#puzzleDisplay").html("Error retrieving puzzle");
            }
        });
    });
    $("#leavesBtn").click(function () {
        $.get("leaves.html", function (data, status) {
            if (status == "success") {
                $("#puzzleDisplay").html(data);
            }
            else {
                $("#puzzleDisplay").html("Error retrieving puzzle");
            }
        });
    });

});

// });

