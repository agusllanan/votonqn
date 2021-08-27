import React, { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Helmet } from "react-helmet";
import Modal from "./Modal";
import ReCAPTCHA from "react-google-recaptcha";
import footer from "../assets/img/footer.png";
import icono from "../assets/img/icono.png";
import { XIcon, ArchiveIcon } from "@heroicons/react/outline";

const AddInfo = () => {
    const [dni, setDni] = useState("");
    const [error, setError] = useState(false);
    const [errorMensaje, setMensajeError] = useState("");
    const [open, setOpen] = useState(false);
    const [captchaValido, setCaptchaValido] = useState(null);
    const [captchaMensaje, setCaptchaMensaje] = useState("");

    // const {register, watch, errors} = useForm();

    const captcha = useRef(null);

    const handleChange = (e) => {
    console.log(e);

    let tempDniNumber = Number(e.target.value);
    let tempDni = e.target.value;

    if (
        isNaN(tempDniNumber) ||
        (tempDni.length !== 8 && tempDni.length !== 7 && tempDni.length !== 0)
    ) {
        setError(true);
        setMensajeError("Debe ingresar un DNI valido");
    } else {
        setError(false);
        setMensajeError("");
    }
    setDni(tempDni);
    };

    function onChange() {
    if (captcha.current.getValue()) {
        console.log("El usuario no es un robot");
        setCaptchaValido(true);
        setCaptchaMensaje("");
    }
    }

    function handleVerification(e) {
    e.preventDefault();
    if (captcha.current.getValue()) {
        console.log("Ya sabemos que el usuario no es un robot");
        setCaptchaValido(true);
        setCaptchaMensaje("");
        setOpen(true);
    } else {
        setCaptchaValido(false);
        setError(true);
        setCaptchaMensaje("Valide el captcha por favor");
        console.log("Captcha invalido");
    }
    }

    return (
    <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Voto Neuquén</title>
        <link
            rel="canonical"
            href="http://votoneuquen.neuquen.gob.ar/votonqn"
        />
        </Helmet>
        <form onSubmit={handleVerification}>
        <div className="min-h-screen w-full bg-gray-100 text-xl text-white items-center">
            <div className="container mx-auto max-w-md  shadow-md hover:shadow-lg transition duration-300">
            <div className="py-6 p-10 bg-white flex flex-col content-center rounded-xl">
                <img className="w-1/5" src={icono} />
                <div className="mb-4">
                <p className="text-blue-900 pt-4 font-sans sm:text-2xl text-base">
                    Para comenzar <br />
                    necesitamos los datos <br />
                    personales del ciudadano
                </p>
                </div>
                <div className="">
                <label
                    className="mr-4 py-2 text-black inline-block mb-2"
                    for="name"
                >
                    Introducir manualmente
                </label>
                <input
                    required="required"
                    value={dni}
                    autocomplete="off"
                    onChange={(e) => handleChange(e)}
                    name="dni"
                    className="bg-gray-200 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-gray-300 text-black rounded-lg "
                    placeholder="Ingrese su DNI"
                />
                {error && (
                    <p className="text-red-400 text-base">{errorMensaje}</p>
                )}
                </div>
                <div className="pt-4">
                <ReCAPTCHA
                    ref={captcha}
                    sitekey="6Len2wscAAAAANxXuZ3cw4ZtLX7EKCSocLn-YgaS"
                    value={false}
                    onChange={onChange}
                />
                </div>
                {captchaValido !== true && (
                <div className="text-red-400 text-base">
                    <p>{captchaMensaje}</p>
                </div>
                )}
                <div>
                <button
                    className="w-full mt-6 text-indigo-50 font-bold bg-blue-500 py-3 rounded-full hover:bg-blue-600 transition duration-200"
                    type="submit"
                >
                    SIGUIENTE
                </button>
                {/* Aca va el footer */}
                <img className="pt-8" src={footer} />
                </div>
            </div>
            </div>
        </div>
        </form>
        <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            auto-reopen="true"
            className="fixed z-10 inset-0 overflow-y-auto"
            onClose={setOpen}
        >
            <div className=" min-h-screen pt-4 px-4 pb-20 text-center block ">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden align-middle h-screen" aria-hidden="true">
                &#8203;
            </span>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <div className="inline-block bg-white rounded-lg text-left shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
                <div className="bg-white px-4 max pt-5 p-6 pb-4">
                    <div className="flex justify-between">
                    <div className="flex-shrink-0 flex items-center justify-center py-4 h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ArchiveIcon
                        className="h-6 w-6 text-blue-600"
                        aria-hidden="true"
                        />
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center py-4 h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 hover:bg-red-50">
                        <XIcon
                        className="h-6 w-6 text-red-500 cursor-pointer duration-75 hover:"
                        aria-hidden="true"
                        onClick={() => {
                            window.grecaptcha.reset();
                            setError(false);
                            setMensajeError("");
                            setOpen(false);
                            setDni("");
                            setCaptchaValido(null);
                            }}                      />
                    </div>
                    </div>
                    <div className="flex items-start">
                    <div className="mt-3 w-full text-left sm:mt-0 sm:text-left">
                        {/* !!!!!!!!!!!!!!!! ACá ESTA EL MODAL !!!!!!!! */}
                        <Modal dni={dni}/>
                        {/* !!!!!!!!!!!!!!!! ACá ESTA EL MODAL !!!!!!!! */}
                    </div>
                    </div>
                    {error && (
                    <p className="text-red-400 text-center font-bold text-base">
                        {errorMensaje}
                    </p>
                    )}
                </div>
                {/* <div className="bg-gray-50 px-4 max-h-screen py-3 sm:px-6 flex flex-col">
                    <button
                    type="button"
                    className=" justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                    >
                    Cerrar
                    </button>
                </div> */}
                </div>
            </Transition.Child>
            </div>
        </Dialog>
        </Transition.Root>
    </>
    );
};

export default AddInfo;
