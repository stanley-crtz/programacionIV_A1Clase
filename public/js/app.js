function init() {
    
    $("[class*='mostrar']").click(function () {

        let modulo = $(this).data('modulo');
        
        console.log(modulo);

        $(`#vista-${modulo}`).load(`public/vistas/${modulo}/${modulo}.html`, function () {

            $(`#close-${modulo}`).click(function () {
                
                $(`#vista-${modulo}`).hide( "puff", "slow" );

            });

        }).draggable().show( "scale", 1000 );


    });

}

init();