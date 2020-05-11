var myChart;

async function createChart() {
    const name = document.getElementById("playerSearch").value;
    const playerData = await getPlayer(name);
    const context = document.getElementById("myChart").getContext("2d");

    playerLabel = playerData.player.firstName + " " + playerData.player.lastName + " Stats: 2019-2020 ( " + playerData.player.team + " )";

    // Handles glitch where multiple results would appear
    if (myChart) {
        myChart.destroy();
    }

    // Chart styling
    Chart.defaults.global.defaultFontColor = "rgb(253, 185, 39)";
    Chart.defaults.global.defaultFontFamily = "cursive";
    Chart.defaults.global.defaultFontStyle = "bold";
    Chart.defaults.global.defaultFontSize = 14;

    myChart = new Chart(context, {
        type: "bar",
        data: {
            labels: playerData.xlabels,
            datasets: [{
                label: playerLabel,
                data: playerData.ydata,
                backgroundColor: "rgb(85, 37, 130)",
                borderColor: "rgb(253, 185, 39)",
                borderWidth: 2.4,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgb(85, 37, 130)",
                        lineWidth: 1.8,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgb(253, 185, 39)",
                        lineWidth: 1.8,
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

async function getPlayer(name) {
    let xlabels = [];
    let ydata = [];
    let multiPlayersCheck = {};
    let playerInfo = {};
    let playerStats = {};

    try {
        const urlPlayer = "https://www.balldontlie.io/api/v1/players?per_page=100&search=" + name;
        const responsePlayer = await fetch(urlPlayer);
        const info = await responsePlayer.json();
        multiPlayersCheck = info.data;
        playerInfo = info.data[0];

        urlStats = "https://www.balldontlie.io/api/v1/season_averages/?seasons[]=2019&player_ids[]=" + playerInfo.id;
        const responseStats = await fetch(urlStats);
        const stats = await responseStats.json();
        playerStats = stats.data[0];

        player = {
            "firstName": playerInfo.first_name,
            "lastName": playerInfo.last_name,
            "team": playerInfo.team.full_name,
        }

        xstats = {
            "Points": playerStats.pts,
            "Rebounds": playerStats.reb,
            "Assists": playerStats.ast,
            "Steals": playerStats.stl,
            "Blocks": playerStats.blk,
            "Field Goals Attempted": playerStats.fga,
            "Field Goals Made": playerStats.fgm,
            "Turnovers": playerStats.turnover,
        }

        for (x in xstats) {
            xlabels.push(x);
            ydata.push(xstats[x]);
        }
    }
    catch (error) {
        // search did not return a player
        if (error instanceof TypeError) {
            if (playerInfo == undefined) {
                alert("No information was found.");
                for (x in xstats) {
                    xlabels.push(x);
                    ydata.push(0);
                }
                player.firstName = "No";
                player.lastName = "Player";
                player.team = "No Team";
                return { player, xlabels, ydata }
            }

            // search returned a player without any stats
            if (playerStats == undefined && multiPlayersCheck.length == 1) {
                alert(name + " does not have any stats for the 2019-2020 season")
                for (x in xstats) {
                    xlabels.push(x);
                    ydata.push(0);
                }
            }

            // displaying multiple results properly
            if (multiPlayersCheck.length > 1) {
                let count = 0;
                let players = "";
                for (p in multiPlayersCheck) {
                    if (count == multiPlayersCheck.length - 1) {
                        players = players + multiPlayersCheck[p].first_name + " " + multiPlayersCheck[p].last_name + ".";
                    }
                    else {
                        players = players + multiPlayersCheck[p].first_name + " " + multiPlayersCheck[p].last_name + ", ";
                        count += 1;
                    }
                }
                let msg = "Multiple results found (max: 100). Please enter one of the following names:\n" + players;
                alert(msg);

                // Adjusting the chart display
                player.firstName = "No";
                player.lastName = "Player";
                player.team = "No Team";
                xlabels = ["Points", "Rebounds", "Assists", "Steals",
                    "Blocks", "Field Goals Attempted",
                    "Field Goals Made", "Turnovers"];
            }
        }
    }
    return { player, xlabels, ydata };
}
