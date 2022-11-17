var  pics = [];
pics["100"] = "billete_100.png";
pics["50"] = "billete_50.png";
pics["20"] = "billete_20.png";
pics["10"] = "billete_10.png";
pics["5"] = "billete_5.png";
pics["1"] = "billete_1.png";

class Billete{
    constructor(v, c)
    {
        this.pic = new image();
        this.valor = v; 
        this.cantidad = c;

        this.pic.scr = pics[this.valor.toString()];
    }
    
    showBill(x, y)
    {
        canvas2dContext.drawImage(this.pic,  x, y);
    }
}