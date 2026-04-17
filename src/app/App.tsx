import { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Menu, X, ArrowRight } from 'lucide-react';
import graySpaceLogo from '../assets/Logo.PNG';
import aboutImage from '../assets/Residential.jpeg';
import commercialImage from '../assets/Commercial.jpeg';
import architectureImage from '../assets/Architecture .jpeg';
import furnitureImage from '../assets/Furniture.jpeg';
import firstP1 from '../assets/FirstP1.jpeg';
import firstP2 from '../assets/FirstP2.jpeg';
import firstP3 from '../assets/FirstP3.jpeg';
import firstP4 from '../assets/FirstP4.jpeg';
import firstP5 from '../assets/FirstP5.jpeg';
import firstP6 from '../assets/FirstP6.jpeg';
import secP1 from '../assets/SecP1.jpeg';
import secP2 from '../assets/SecP2.jpeg';
import secP3 from '../assets/SecP3.jpeg';
import secP4 from '../assets/SecP4.jpeg';
import secP5 from '../assets/SecP5.jpeg';
import thirdP1 from '../assets/thirdP1.jpeg';
import thirdP2 from '../assets/thirdP2.jpeg';
import thirdP3 from '../assets/thirdP3.jpeg';
import thirdP4 from '../assets/thirdP4.jpeg';
import fourthP1 from '../assets/4thP1.jpeg';
import fourthP2 from '../assets/4thP2.jpeg';
import fourthP3 from '../assets/4thP3.jpeg';
import fourthP4 from '../assets/4thP4.jpeg';
import fourthP5 from '../assets/4thP5.jpeg';
import fourthP6 from '../assets/4thP6.jpeg';
import fifthP1 from '../assets/5thP1.jpeg';
import fifthP2 from '../assets/5thP2.jpeg';
import fifthP3 from '../assets/5thP3.jpeg';
import fifthP4 from '../assets/5thP4.jpeg';
import fifthP5 from '../assets/5thP5.jpeg';
import fifthP6 from '../assets/5thP6.jpeg';
import sixthP1 from '../assets/6thP1.jpeg';
import sixthP2 from '../assets/6thP2.jpeg';
import sixthP3 from '../assets/6thP3.jpeg';
import sixthP4 from '../assets/6thP4.jpeg';

type FormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

type SubmitState = {
  type: 'idle' | 'success' | 'error';
  message: string;
};

type Project = {
  title: string;
  category: string;
  summary: string;
  cover: string;
  images: string[];
};

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const CONTACT_EMAIL = import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || 'hello@grayspace.com';

const portfolioProjects: Project[] = [
  {
    title: 'Contemporary Urban Bistro Design',
    category: 'Commercial',
    summary: 'A moody urban bistro concept shaped through warmth, texture, and refined dining atmosphere.',
    cover: firstP1,
    images: [
      firstP1,
      firstP2,
      firstP3,
      firstP4,
      firstP5,
      firstP6,
    ],
  },
  {
    title: 'Soft Industrial Luxury',
    category: 'Commercial',
    summary: 'A refined commercial space designed for focus, elegance, and brand presence.',
    cover: secP1,
    images: [
      secP1,
      secP2,
      secP3,
      secP4,
      secP5,
    ],
  },
  {
    title: 'Warm Contemporary Living',
    category: 'Residential',
    summary: 'An inviting composition of soft tones, modern comfort, and layered warmth.',
    cover: thirdP1,
    images: [
      thirdP1,
      thirdP2,
      thirdP3,
      thirdP4,
    ],
  },
  {
    title: 'Middle Eastern Minimalism',
    category: 'Architecture',
    summary: 'Clean geometry and quiet materials inspired by regional elegance and restraint.',
    cover: fourthP1,
    images: [
      fourthP1,
      fourthP2,
      fourthP3,
      fourthP4,
      fourthP5,
      fourthP6,
    ],
  },
  {
    title: 'Aesthetic & Modern',
    category: 'Interior Design',
    summary: 'A polished visual language shaped by simplicity, balance, and modern detail.',
    cover: fifthP1,
    images: [
      fifthP1,
      fifthP2,
      fifthP3,
      fifthP4,
      fifthP5,
      fifthP6,
    ],
  },
  {
    title: 'Concept & Plans',
    category: 'Planning',
    summary: 'Early-stage concepts, planning studies, and visual direction for each project.',
    cover: sixthP1,
    images: [
      sixthP1,
      sixthP2,
      sixthP3,
      sixthP4,
    ],
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: 'idle', message: '' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectImage, setActiveProjectImage] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveProjectImage(project.images[0] ?? project.cover);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveProjectImage('');
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitState({ type: 'idle', message: '' });

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitState({
        type: 'error',
        message: 'The contact form is not configured yet. Add your Web3Forms key in the local .env file.',
      });
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          message: data.message,
          subject: `New Gray Space inquiry from ${data.name}`,
          from_name: 'Gray Space Website',
          replyto: data.email,
          botcheck: false,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send message.');
      }

      setSubmitState({
        type: 'success',
        message: 'Thank you. Your message has been sent successfully.',
      });
      reset();
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitState({
        type: 'error',
        message: `Sorry, we could not send your message right now. Please email us directly at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0c0c0c] text-neutral-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0c]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              href="#"
              className="flex items-center"
              aria-label="Gray Space home"
            >
              <img src={graySpaceLogo} alt="Gray Space" className="h-10 sm:h-12 md:h-16 w-auto opacity-95" />
            </motion.a>

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
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
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

        <div className="relative min-h-[100svh] flex items-center pt-16 sm:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
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
                className="text-4xl sm:text-5xl md:text-7xl text-white mb-5 tracking-tight font-light leading-[0.95]"
              >
                Crafting Timeless Spaces
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-white/70 mb-8 max-w-lg leading-relaxed"
              >
                Transforming interiors into extraordinary experiences through sophisticated design and meticulous attention to detail.
              </motion.p>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-[#f1efeb] text-neutral-900 px-6 sm:px-8 py-4 text-xs sm:text-sm tracking-[0.18em] uppercase hover:bg-white transition-all duration-300"
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
          className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2"
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

      <section className="bg-[#050505C6] border-t border-white/5 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-32 text-center">
          <FadeInWhenVisible>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-light text-white mb-8">
              Not just design.<br />
              Direction.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              We don't decorate spaces.<br />
              We shape how they are experienced — through light, materials, and proportion.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      <section id="about" className="bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-32">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <FadeInWhenVisible>
              <img
                src={aboutImage}
                alt="Gray Space interior"
                className="w-full h-[340px] sm:h-[420px] md:h-[600px] object-cover"
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div>
                <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">Our Story</p>
                <div className="mb-6 flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
                  <h2 className="text-4xl md:text-5xl tracking-tight font-light text-white">
                    About
                  </h2>
                  <img src={graySpaceLogo} alt="Gray Space" className="h-12 sm:h-14 md:h-20 w-auto opacity-95" />
                </div>
                <p className="text-lg text-neutral-400 mb-6 leading-relaxed">
                  With over 25 years of experience, we specialize in creating bespoke interiors that reflect your unique vision and lifestyle.
                </p>
                <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                  Our approach combines timeless elegance with contemporary innovation, ensuring every space we design becomes a masterpiece of form and function.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10">
                  <div>
                    <div className="text-4xl font-light text-white mb-2">250+</div>
                    <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-light text-white mb-2">25+</div>
                    <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase">Years Experience</div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-32">
          <FadeInWhenVisible>
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-4 uppercase text-center">What We Do</p>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light text-center text-white">
              Our Services
            </h2>
            <p className="text-lg text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
              Comprehensive design solutions tailored to your needs
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 overflow-hidden">
            {[
              {
                number: '01',
                title: 'Residential',
                description: 'Transform your home into a sanctuary of style and comfort.',
                image: aboutImage
              },
              {
                number: '02',
                title: 'Commercial',
                description: 'Create inspiring environments that reflect your brand identity.',
                image: commercialImage
              },
              {
                number: '03',
                title: 'Architecture',
                description: 'Detailed concepts built around elegance, function, and precision.',
                image: architectureImage
              },
              {
                number: '04',
                title: 'Furniture',
                description: 'Curated selections that add warmth, texture, and character.',
                image: furnitureImage
              }
            ].map((service, index) => (
              <FadeInWhenVisible key={service.title} delay={index * 0.08}>
                <div className="group relative cursor-pointer bg-black">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[420px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 backdrop-blur-[1.5px]">
                    <div className="text-[11px] tracking-[0.35em] text-white/35 mb-4 uppercase">
                      {service.number}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white/85 mb-4 leading-none">
                      {service.title}
                    </h3>
                    <p className="text-white/55 leading-relaxed text-base max-w-xs">
                      {service.description}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-32">
          <FadeInWhenVisible>
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-4 uppercase text-center">Our Work</p>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light text-center text-white">
              Portfolio
            </h2>
            <p className="text-lg text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
              A curated selection of our finest work
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {portfolioProjects.map((project, index) => (
              <FadeInWhenVisible key={project.title} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  className="group relative overflow-hidden cursor-pointer bg-black text-left w-full"
                >
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-[380px] sm:h-[420px] md:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 backdrop-blur-[1.5px]">
                    <div className="text-[11px] tracking-[0.35em] text-white/35 mb-4 uppercase">
                      {project.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white/85 mb-3 leading-none">
                      {project.title}
                    </h3>
                    <p className="text-white/55 leading-relaxed text-base max-w-xs">
                      {project.summary}
                    </p>
                  </div>
                </button>
              </FadeInWhenVisible>
            ))}
          </div>

          {selectedProject && (
            <div
              className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
              onClick={closeProject}
            >
              <div
                className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border border-white/10 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeProject}
                  aria-label="Close project preview"
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-white/10 bg-black/40 text-white/80 hover:text-white hover:border-white/30 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="p-4 md:p-6">
                    <img
                      src={activeProjectImage || selectedProject.cover}
                      alt={selectedProject.title}
                      className="w-full h-[250px] sm:h-[320px] md:h-[520px] object-cover"
                    />

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                      {selectedProject.images.map((image, imageIndex) => (
                        <button
                          key={`${selectedProject.title}-${imageIndex}`}
                          type="button"
                          onClick={() => setActiveProjectImage(image)}
                          className={`overflow-hidden border ${activeProjectImage === image ? 'border-white/40' : 'border-white/10'}`}
                        >
                          <img src={image} alt={`${selectedProject.title} view ${imageIndex + 1}`} className="w-full h-20 object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center">
                    <p className="text-[11px] tracking-[0.35em] text-white/35 mb-4 uppercase">
                      {selectedProject.category}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-light text-white/90 mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed mb-8">
                      {selectedProject.summary}
                    </p>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Click the thumbnails to view all images in this project. When you add new projects later, the same popup gallery design will apply automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-32">
          <FadeInWhenVisible>
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-4 uppercase text-center">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light text-center text-white">
              Let's Create Together
            </h2>
            <p className="text-lg text-neutral-400 text-center mb-16 max-w-xl mx-auto">
              Ready to transform your space? Reach out to discuss your vision.
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <FadeInWhenVisible>
              <div>
                <div className="space-y-8">
                  <a href="tel:+962796190362" className="flex items-start gap-5 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <Phone className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-1">Phone</div>
                      <div className="text-white group-hover:text-neutral-300 transition-colors break-words">+962 796 190 362</div>
                    </div>
                  </a>

                  <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-5 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <Mail className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-1">Email</div>
                      <div className="text-white group-hover:text-neutral-300 transition-colors break-all">{CONTACT_EMAIL}</div>
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

                {submitState.type !== 'idle' && (
                  <div
                    aria-live="polite"
                    className={`border px-6 py-4 text-sm ${submitState.type === 'success' ? 'border-emerald-500/30 text-emerald-300' : 'border-red-500/30 text-red-300'}`}
                  >
                    {submitState.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full border border-white/20 text-white px-6 sm:px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-neutral-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <footer className="bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src={graySpaceLogo} alt="Gray Space" className="h-16 sm:h-20 md:h-24 w-auto mb-4 opacity-95" />
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
                <a href="tel:+962796190362" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  +962 796 190 362
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {CONTACT_EMAIL}
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
