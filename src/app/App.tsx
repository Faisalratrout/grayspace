import { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Menu, X, ArrowRight } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Get your free key at web3forms.com
          ...data,
          subject: `New Project Inquiry from ${data.name}`,
          from_name: 'Gray Space Portfolio',
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0c0c0c] text-neutral-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0c]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl tracking-[0.3em] font-light text-white"
            >
              GRAY SPACE
            </motion.div>

            <div className="hidden md:flex items-center gap-12">
              {['About', 'Services', 'Portfolio', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-sm tracking-wide text-neutral-400 hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0c0c0c]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm tracking-wide text-neutral-400 hover:text-white transition-colors py-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1666037805138-f227944ed8d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Luxury interior by Gray Space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </motion.div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xs tracking-[0.4em] text-neutral-400 mb-6 uppercase"
              >
                Interior Design Studio
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl text-white mb-6 tracking-tight font-light"
              >
                Crafting Timeless Spaces
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed"
              >
                Transforming interiors into extraordinary experiences through sophisticated design and meticulous attention to detail.
              </motion.p>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm tracking-wider hover:bg-white hover:text-neutral-900 transition-all duration-300"
              >
                START YOUR PROJECT <ArrowRight size={16} />
              </motion.a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/30 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      <section id="about" className="bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInWhenVisible>
              <img
                src="https://images.unsplash.com/photo-1679862342541-e408d4f3ab80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="About Gray Space"
                className="w-full h-[600px] object-cover"
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div>
                <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">Our Story</p>
                <h2 className="text-4xl md:text-5xl mb-6 tracking-tight font-light text-white">
                  About Gray Space
                </h2>
                <p className="text-lg text-neutral-400 mb-6 leading-relaxed">
                  With over 15 years of experience, we specialize in creating bespoke interiors that reflect your unique vision and lifestyle.
                </p>
                <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                  Our approach combines timeless elegance with contemporary innovation, ensuring every space we design becomes a masterpiece of form and function.
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                  <div>
                    <div className="text-4xl font-light text-white mb-2">250+</div>
                    <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-light text-white mb-2">15+</div>
                    <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase">Years Experience</div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <FadeInWhenVisible>
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-4 uppercase text-center">What We Do</p>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light text-center text-white">
              Our Services
            </h2>
            <p className="text-lg text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
              Comprehensive design solutions tailored to your needs
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: 'Residential Design',
                description: 'Transform your home into a sanctuary of style and comfort with our personalized residential design services.',
                image: 'https://images.unsplash.com/photo-1614635884840-85cf80d23844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
              },
              {
                title: 'Commercial Spaces',
                description: 'Create inspiring work environments that enhance productivity and reflect your brand identity.',
                image: 'https://images.unsplash.com/photo-1690489965043-ec15758cce71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
              },
              {
                title: 'Luxury Renovations',
                description: 'Breathe new life into existing spaces with our expert renovation and restoration services.',
                image: 'https://images.unsplash.com/photo-1771862956702-4e8b247e28b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
              }
            ].map((service, index) => (
              <FadeInWhenVisible key={service.title} delay={index * 0.1}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden mb-6">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                    />
                  </div>
                  <h3 className="text-xl mb-3 tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <FadeInWhenVisible>
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-4 uppercase text-center">Our Work</p>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light text-center text-white">
              Portfolio
            </h2>
            <p className="text-lg text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
              A curated selection of our finest work
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1669387448840-610c588f003d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1774716925806-e152f1995bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1772567732983-447c7db0ce4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1774716926071-fc03e73d0806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1771862860802-bd2e375f7422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
            ].map((image, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.05}>
                <div className="group relative overflow-hidden cursor-pointer aspect-square">
                  <img
                    src={image}
                    alt={`Gray Space Project ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <FadeInWhenVisible>
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-4 uppercase text-center">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light text-center text-white">
              Let's Create Together
            </h2>
            <p className="text-lg text-neutral-400 text-center mb-16 max-w-xl mx-auto">
              Ready to transform your space? Reach out to discuss your vision.
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 gap-16">
            <FadeInWhenVisible>
              <div>
                <div className="space-y-8">
                  <a href="tel:+201234567890" className="flex items-start gap-5 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <Phone className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-1">Phone</div>
                      <div className="text-white group-hover:text-neutral-300 transition-colors">+20 123 456 7890</div>
                    </div>
                  </a>

                  <a href="mailto:hello@grayspace.com" className="flex items-start gap-5 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <Mail className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-1">Email</div>
                      <div className="text-white group-hover:text-neutral-300 transition-colors">hello@grayspace.com</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-1">Location</div>
                      <div className="text-white">Amman, Jordan </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-14">
                  <a
                    href="https://instagram.com/grayspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://facebook.com/grayspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="https://linkedin.com/company/grayspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/3 border border-white/10 px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/25 transition-colors text-sm"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/3 border border-white/10 px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/25 transition-colors text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Your Phone (Optional)"
                    className="w-full bg-white/3 border border-white/10 px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/25 transition-colors text-sm"
                  />
                </div>

                <div>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Tell us about your project"
                    rows={5}
                    className="w-full bg-white/3 border border-white/10 px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/25 transition-colors resize-none text-sm"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-2">{errors.message.message}</p>
                  )}
                </div>

                {submitSuccess && (
                  <div className="border border-white/10 px-6 py-4 text-sm text-neutral-300">
                    Thank you! We'll be in touch soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full border border-white/20 text-white px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-neutral-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <footer className="bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-xl tracking-[0.3em] font-light text-white mb-4">GRAY SPACE</div>
              <p className="text-neutral-500 text-sm leading-relaxed">
                A luxury interior design studio dedicated to creating spaces that inspire and endure.
              </p>
            </div>
            <div>
              <div className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6">Navigation</div>
              <nav className="flex flex-col gap-3">
                {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <div className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6">Contact</div>
              <div className="flex flex-col gap-3">
                <a href="tel:+201234567890" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  +20 123 456 7890
                </a>
                <a href="mailto:hello@grayspace.com" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  hello@grayspace.com
                </a>
                <span className="text-sm text-neutral-500">Amman, Jordan</span>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="https://instagram.com/grayspace" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-500 hover:text-white transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="https://facebook.com/grayspace" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-neutral-500 hover:text-white transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="https://linkedin.com/company/grayspace" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-500 hover:text-white transition-colors">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-xs tracking-wide">
              © 2026 Gray Space. All rights reserved.
            </p>
            <p className="text-neutral-700 text-xs">
              Interior Design Studio
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FadeInWhenVisible({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}
