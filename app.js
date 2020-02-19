
document.addEventListener("DOMContentLoaded", (event) => {
    const formAlumnos = document.querySelector("#frmAlumno");

    formAlumnos.addEventListener("submit",(e) => {
        e.preventDefault();

        let Codigo = document.querySelector("#txtCodigoAlumno").value,
            Nombre = document.querySelector("#txtNombreAlumno").value,
            Direccion = document.querySelector("#txtDireccionAlumno").value,
            Telefono = document.querySelector("#txtTelefonoAlumno").value
        ;

        var ClaveCodigo = "Codigo"+Codigo;
        var ClaveNombre = "Nombre"+Codigo;
        var ClaveDireccion = "Direccion"+Codigo;
        var ClaveTelefono = "Telefono"+Codigo;
        

        if('localStorage' in window){
            window.localStorage.setItem(ClaveCodigo, Codigo);
            window.localStorage.setItem(ClaveNombre, Nombre);
            window.localStorage.setItem(ClaveDireccion, Direccion);
            window.localStorage.setItem(ClaveTelefono, Telefono);
        }
        else{
            alert("No se pudo Guardar");
        }

    });

    document.querySelector("#btnRecuperarAlumno").addEventListener("click", (e) => {
        if('localStorage' in window){

            let Codigo = document.querySelector("#txtCodigoAlumno").value;

            if(Codigo != ""){

                document.querySelector("#txtCodigoAlumno").value = window.localStorage.getItem("Codigo" + Codigo);
                document.querySelector("#txtNombreAlumno").value = window.localStorage.getItem("Nombre" + Codigo);
                document.querySelector("#txtDireccionAlumno").value = window.localStorage.getItem("Direccion" + Codigo);
                document.querySelector("#txtTelefonoAlumno").value = window.localStorage.getItem("Telefono" + Codigo);
            }
            else{
                alert("Ingrese un codigo para buscar");
            }
        }
        else{
            alert("No se pudo Recuperar");
        }
    })
});
