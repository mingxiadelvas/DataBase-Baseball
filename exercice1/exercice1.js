//Cette fonction remplie un tableau html avec identificateur id avec 
//contient une colonne par attribut dans donnees et les valeurs dans donnees 
//rangees. Chaque colonne est nomme par l'attribut qu'il represente.

// Les fonctions genereTableau et poste sont tirées de la démo 9 du cours 1005
function genereTableau(donnees, id){
    var nb = donnees.length;
    if(nb>0){
        var htmltable="<tr>";
        for(var attr in donnees[0]){
            htmltable=htmltable+"<th>"+attr+"</th>";
        };
        htmltable=htmltable+"</tr>";
        for(var x=0;x<nb;x++){
            htmltable=htmltable+"<tr>";
            for(var a in donnees[x]){
                htmltable=htmltable+"<td>"+donnees[x][a]+"</td>";
            }
            htmltable=htmltable+"</tr>";
        }
        $("#"+id).html(htmltable);
    }else{
        alert("La réponse à la requête est vide.");
        $("#"+id).html("");
    }
};

function poste(requete){
    var postData = {};
    postData["db"] = "dift6800_baseball";
    postData["query"] = requete;	
    //La requête AJAX suivante, fait appel au backend db.php
    $.post(
        "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
        postData,
        function(reponse,status){
           console.log(status);
           var obj = JSON.parse(reponse);
          if(obj.error==""){  
              genereTableau(obj.data, "table");
          }else{
            alert("Erreur:"+obj.error);
          }
        }
      );
};
//Fonction qui gère l'apparition des images en fonction de l'année selectionnée
function showMeAnderson(e) {
    var Anderson = document.getElementById("Anderson");
    var Barker = document.getElementById("Barker");
    var Acker = document.getElementById("Acker");
    var MBell = document.getElementById("MBell");
    var Avery = document.getElementById("Avery");
    var Alicea = document.getElementById("Alicea");
    var Aquino = document.getElementById("Aquino");
    var Barden = document.getElementById("Barden");
    var Burke = document.getElementById("Burke");
    var Buckner = document.getElementById("Buckner");
    var Abreu = document.getElementById("Abreu");
    var Blanco = document.getElementById("Blanco");
    var Bell = document.getElementById("Bell");
    Anderson.style.display = "none";
    Barden.style.display = "none";
    Burke.style.display = "none";
    Buckner.style.display = "none";
    Abreu.style.display = "none";
    Blanco.style.display = "none";
    Bell.style.display = "none";
    Alicea.style.display = "none";
    Avery.style.display = "none";
    MBell.style.display = "none";
    Acker.style.display = "none";
    Barker.style.display = "none";

    if(e == "2002"||e=="2003" ||e == "2004"||e=="1998"||e=="1999" ||e == "2000"||e=="2001") {
        Anderson.style.display = "block";
    } 
    if(e == "2007"){
        Barden.style.display = "block";
    } 
    if(e == "2008"){
        Burke.style.display = "block";
    } 
    if(e == "2009"){
        Buckner.style.display = "block";
    } 
    if(e == "2010"){
        Abreu.style.display = "block";
    } 
    if(e == "2011"|| e=="2012"){
        Blanco.style.display = "block";
    } 
    if(e == "2013"){
        Bell.style.display = "block";
    } 
    if(e == "1997"){
        Alicea.style.display = "block";
    } 
    if(e == "1991"||e=="1992" ||e == "1993"||e=="1994"||e=="1995" ||e == "1996") {
        Avery.style.display = "block";
    } 
    if(e == "1990") {
        MBell.style.display = "block";
    } 
    if(e == "1986"||e=="1987" ||e == "1988"||e=="1989") {
        Acker.style.display = "block";
    } 
    if(e == "1985") {
        Barker.style.display = "block";
    } 
}
var s = "nameFirst as prenom, nameLast as nom, teamID, MAX(salary) as salaire from Master t, Salaries t2 WHERE t.playerID=t2.playerID AND t2.yearID=";  
$(document).ready(function(){   // <---- requete ici
    $("#lance").click(function(event){                       
     var annee = $("#choixannee").val();                      
       poste(s+annee);
       showMeAnderson(annee);
       
    });
});






