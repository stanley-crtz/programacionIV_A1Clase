
document.addEventListener("DOMContentLoaded", (event) => {
    const formAlumnos = document.querySelector("#frmAlumno");

    formAlumnos.addEventListener("submit",(e) => {
        e.preventDefault();

        let Codigo = document.querySelector("#txtCodigoAlumno").value,
            Nombre = document.querySelector("#txtNombreAlumno").value,
            Direccion = document.querySelector("#txtDireccionAlumno").value,
            Telefono = document.querySelector("#txtTelefonoAlumno").value
        ;

        if('localStorage' in window){
            window.localStorage.setItem("Codigo",Codigo);
            window.localStorage.setItem("Nombre",Nombre);
            window.localStorage.setItem("Direccion",Direccion);
            window.localStorage.setItem("Telefono",Telefono);
        }
        else{
            alert("No se pudo Guardar");
        }

    });

    document.querySelector("#btnRecuperarAlumno").addEventListener("click", (e) => {
        if('localStorage' in window){
            document.querySelector("#txtCodigoAlumno").value = window.localStorage.getItem("Codigo");
            document.querySelector("#txtNombreAlumno").value = window.localStorage.getItem("Nombre");
            document.querySelector("#txtDireccionAlumno").value = window.localStorage.getItem("Direccion");
            document.querySelector("#txtTelefonoAlumno").value = window.localStorage.getItem("Telefono");
        }
        else{
            alert("No se pudo Recuperar");
        }
    })
});
