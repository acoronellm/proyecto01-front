
import { useState } from "react";
import type { ChangeEvent } from "react";
import { toast } from 'sonner';
import ModalConfirmacion from '../components/ModalConfirmacion';

function Contacto() {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    const [enviado, setEnviado] = useState(false);

    function alCambiar(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function confirmarEnvio() {
        if (!formularioValido || enviado) return;

        setEnviado(true);
        toast.success('Queja registrada en esta demostración.');
    }

    const nombreValido = form.nombre.trim().length >= 2;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
    );

    const mensajeValido = form.mensaje.trim().length >= 10;

    const formularioValido =
        nombreValido && emailValido && mensajeValido;

    return (
        <section className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-md sm:p-8">

            <header className="mb-6 text-center">
                <h1 className="mb-2 text-3xl font-bold text-marron">
                    Contacto
                </h1>

                <p className="text-gray-600">
                    ¿Tienes alguna queja sobre nuestra Pokédex?
                    Envíanos un mensaje.
                </p>
            </header>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

                {/* Nombre */}
                <div>
                    <label
                        htmlFor="nombre"
                        className="mb-2 block font-medium text-marron"
                    >
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={alCambiar}
                        disabled={enviado}
                        required
                        minLength={2}
                        aria-invalid={form.nombre.length > 0 && !nombreValido}
                        aria-describedby="ayuda-nombre"
                        className="w-full rounded-lg border border-beige bg-white p-3 focus:outline-none focus:ring-2 focus:ring-terracota"
                    />

                    <p
                        id="ayuda-nombre"
                        className="mt-1 text-sm text-gray-700"
                    >
                        {form.nombre.length > 0 && !nombreValido
                            ? 'El nombre debe tener al menos 2 caracteres.'
                            : 'Escribe tu nombre.'}
                    </p>
                </div>

                {/* Correo */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block font-medium text-marron"
                    >
                        Correo electrónico
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nombre@correo.com"
                        value={form.email}
                        onChange={alCambiar}
                        disabled={enviado}
                        required
                        aria-invalid={form.email.length > 0 && !emailValido}
                        aria-describedby="ayuda-email"
                        className="w-full rounded-lg border border-beige bg-white p-3 focus:outline-none focus:ring-2 focus:ring-terracota"
                    />

                    <p
                        id="ayuda-email"
                        className="mt-1 text-sm text-gray-700"
                    >
                        {form.email.length > 0 && !emailValido
                            ? 'Ingresa un correo electrónico válido.'
                            : 'Ejemplo: nombre@correo.com'}
                    </p>
                </div>

                {/* Mensaje */}
                <div>
                    <label
                        htmlFor="mensaje"
                        className="mb-2 block font-medium text-marron"
                    >
                        Mensaje
                    </label>

                    <textarea
                        id="mensaje"
                        name="mensaje"
                        placeholder="Escribe tu mensaje..."
                        value={form.mensaje}
                        onChange={alCambiar}
                        disabled={enviado}
                        required
                        minLength={10}
                        rows={5}
                        aria-invalid={form.mensaje.length > 0 && !mensajeValido}
                        aria-describedby="ayuda-mensaje"
                        className="w-full resize-y rounded-lg border border-beige bg-white p-3 focus:outline-none focus:ring-2 focus:ring-terracota"
                    />

                    <p
                        id="ayuda-mensaje"
                        className="mt-1 text-sm text-gray-700"
                    >
                        {form.mensaje.length > 0 && !mensajeValido
                            ? 'El mensaje debe tener al menos 10 caracteres.'
                            : 'Describe tu queja con al menos 10 caracteres.'}
                    </p>
                </div>

                {/* Botón */}
                <ModalConfirmacion
                    titulo="¿Seguro que quieres enviar una queja?"
                    mensaje="Estás a punto de enviar una queja. ¿Deseas continuar?"
                    textoBoton="Enviar queja"
                    textoConfirmar="si"
                    onConfirmar={confirmarEnvio}
                    disabled={!formularioValido || enviado}
                    darkPattern
                />

            </form>
        </section>
    );
}

export default Contacto;
