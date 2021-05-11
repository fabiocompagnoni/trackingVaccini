/**
 * @author Fabio Compagnoni
 * @version 1.0 - 10/05/2021
 */
window.addEventListener("load",datiGenerali);
window.addEventListener("load",datiConsegne);
window.addEventListener("load",datiFascie);
function datiGenerali()
{
    $.ajax({
        url: 'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/vaccini-summary-latest.csv',
        dataType: 'text',
      }).done(mostraGenerico);
}
function mostraGenerico(data)
{
    var dati=data.split(/\r?\n|\r/);
    let tabella="<div class='table-responsive'><table class='table table-hover'>";
    tabella+="<thead><tr><th>Regione</th><th>Dosi somministrate</th><th>Dosi consegnate</th><th>Percentuale somministrazione</th><th>Ultimo aggiornamento</th></tr></thead>";
    for(i=1;i<dati.length-1;i++)
    {
        var righe = dati[i].split(',');
        tabella+="<tr>";
        tabella+="<td>"+righe[8]+"</td>";
        tabella+="<td>"+righe[1]+"</td>"; 
        tabella+="<td>"+righe[2]+"</td>";
        tabella+="<td>"+righe[3]+"%</td>";
        tabella+="<td>"+righe[4]+"</td>";
        tabella+"</tr>";
    }
    tabella+="</table></div>";
    $('#datiGenerali').append(tabella);
}
function datiConsegne()
{
    $.ajax({
        url: 'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/consegne-vaccini-latest.csv',
        dataType: 'text',
      }).done(mostraConsegne);
}
function mostraConsegne(data)
{
    var dati=data.split(/\r?\n|\r/);
    let tabella="<div class='table-responsive'><table class='table table-hover'>";
    tabella+="<thead><tr><th>Regione</th><th>Dosi</th><th>Fornitore</th><th>Data consegna</th></tr></thead>";
    for(i=1;i<dati.length-1;i++)
    {
        var righe = dati[i].split(',');
        tabella+="<tr>";
        tabella+="<td>"+righe[7]+"</td>";
        tabella+="<td>"+righe[2]+"</td>"; 
        tabella+="<td>"+righe[1]+"</td>";
        tabella+="<td>"+righe[3]+"</td>";
        tabella+"</tr>";
    }
    tabella+="</table></div>";
    $('#consegneVaccini').append(tabella);
    
    
}
function datiFascie()
{
    $.ajax({
        url: 'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.csv',
        dataType: 'text',
      }).done(mostraFascie);
}
function mostraFascie(data)
{
    var dati=data.split(/\r?\n|\r/);
    let tabella="<div class='table-responsive'><table class='table table-hover'>";
    tabella+="<thead><tr><th>Fascia anagrafica</th><th>Totale vaccini</th><th>Maschi</th><th>Femmine</th><th>Categoria Operatori sanitari</th><th>Personale non sanitario</th><th>Ospiti rsa</th><th>Personale scolastico</th><th>Categoria 60-69 anni</th><th>Categoria 70-79</th><th>Categoria Over 80</th><th>Soggetti fragili</th><th>Forze armate</th><th>Altre categorie</th><th>Prima dose</th><th>Seconda dose</th><th>Ultimo aggiornamento</th></tr></thead>";
    for(i=1;i<dati.length-1;i++)
    {
        var righe = dati[i].split(',');
        tabella+="<tr>";
        for(j=0;j<righe.length;j++)
        {
            if(j==15)
                tabella+="<td class='table-success'>";
            if(j==14)
                tabella+="<td class='table-info'>";
            if(j!=15&&j!=14)
                tabella+="<td>";
            tabella+=righe[j]+"</td>";
        }
        tabella+"</tr>";
    }
    tabella+="</table></div>";
    $('#fascie').append(tabella);
    $('th').click(function(){
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    })
    function comparer(index) {
        return function(a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index){ return $(row).children('td').eq(index).text() }
}
function ultimoAggiornamento()
{
    let json=readJsonFromUrl("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/last-update-dataset.json");
    const obj = JSON.parse(json);
    let data=obj.ultimo_aggiornamento;
    let dd=new Date(data);
    let a=dd.getFullYear();
    let m=dd.getMinutes();
    let s=dd.getSeconds();
    let h=dd.getHours();
    let g=dd.getDay();
    let mese=dd.getMonth();
    let string=d+"/"+mese+"/"+a+" "+h+":"+m+":"+s;
    console.log(string);
    document.getElementById("dAgg").innerHTML+=string;
}
