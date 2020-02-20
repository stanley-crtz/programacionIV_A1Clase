document.addEventListener("DOMContentLoaded", e => {

    const form = document.querySelector("#frmConversores");

    document.querySelector("#cboTipos").addEventListener("change", function(){
        
        var selDe = document.getElementById("cboDe");
        var selA = document.getElementById("cboA");

        var Convertir = document.querySelector("#cboTipos").value;

        console.log(Convertir);

        selDe.length = 0;
        selA.length = 0;

        switch (Convertir){

            case "Moneda":
                selDe.options[0] = new Option("Dolar","dolar");
                selDe.options[1] = new Option("Euro","euro");
                selDe.options[2] = new Option("Quetzal", "quetzal");
                selDe.options[3] = new Option("Lempira", "lempira");
                selDe.options[4] = new Option("Cordoba", "cordoba");

                selA.options[0] = new Option("Dolar","dolar");
                selA.options[1] = new Option("Euro","euro");
                selA.options[2] = new Option("Quetzal", "quetzal");
                selA.options[3] = new Option("Lempira", "lempira");
                selA.options[4] = new Option("Cordoba", "cordoba");
                break;
            case "Longitud":
                selDe.options[0] = new Option("Metro","metro");
                selDe.options[1] = new Option("Kilometro","kilometro");
                selDe.options[2] = new Option("Centimetro", "centimetro");
                selDe.options[3] = new Option("Pie", "pie");
                selDe.options[4] = new Option("Pulgada", "pulgada");

                selA.options[0] = new Option("Metro","metro");
                selA.options[1] = new Option("Kilometro","kilometro");
                selA.options[2] = new Option("Centimetro", "centimetro");
                selA.options[3] = new Option("Pie", "pie");
                selA.options[4] = new Option("Pulgada", "pulgada");
                break;
            case "Almacenamiento":
                selDe.options[0] = new Option("Byte","byte");
                selDe.options[1] = new Option("Kilobit","kilobit");
                selDe.options[2] = new Option("MegaBit", "megabit");
                selDe.options[3] = new Option("GigaBit", "gigabit");
                selDe.options[4] = new Option("TeraBit", "terabit");;

                selA.options[0] = new Option("Byte","byte");
                selA.options[1] = new Option("Kilobit","kilobit");
                selA.options[2] = new Option("MegaBit", "megabit");
                selA.options[3] = new Option("GigaBit", "gigabit");
                selA.options[4] = new Option("TeraBit", "terabit");
                break;
            case "Tiempo":
                selDe.options[0] = new Option("Milisegundo","milisegundo");
                selDe.options[1] = new Option("Segundo","segundo");
                selDe.options[2] = new Option("Minuto", "minuto");
                selDe.options[3] = new Option("Hora", "hora");
                selDe.options[4] = new Option("Dia", "dia");

                selA.options[0] = new Option("Milisegundo","milisegundo");
                selA.options[1] = new Option("Segundo","segundo");
                selA.options[2] = new Option("Minuto", "minuto");
                selA.options[3] = new Option("Hora", "hora");
                selA.options[4] = new Option("Dia", "dia");
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

        switch (Convertir){

            case "Moneda":

                let Monedas = {
                    "dolar":1,
                    "euro":0.93,
                    "quetzal":7.63,
                    "lempira":24.9,
                    "cordoba":34.19
                };

                $res.innerHTML = `Respuesta: ` + (Monedas[a]/Monedas[de]*cantidad).toFixed(2);

                break;
            case "Longitud":

                let Longitud = {
                    "metro":1,
                    "kilometro":0.001,
                    "centimetro":100,
                    "pie":3.281,
                    "pulgada":39.37
                };

                $res.innerHTML = `Respuesta: ` + (Longitud[a]/Longitud[de]*cantidad).toFixed(3);

                break;

            case "Almacenamiento":

                let Almacenamiento = {
                    "byte":125000,
                    "kilobit":1000,
                    "megabit":1,
                    "gigabit":0.001,
                    "terabit":0.000001
                };

                $res.innerHTML = `Respuesta: ` + (Almacenamiento[a]/Almacenamiento[de]*cantidad).toFixed(6);

                break;
            
            case "Tiempo":

                let Tiempo = {
                    "milisegundo":60000,
                    "segundo":60,
                    "minuto":1,
                    "hora":0.0166667,
                    "dia":0.000694444
                };

                $res.innerHTML = `Respuesta: ` + (Tiempo[a]/Tiempo[de]*cantidad).toFixed(2);

                break;

        }

    });

});