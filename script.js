var previousPoints = 0;
var previousTeam = "";
var previousMatches = {};

function updateMatches(teamId) {
  var matchesElement = document.getElementById(teamId + "-matches");
  var currentMatches = parseInt(matchesElement.textContent);

  // Store previous matches
  previousMatches[teamId] = currentMatches;

  matchesElement.textContent = currentMatches + 1;
}

function undoMatches(teamId) {
  var matchesElement = document.getElementById(teamId + "-matches");

  if (previousMatches.hasOwnProperty(teamId)) {
    var previousMatchesValue = previousMatches[teamId];
    matchesElement.textContent = previousMatchesValue;
    delete previousMatches[teamId];
  }
}


function updatePoints() {
  var teamSelect = document.getElementById("team-select");
  var selectedTeam = teamSelect.value;

  if (selectedTeam === "") {
    alert("Please select a team!");
    return;
  }

  var pointsElement = document.getElementById(selectedTeam + "-points");
  var currentPoints = parseInt(pointsElement.textContent);

  previousPoints = currentPoints;
  previousTeam = selectedTeam;

  pointsElement.textContent = currentPoints + 2;

  sortTable();
  teamSelect.value = "";
}

function undoPoints() {
  if (previousTeam === "") {
    alert("No points to undo!");
    return;
  }

  var pointsElement = document.getElementById(previousTeam + "-points");
  pointsElement.textContent = previousPoints;

  sortTable();

  previousPoints = 0;
  previousTeam = "";
}

function sortTable() {
  var table = document.getElementById("points-table");
  var rows = Array.from(table.rows).slice(1); // Exclude the table header row

  rows.sort(function(a, b) {
    var pointsA = parseInt(a.cells[1].textContent);
    var pointsB = parseInt(b.cells[1].textContent);
    return pointsB - pointsA;
  });

  for (var i = 0; i < rows.length; i++) {
    table.appendChild(rows[i]);
  }
}
