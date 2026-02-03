import { useEffect, useState } from 'react';
import { 
  Code2, 
  Palette, 
  Layout, 
  Database,
  Award,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Users,
  Building2,
  Zap,
  Globe,
  Linkedin,
  Shield,
  TrendingUp,
  Star,
  Quote
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

interface Testimonial {
  id: number;
  client_name: string;
  client_title: string;
  client_company: string;
  client_image: string;
  testimonial: string;
  rating: number;
  project_type: string;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Failed to load testimonials:', err));
  }, []);

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technologies for optimal performance.',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      icon: Code2,
      title: 'Full Stack Applications',
      description: 'End-to-end application development with robust backend and intuitive frontend.',
      gradient: 'from-indigo-600 to-blue-500'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design that combines aesthetics with exceptional usability.',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      icon: Layout,
      title: 'Frontend Engineering',
      description: 'Pixel-perfect interfaces with seamless interactions and animations.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Scalable server architecture, APIs, and database solutions.',
      gradient: 'from-blue-700 to-indigo-600'
    },
    {
      icon: Award,
      title: 'Branding & Identity',
      description: 'Complete brand strategy from concept to visual identity systems.',
      gradient: 'from-pink-500 to-purple-600'
    }
  ];

  const solutions = [
    'Enterprise Software Development',
    'Business Automation Tools',
    'Admin Dashboard Systems',
    'E-Commerce Platforms',
    'SaaS Applications',
    'Mobile Applications'
  ];

  const portfolio = [
    {
      title: 'FinTech Dashboard',
      category: 'Full Stack Development',
      problem: 'Complex financial data needed intuitive visualization',
      solution: 'Real-time analytics dashboard with interactive charts',
      tools: 'React, Node.js, D3.js, PostgreSQL',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      title: 'Healthcare Portal',
      category: 'UI/UX Design',
      problem: 'Patient management system lacked user-friendly interface',
      solution: 'Intuitive portal with appointment scheduling and records',
      tools: 'Figma, React, TypeScript, Firebase',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
    },
    {
      title: 'E-Commerce Platform',
      category: 'Full Stack',
      problem: 'Retail business needed modern online presence',
      solution: 'Feature-rich e-commerce with payment integration',
      tools: 'Next.js, Stripe, MongoDB, AWS',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    },
    {
      title: 'Brand Identity Suite',
      category: 'Branding',
      problem: 'Startup needed complete brand from scratch',
      solution: 'Comprehensive brand guidelines and visual system',
      tools: 'Illustrator, Photoshop, XD',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80'
    },
    {
      title: 'Admin Analytics Tool',
      category: 'Backend Development',
      problem: 'Business needed centralized data management',
      solution: 'Custom admin panel with role-based access',
      tools: 'Python, Django, PostgreSQL, Redis',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80'
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      problem: 'Bank needed secure mobile transaction platform',
      solution: 'Native app with biometric authentication',
      tools: 'React Native, Node.js, MongoDB',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'
    }
  ];

  const industries = [
    { name: 'FinTech', icon: TrendingUp },
    { name: 'Healthcare', icon: Shield },
    { name: 'E-Commerce', icon: Building2 },
    { name: 'Education', icon: Users },
    { name: 'Real Estate', icon: Building2 },
    { name: 'Technology', icon: Zap }
  ];

  const team = [
    {
      name: 'Vijay Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      linkedin: '#'
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Frontend Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      linkedin: '#'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior UX Designer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      linkedin: '#'
    },
    {
      name: 'Priya Sharma',
      role: 'Backend Architect',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
      linkedin: '#'
    }
  ];

  const trustBadges = [
    '500+ Projects Delivered',
    '98% Client Satisfaction',
    '50+ Team Members',
    'ISO 9001 Certified'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Premium Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A1628]/95 backdrop-blur-lg shadow-xl' : 'bg-[#0A1628]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl">VijQuant</div>
                <div className="text-blue-400 text-xs font-medium">Tech Solutions</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors font-medium">Home</a>
              <a href="#company" className="text-gray-300 hover:text-white transition-colors font-medium">Company</a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors font-medium">Services</a>
              <a href="#solutions" className="text-gray-300 hover:text-white transition-colors font-medium">Solutions</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors font-medium">Portfolio</a>
              <a href="#industries" className="text-gray-300 hover:text-white transition-colors font-medium">Industries</a>
              <a href="#team" className="text-gray-300 hover:text-white transition-colors font-medium">Team</a>
              <a href="#admin" className="text-gray-300 hover:text-white transition-colors font-medium">Admin</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors font-medium">Contact</a>
              <a 
                href="#contact"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Get Proposal
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#0A1628]/98 backdrop-blur-lg border-t border-blue-900/30">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-300 hover:text-white transition-colors font-medium">Home</a>
              <a href="#company" className="block text-gray-300 hover:text-white transition-colors font-medium">Company</a>
              <a href="#services" className="block text-gray-300 hover:text-white transition-colors font-medium">Services</a>
              <a href="#solutions" className="block text-gray-300 hover:text-white transition-colors font-medium">Solutions</a>
              <a href="#portfolio" className="block text-gray-300 hover:text-white transition-colors font-medium">Portfolio</a>
              <a href="#industries" className="block text-gray-300 hover:text-white transition-colors font-medium">Industries</a>
              <a href="#team" className="block text-gray-300 hover:text-white transition-colors font-medium">Team</a>
              <a href="#admin" className="block text-gray-300 hover:text-white transition-colors font-medium">Admin</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors font-medium">Contact</a>
              <a 
                href="#contact"
                className="block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold text-center"
              >
                Get Proposal
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with 3D Element */}
      <section id="home" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1F3D] to-[#0A1628]">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* 3D Floating Element Placeholder */}
        <div className="absolute right-10 top-32 hidden xl:block">
          <div className="w-96 h-96 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-sm border border-blue-500/30 transform rotate-12 animate-float"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-cyan-500/30 transform -rotate-12 animate-float-delayed"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transforming Ideas Into
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent mt-2">
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Premier IT agency delivering world-class full stack development, UI/UX design, 
              and business software solutions. We build products that scale and brands that inspire.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center justify-center group"
              >
                Start Your Project
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a 
                href="#portfolio"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                View Portfolio
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="text-cyan-400 flex-shrink-0" size={20} />
                  <span className="text-gray-300 text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section id="company" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-6">
                About VijQuant Tech Solutions
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We are a global IT agency specializing in cutting-edge technology solutions 
                for businesses of all sizes. With a team of world-class engineers, designers, 
                and strategists, we deliver products that drive growth and innovation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to empower businesses through technology, creating digital 
                experiences that are not only beautiful but also highly functional and scalable.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="text-3xl font-bold text-[#0A1628] mb-2">500+</div>
                  <div className="text-gray-600 font-medium">Projects Completed</div>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="text-3xl font-bold text-[#0A1628] mb-2">50+</div>
                  <div className="text-gray-600 font-medium">Expert Team</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-sm -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with 3D Cards */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                style={{
                  transform: 'perspective(1000px) rotateX(0deg)',
                  transition: 'all 0.5s ease'
                }}
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Delivered */}
      <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A1628] to-[#0F1F3D]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Solutions We Deliver
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Specialized software solutions for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
              >
                <CheckCircle2 className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform" size={24} />
                <h3 className="text-xl font-semibold text-white">{solution}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              Our Portfolio
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real-world solutions that solve complex business challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-blue-600 text-sm font-semibold">{project.category}</span>
                  <h3 className="text-2xl font-bold text-[#0A1628] mt-2 mb-3">{project.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Problem:</span>
                      <p className="text-gray-600">{project.problem}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Solution:</span>
                      <p className="text-gray-600">{project.solution}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.split(', ').map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Expertise across multiple sectors and domains
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all text-center group"
              >
                <industry.icon className="w-12 h-12 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-[#0A1628]">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              World-class professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#0A1628] mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <a 
                    href={member.linkedin}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trusted by industry leaders worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={64} className="text-blue-600" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.testimonial}"
                </p>

                {/* Client Info */}
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={testimonial.client_image} 
                      alt={testimonial.client_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1628]">{testimonial.client_name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.client_title}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.client_company}</p>
                  </div>
                </div>

                {/* Project Type Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                    {testimonial.project_type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Panel Feature */}
      <section id="admin" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A1628] via-[#0F1F3D] to-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Powerful Admin Dashboard
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Manage your entire business from one centralized, secure platform. 
                Our custom admin panels provide real-time analytics, user management, 
                content control, and comprehensive reporting tools.
              </p>
              <ul className="space-y-4">
                {[
                  'Role-based access control',
                  'Real-time analytics & reporting',
                  'Content management system',
                  'User & permission management',
                  'API integration dashboard'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-cyan-400 flex-shrink-0" size={24} />
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" 
                  alt="Admin Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-sm -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              Let's Build Something Great
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ready to transform your business? Fill out the form and our team will get back to you within 24 hours
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
