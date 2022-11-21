function genereTableau(donnees, id) {
  var nb = donnees.length;
  if (nb > 0) {
    var htmltable = "<tr>";
    for (var attr in donnees[0]) {
      htmltable = htmltable + "<th>" + attr + "</th>";
    };
    htmltable = htmltable + "</tr>";
    for (var x = 0; x < nb; x++) {
      htmltable = htmltable + "<tr>";
      for (var a in donnees[x]) {
        if(donnees[x][a] > 100000) {
          htmltable = htmltable + "<td>" + "$" + donnees[x][a] + "</td>";
        } else {
          htmltable = htmltable + "<td>" + donnees[x][a] + "</td>";
        }
      }
      htmltable = htmltable + "</tr>";
    }
    $("#" + id).html(htmltable);
  } else {
    alert("La réponse à la requête est vide.");
    $("#" + id).html("");
  }
};

function requete(req) {
  var postData = {};
  postData["db"] = "dift6800_baseball";
  postData["query"] = req;
  //La requête AJAX suivante, fait appel au backend db.php
  $.post(
    "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
    postData,
    function (reponse, status) {
      console.log(status);
      var obj = JSON.parse(reponse);
      if (obj.error == "") {
        genereTableau(obj.data, "table");
      } else {
        alert("Erreur:" + obj.error);
      }
    }
  );
};

var nom = "CONCAT(Master.nameFirst, ' ', Master.nameLast) AS 'Nom complet du lanceur'";
var pitching = ", Pitching.G, Pitching.W, Pitching.SV, W+SV, Pitching.L, Pitching.SO, Pitching.H, Pitching.BB, Pitching.IPouts";
var salaire = ", Salaries.salary AS 'salaire du lanceur' FROM Pitching";
var innerJoin = " INNER JOIN Master ON Pitching.playerID = Master.playerID INNER JOIN Salaries ON Pitching.playerID = Salaries.playerID ";
var where = "WHERE (Pitching.yearID=1996) AND (Salaries.yearID=Pitching.yearID) AND (Pitching.teamID='MON') AND (Pitching.teamID=Salaries.teamID) AND (Pitching.GS=0) ORDER BY W+SV DESC";

$(document).ready(function () {
  $("#lance").click(function (event) {

    $("#titre").text("Lanceurs de relève des Expos de Montréal en 1996");
    requete(nom + pitching + salaire + innerJoin + where);

  });
});