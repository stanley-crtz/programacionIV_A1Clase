var $ = el => document.querySelectorAll(el), 
    id = el => document.getElementById(el), 
    clase = el => document.querySelector(el), 
    script = el => document.createElement(el);

document.addEventListener("DOMContentLoaded", event => {
    
    event.preventDefault();

    var Modulos = $(".mostrar");

    for (let i = 0; i < Modulos.length; i++) {
        Modulos[i].addEventListener("click",mostrarInformacion);
        
    }

    function mostrarInformacion(){
        
        let dataset = this.dataset.modulo;

        fetch(`public/vistas/${dataset}/${dataset}.html`).then( resp => resp.text() ).then( resp => {
            
            id(`vista-${dataset}`).innerHTML = resp;
            console.log(dataset);
            
            let btnCerrar = clase(`.close-${dataset}`);

            btnCerrar.addEventListener("click", event => {

                id(`vista-${dataset}`).innerHTML = "";
            });
            
            let js = script("script");
            
            js.src = `public/vistas/${dataset}/${dataset}.js`;

            clase("body").appendChild(js);

        });
        
    }


});
