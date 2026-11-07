
import { useRef } from 'react';
import { useId } from 'react';

interface ModalConfirmacionProps {
    titulo: string;
    mensaje: string;
    textoBoton: string;
    textoConfirmar?: string;
    onConfirmar: () => void;
    peligro?: boolean;
    disabled?: boolean;
    darkPattern?: boolean;
}

function ModalConfirmacion({
    titulo,
    mensaje,
    textoBoton,
    textoConfirmar = 'Confirmar',
    onConfirmar,
    peligro = false,
    disabled = false,
    darkPattern = false
}: ModalConfirmacionProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const tituloId = useId();

    function abrirModal() {
        dialogRef.current?.showModal();
    }

    function cerrarModal() {
        dialogRef.current?.close();
    }

    function confirmar() {
        cerrarModal();
        onConfirmar();
    }

    return (
        <>
            <button
                type="button"
                onClick={abrirModal}
                disabled={disabled}
                className={`rounded-lg px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50
                    ${peligro
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-terracota hover:opacity-90'
                    }`}
            >
                {textoBoton}
            </button>

            <dialog
                ref={dialogRef}
                aria-labelledby={tituloId}
                className="m-auto w-[90%] max-w-md rounded-xl bg-white p-6 text-marron shadow-xl backdrop:bg-black/50"
            >
                <h2
                    id={tituloId}
                    className="mb-3 text-xl font-bold"
                >
                    {titulo}
                </h2>

                <p className="mb-6">{mensaje}</p>



                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                    {/*
    DARK PATTERN 
    Se pone en grende el "No, ya lo pense mejor", mientras que el "si" es extremadamente pequeño y de color casi igual fondo, esto para "evitar" que el usuario ponga una queja
  */}

                    <button
                        type="button"
                        onClick={cerrarModal}
                        className={
                            darkPattern
                                ? "rounded-lg bg-red-600 px-6 py-3 text-base font-bold text-white hover:bg-red-700"
                                : "rounded-lg border border-beige px-4 py-2 text-marron"
                        }
                    >
                        {darkPattern ? "No, ya lo pense mejor" : "Cancelar"}
                    </button>

                    <button
                        type="button"
                        onClick={confirmar}
                        className={
                            darkPattern
                                ? "px-1 py-0.5 text-xs text-gray-400 hover:text-gray-300"
                                : `rounded-lg px-2 py-1 text-white ${peligro
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-terracota hover:opacity-90"
                                }`
                        }
                    >
                        {darkPattern ? "si" : textoConfirmar}
                    </button>

                </div>

            </dialog>
        </>
    );
}

export default ModalConfirmacion;
