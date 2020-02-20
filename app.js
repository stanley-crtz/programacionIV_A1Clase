document.addEventListener("DOMContentLoaded", e => {

    const form = document.querySelector("#frmConversores");

    document.querySelector("#cboTipos").addEventListener("change", function(){
        
        var selDe = document.getElementById("cboDe");
        var selA = document.getElementById("cboA");

        var Convertir = document.querySelector("#cboTipos").value;

        var MonedasValor = ["dolar", "euro", "quetzal", "lempira", "cordoba"];
        var MonedasText = ["Dolar", "Euro", "Quetzal", "Lempira", "Cordoba"];

        var LongitudValor = ["metro", "kilometro", "centimetro", "pie", "pulgada"];
        var LongitudText = ["Metro", "Kilometro", "Centimetro", "Pie", "Pulgada"];

        var AlmacenamientoValor = ["byte", "kilobit", "megabit", "gigabit", "terabit"];
        var AlmacenamientoText = ["Byte", "Kilobit", "Megabit", "Gigabit", "Terabit"];

        var TiempoValor = ["milisegundo", "segundo", "minuto", "hora", "dia"];
        var TiempoText = ["Milisegundo", "Segundo", "Minuto", "Hora", "Dia"];

        console.log(Convertir);

        selDe.length = 0;
        selA.length = 0;

        switch (Convertir){

            case "Moneda":
                
                for (let i = 0; i < MonedasValor.length; i++) {
                    selDe.options[i] = new Option(MonedasText[i],MonedasValor[i]);
                    selA.options[i] = new Option(MonedasText[i],MonedasValor[i]);
                }

                break;
            case "Longitud":
                
                for (let i = 0; i < LongitudValor.length; i++) {
                    selDe.options[i] = new Option(LongitudText[i],LongitudValor[i]);
                    selA.options[i] = new Option(LongitudText[i],LongitudValor[i]);
                }

                break;
            case "Almacenamiento":
                
                for (let i = 0; i < AlmacenamientoValor.length; i++) {
                    selDe.options[i] = new Option(AlmacenamientoText[i],AlmacenamientoValor[i]);
                    selA.options[i] = new Option(AlmacenamientoText[i],AlmacenamientoValor[i]);
                }

                break;
            case "Tiempo":
                
                for (let i = 0; i < TiempoValor.length; i++) {
                    selDe.options[i] = new Option(TiempoText[i],TiempoValor[i]);
                    selA.options[i] = new Option(TiempoText[i],TiempoValor[i]);
                }

                break;

        }



    },false);

    form.addEventListener("submit",event => {

        event.preventDefault();

        let Convertir = document.querySelector("#cboTipos").value;

        let de = document.querySelector("#cboDe").value, 
            a = document.querySelector("#cboA").value,
            cantidad = document.querySelector("#txtCantidadConversor").value;

        let $res = document.querySelector("#lblRespuesta");

        let Convertidor;

        switch (Convertir){

            case "Moneda":

                Convertidor = {"dolar":1, "euro":0.93, "quetzal":7.63, "lempira":24.9, "cordoba":34.19 };

                break;
            case "Longitud":

                Convertidor = { "metro":1, "kilometro":0.001, "centimetro":100, "pie":3.281, "pulgada":39.37};

                break;

            case "Almacenamiento":

                Convertidor = {"byte":125000, "kilobit":1000, "megabit":1, "gigabit":0.001, "terabit":0.000001};

                break;
            
            case "Tiempo":

                Convertidor = {"milisegundo":60000, "segundo":60, "minuto":1, "hora":0.0166667, "dia":0.000694444 };

                break;

        }

        $res.innerHTML = `Respuesta: ` + (Convertidor[a]/Convertidor[de]*cantidad).toFixed(2);

    });

});