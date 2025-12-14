import React from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons';

const navigation = {
    shortcuts: [
        { name: 'Maquinaria de Construcción', href: '#solutions/construction' },
        { name: 'Maquinaria de Ingeniería', href: '#solutions/engineering' },
        { name: 'Aceros Industriales', href: '#solutions/steel' },
        { name: 'Cotizar Proyecto', href: '#contact' },
    ],
    legal: [
        { name: 'Aviso de privacidad', href: '#' },
        { name: 'Términos y condiciones', href: '#' },
    ],
    social: [
        { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61584829238865', icon: FacebookIcon },
        { name: 'Instagram', href: 'https://www.instagram.com/steelpro789', icon: InstagramIcon },
        { name: 'WhatsApp', href: 'https://wa.me/524428192172', icon: WhatsAppIcon },
    ]
}

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-white/10" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <a href="#" className="text-3xl font-black tracking-tighter text-white uppercase italic flex items-center gap-1">
                             <span className="material-symbols-outlined text-yellow-500 text-3xl">construction</span>
                             STEEL<span className="text-yellow-500">PRO</span>
                        </a>
                        <p className="text-sm leading-6 text-zinc-400 max-w-xs">
                            Potenciando la industria con maquinaria de clase mundial y aceros certificados.
                        </p>
                        <address className="not-italic text-sm text-zinc-500">
                            <p>C. Morera 312</p>
                            <p>Arboledas Qro. México.</p>
                            <p className="mt-2 text-yellow-500 font-bold">Querétaro, Qro. México</p>
                        </address>
                        <div className="mt-4">
                            <a href="#dashboard" className="text-[10px] text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                                Acceso Corporativo
                            </a>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold leading-6 text-white uppercase tracking-wider">Accesos Directos</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.shortcuts.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-yellow-500 transition-colors">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-bold leading-6 text-white uppercase tracking-wider">Redes Sociales</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.social.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm leading-6 text-zinc-400 hover:text-yellow-500 transition-colors">
                                                <item.icon className="h-5 w-5" aria-hidden="true" />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div>
                               <h3 className="text-sm font-bold leading-6 text-white uppercase tracking-wider">Newsletter</h3>
                               <p className="mt-2 text-sm text-zinc-400">Suscríbete para recibir noticias de stock y ofertas.</p>
                               <form className="mt-6 sm:flex sm:max-w-md">
                                 <label htmlFor="email-address" className="sr-only">Email</label>
                                 <input type="email" name="email-address" id="email-address" autoComplete="email" required className="w-full min-w-0 appearance-none rounded-none border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full" placeholder="EMAIL CORPORATIVO" />
                                 <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                                   <button type="submit" className="flex w-full items-center justify-center rounded-none bg-yellow-500 px-3 py-2 text-sm font-bold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 uppercase tracking-wide">Suscribirse</button>
                                 </div>
                               </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <p className="text-xs leading-5 text-zinc-500">&copy; {new Date().getFullYear()} STEELPRO. Todos los derechos reservados.</p>
                        <div className="flex space-x-4 mt-4 sm:mt-0">
                            {navigation.legal.map((item) => (
                                <a key={item.name} href={item.href} className="text-xs leading-5 text-zinc-500 hover:text-white transition-colors">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;