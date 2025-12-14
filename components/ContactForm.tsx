import React, { useState } from 'react';

interface ContactFormProps {
    idPrefix?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ idPrefix = '' }) => {
    const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', company: '', email: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const validate = () => {
        const newErrors = { name: '', company: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre completo es obligatorio.';
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
            isValid = false;
        }

        if (!formData.company.trim()) {
            newErrors.company = 'El nombre de la empresa es obligatorio.';
            isValid = false;
        } else if (formData.company.trim().length < 2) {
            newErrors.company = 'El nombre de la empresa debe tener al menos 2 caracteres.';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Por favor, ingrese un formato de email válido.';
            isValid = false;
        }
        
        if (formData.message.trim() && formData.message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ name: '', company: '', email: '', message: '' });
        if (validate()) {
            setSubmissionStatus('submitting');
            setTimeout(() => {
                setSubmissionStatus('success');
                setFormData({ name: '', company: '', email: '', message: '' });
                setTimeout(() => setSubmissionStatus('idle'), 5000); 
            }, 1500);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="mt-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {submissionStatus === 'success' && (
                    <div className="sm:col-span-2 text-center p-3 rounded-none bg-green-900/20 text-green-400 border border-green-500/30 font-bold uppercase tracking-wide">
                        Solicitud recibida. Iniciando protocolo de contacto.
                    </div>
                )}
                <div>
                    <label htmlFor={`${idPrefix}-name`} className="block text-sm font-bold uppercase tracking-wide leading-6 text-white">Nombre completo</label>
                    <div className="mt-2.5">
                        <input type="text" name="name" id={`${idPrefix}-name`} autoComplete="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={`${idPrefix}-name-error`} className={`block w-full rounded-none border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset  sm:text-sm sm:leading-6 transition focus:ring-2 ${errors.name ? 'ring-red-500 focus:ring-red-500' : 'ring-white/10 focus:ring-yellow-500'}`} />
                    </div>
                    {errors.name && <p id={`${idPrefix}-name-error`} className="mt-2 text-sm text-red-500">{errors.name}</p>}
                </div>
                 <div>
                    <label htmlFor={`${idPrefix}-company`} className="block text-sm font-bold uppercase tracking-wide leading-6 text-white">Empresa</label>
                    <div className="mt-2.5">
                        <input type="text" name="company" id={`${idPrefix}-company`} autoComplete="organization" value={formData.company} onChange={handleChange} aria-invalid={!!errors.company} aria-describedby={`${idPrefix}-company-error`} className={`block w-full rounded-none border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 transition focus:ring-2 ${errors.company ? 'ring-red-500 focus:ring-red-500' : 'ring-white/10 focus:ring-yellow-500'}`} />
                    </div>
                    {errors.company && <p id={`${idPrefix}-company-error`} className="mt-2 text-sm text-red-500">{errors.company}</p>}
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor={`${idPrefix}-email`} className="block text-sm font-bold uppercase tracking-wide leading-6 text-white">Email Corporativo</label>
                    <div className="mt-2.5">
                        <input type="email" name="email" id={`${idPrefix}-email`} autoComplete="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} aria-describedby={`${idPrefix}-email-error`} className={`block w-full rounded-none border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 transition focus:ring-2 ${errors.email ? 'ring-red-500 focus:ring-red-500' : 'ring-white/10 focus:ring-yellow-500'}`} />
                    </div>
                    {errors.email && <p id={`${idPrefix}-email-error`} className="mt-2 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor={`${idPrefix}-message`} className="block text-sm font-bold uppercase tracking-wide leading-6 text-white">Mensaje <span className="text-zinc-500 font-normal normal-case">(Opcional)</span></label>
                    <div className="mt-2.5">
                        <textarea name="message" id={`${idPrefix}-message`} rows={4} value={formData.message} onChange={handleChange} aria-invalid={!!errors.message} aria-describedby={`${idPrefix}-message-error`} placeholder="Detalles del requerimiento..." className={`block w-full rounded-none border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 transition focus:ring-2 ${errors.message ? 'ring-red-500 focus:ring-red-500' : 'ring-white/10 focus:ring-yellow-500'}`}></textarea>
                    </div>
                    {errors.message && <p id={`${idPrefix}-message-error`} className="mt-2 text-sm text-red-500">{errors.message}</p>}
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button type="submit" disabled={submissionStatus === 'submitting'} className="rounded-none bg-yellow-500 px-8 py-3 text-center text-sm font-bold uppercase tracking-wider text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {submissionStatus === 'submitting' ? 'Procesando...' : 'Enviar Solicitud'}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;