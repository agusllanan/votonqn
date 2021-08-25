import { useState, useEffect } from "react";
import axios from "axios";
// import icono from "../assets/img/icono.png";

export default function Modal(props) {
    const [datos, setDatos] = useState([]);
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMensaje, setMensajeError] = useState("");

    async function sendEmail(email) {
    let EnviaMailQRInput = {
        Email: email,
        PadNroDoc: data.PadNroDoc,
        PadApellido: data.PadApellido,
        PadNombre: data.PadNombre,
        PadNroMesa: data.PadNroMesa,
        PadEscuela: data.Padescuela,
        PadEscuelaDireccion: data.PadEscuelaDireccion,
    }
        await axios({
        method: "post",
        url: "https://votoneuquen.neuquen.gob.ar/votonqnbe/rest/Ignia/EnviaMailQR",
        headers: {
        "Content-Type": "application/json",
        },
        data: EnviaMailQRInput,
        })
        .then((respuesta) => {
        if (respuesta.data.HuboError) {
            alert ("hubo un error");
        } else {    
            alert ("Email enviado con exito");
        }
        })
        .catch((e) => {
        console.log(e);
        });

    console.log("Send Email by", email)
    };
    

    useEffect(() => {
        sendEmail();
        }, []);
    


    const handleChangeEmail = (e) => {
    let tempEmail = e.target.value;
    if (tempEmail.length === 0) {
        setError(true);
        setMensajeError("Ingrese un Email");
    } else if (!/\S+@\S+\.\S+/.test(tempEmail)) {
        setError(true);
        setMensajeError("Debe ser un email valido");
    } else {
        setError(false);
        setMensajeError("");
    }
    setEmail(tempEmail);
    };

    var data = JSON.stringify({
    PadNroDoc: props.dni,
    });

    async function getDatos() {
    console.log("Entro a getDatos");
    await axios({
        method: "post",
        url: "https://votoneuquen.neuquen.gob.ar/votonqnbe/rest/PObtienePersonaxDNI",
        headers: {
        "Content-Type": "application/json",
        },
        data: data,
    })
        .then((respuesta) => {
        setDatos(respuesta.data);
        console.log(respuesta);
        })
        .catch((e) => {
        console.log(e);
        });
    }

    useEffect(() => {
    getDatos();
    }, []);


    return (
    <>
        <p className="my-2 text-sm font-sans fontmedium text-gray-400">Tome una foto al dato enmarcado y presentela en la fila de votación</p>
        <div className="my-4 py-3 border-2 solid rounded-md  border-gray-400 w-full">
        <p className="ml-2 text-sm text-gray-400">Apellido: <span className="text-gray-600">{datos.PadApellido}</span></p>
        <p className="ml-2 text-sm text-gray-400">Nombre: <span className="text-gray-600">{datos.PadNombre} </span></p>
        <p className="ml-2 text-sm text-gray-400">Escuela: <span className="text-gray-600">{datos.Escuela} </span></p>
        <p className="ml-2 text-sm text-gray-400">Mesa: <span className="text-gray-600">{datos.PadNroMesa}</span></p>
        <p className="ml-2 mb-2 text-sm text-gray-400"> Dirección: <span className="text-gray-600"> {datos.PadEscuelaDireccion}</span></p>
        <img className="w-1/3 block py-2 ml-32 sm:ml-36 " src={datos.urlPath}/>
        {/* <img className="w-1/3 block py-2 ml-32 sm:ml-36 " src={icono}/> */}
        </div>
        <input 
        required="required"
        type="email"
        value={email}
        onChange={handleChangeEmail}
        name="email"
        className="bg-gray-200 py-2 mb-2 px-4 justify-center outline-none focus:ring-2 focus:ring-gray-300 text-black rounded-lg w-full"
        placeholder="Ingrese su Email"
        />      
            {error && <p className="text-red-400 text-base text-center ">{errorMensaje}</p>}
        <button
        onClick={(e) => sendEmail(email)}
        type="button"
        className="justify-center 
        my-1
        border-transparent 
        shadow-sm 
        px-4 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300
        text-base font-medium text-white w-full
        focus:outline-none focus:bg-blue-600 focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 focus-within: "
        >
        Enviar datos via email
        </button>
    </>
    );
}
