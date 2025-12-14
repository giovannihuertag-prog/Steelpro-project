import React, { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';

const testimonials = [
  {
    body: 'La flota de camiones autónomos de STEELPRO ha aumentado nuestra capacidad de extracción en un 25%. La robustez de su maquinaria en condiciones de altura es inigualable.',
    author: {
      name: 'Roberto Véliz',
      handle: 'Gerente de Mina, CobreAndino',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'Requeríamos aceros de extrema resistencia para nuestros chancadores. STEELPRO no solo proveyó el material certificado, sino que nos asesoró en la soldadura y montaje.',
    author: {
      name: 'Elena Farias',
      handle: 'Jefa de Planta, Metales del Sur',
      imageUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
      body: 'La implementación de sistemas de monitoreo de taludes nos ha dado la seguridad necesaria para profundizar el rajo. Tecnología crítica para nuestra operación.',
      author: {
          name: 'Marco Antonio Solís',
          handle: 'Director de Geotecnia, MiningCorp',
          imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
  }
]

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.134-.662 1.456 0l1.861 3.832 4.232.616c.732.107 1.022.992.494 1.503l-3.06 2.983.722 4.215c.124.728-.64 1.282-1.28.944L10 15.347l-3.766 1.98c-.64.338-1.404-.216-1.28-.944l.722-4.215-3.06-2.983c-.528-.511-.238-1.396.494-1.503l4.232-.616 1.86-3.832z" clipRule="evenodd" />
    </svg>
)

const TestimonialsAndContact: React.FC = () => {
    const testimonialsSectionRef = useRef<HTMLDivElement>(null);
    const contactSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = [testimonialsSectionRef.current, contactSectionRef.current].filter(Boolean);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
    
        elements.forEach(el => observer.observe(el!));
    
        return () => {
          elements.forEach(el => observer.unobserve(el!));
        };
    }, []);

  return (
    <>
    {/* Testimonial section */}
    <div ref={testimonialsSectionRef} className="relative isolate pb-32 pt-24 sm:pt-32 scroll-animate bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500">Testimonios</h2>
          <p className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl uppercase">
            Socios Estratégicos
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author.name}
              className="flex flex-col rounded-sm bg-zinc-900 border border-white/5 p-8 hover:border-yellow-500/30 transition-colors"
            >
              <div className="flex items-center text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-4 w-4"/>)}
              </div>
              <blockquote className="text-zinc-300 flex-grow">
                <p className="italic">{`“${testimonial.body}”`}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4 border-t border-white/5 pt-4">
                <img className="h-10 w-10 rounded-full bg-zinc-800 grayscale" src={testimonial.author.imageUrl} alt="" />
                <div>
                  <div className="font-bold text-white uppercase text-sm">{testimonial.author.name}</div>
                  <div className="text-zinc-500 text-xs">{testimonial.author.handle}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
    
    {/* Contact Section */}
    <div ref={contactSectionRef} className="py-16 sm:py-24 px-6 lg:px-8 scroll-animate bg-zinc-900 border-t border-white/5">
      <div className="mx-auto max-w-7xl rounded-sm overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay"></div>
                {/* Updated image to excavator/heavy machinery */}
                <img 
                    src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2940&auto=format&fit=crop" 
                    alt="Excavadora pesada en construcción" 
                    className="absolute inset-0 h-full w-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent"></div>
            </div>
            <div className="p-12 sm:p-16">
                <h2 className="text-3xl font-black tracking-tight text-white uppercase">Cotizar Maquinaria</h2>
                <p className="mt-4 text-lg leading-8 text-zinc-400">
                    Contáctenos para cotizaciones de flota, aceros especializados o proyectos de automatización minera.
                </p>
                <ContactForm idPrefix="home" />
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TestimonialsAndContact;