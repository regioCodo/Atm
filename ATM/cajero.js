var nDinero = document.getElementById("nDinero");
var butExtraer = document.getElementById("buttonExtraer")
var butClear = document.getElementById("buttonClear");
var resultado = document.getElementById("resultado");
var reporte = document.getElementById("availableMoney");
var moneyAvailable = document.getElementById("availableMoney");
var billetesCanvas = document.getElementById("billetes");
var canvas2dContext = billetesCanvas.getContext("2d");
var anchoCanvas = billetesCanvas.offsetWidth;
var altoCanvas = billetesCanvas.offsetHeight;

butExtraer.addEventListener("click", entregarDinero);
butClear.addEventListener("click", clear);
document.addEventListener("keyup", enterPressed);

var caja = [];
var entregado = [];
var dineroSolicitado = 0;
var papeles = 0;
var div = 0;
var actualMoney = 0;
var dineroEntregadoSesion = 0;
var sessionNumber = 0;

setGlobalParameters();
calcActualMoney();

function setGlobalParameters()
{
    caja.push(new Billete(100, 5));
    caja.push(new Billete(50, 15));
    caja.push(new Billete(20, 10));
    caja.push(new Billete(10, 12));
    caja.push(new Billete(5, 10));
    caja.push(new Billete(1, 30));}

    function entregarDinero(){
        var rigthWord = "";
        var x = 0;
        var y = 0;
        dineroSolicitado = parseInt(numDinero.value);
        clear();
        if(actualMoney > 0 )
        {
            for(var bi of caja)
            {
                if(dineroSolicitado > 0 )
                {
                    div = Math.floor(dineroSolicitado / bi.valor);
                if (div > bi.cantidad)
                {
                    papeles = bi.cantidad;
                }
                else
                {
                    papeles = div;
                }
                entregado.push(new Billete(bi.valor, papeles));
                dineroSolicitado -= bi.valor * papeles;
                actualMoney -= bi.valor * papeles;
                dineroEntregadoSesion +=  bi.valor * papeles;
                bi.cantidad -= papeles;
            }
            else{break;}            
        }
        }
   }
   if(dineroSolicitado > 0)
   {resultado.immerHTML = "<p> Lo sentimos, no se pudo completar la contidad, pero te dimos lo que pudimos: $" + dineroEntregadoSesion + 
    "... <br/> Soy un cajero Pobre y no tengo dinero :(</p>";}
    for ( var e of entregado)
     {
        if(e.cantidad > 0 )
        {
            if (e.cantidad == 1)
            {
                rigthWord = "billete";
            }
            else {
                rigthWord = "billetes";
            }
            resultado.innerHTML += e.cantidad + " " + rigthWord + " de $" + e.valor + "<br/>";
            for( var sb = 0; sb < e.cantidad; sb++)
            {
                e.showBill(x,y);
                y += 70;
                if (y > altoCanvas - 10)
                {
                    y = 0; x+= 150;
                }
            }
            calcActualMoney();
        }
    else{
        resultado.innerHTML = "<p> Lo sentimos, no hay dinero disponible en el cajero para procesar tu solicitud, por favor, vuelve mas tarde :$ </p>"
    }
}

function calcActualMoney()
{
    if (actualMoney == 0){
        for (var m of caja)
        {
            if(m.cantidad > 0){
                actualMoney += (m.cantidad * m.valor);
            }
        }
    }
    moneyAvailable.innerHTML = "Dinero Total Disponible en el cajero : $" + actualMoney;
    if(dineroEntregadoSesion > 0)
    {
        sessionNumber ++;
        reporte.innerHTML += "Dinero entregado en la sesion numero " + sessionNumber + ": $" + dineroEntregadoSesion + "<br/>";
    }
}

function clear (){
    dineroEntregadoSesion = 0;
    entregado.length = 0;
    resultado.innerHTML = !"";
    numDinero.value = 1;
    canvas2dContext.clearRect(0, 0, anchoCanvas, altoCanvas);
}
function enterPressed(evento)
{
    if (evento.key == "enter")
    {
        entregarDinero();
    }
}
