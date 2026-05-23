"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Compass, 
  Wind, 
  Flame, 
  Droplets, 
  Calendar, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  Check, 
  X,
  Star,
  Activity,
  Award,
  ShoppingBag,
  Plus,
  Minus,
  Heart,
  BookOpen,
  Info,
  Clock,
  ArrowUpRight,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
  
  .font-serif-lux {
    font-family: 'Playfair Display', serif;
  }
  
  .font-sans-lux {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  /* Smooth custom scroll bar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0f241c;
  }
  ::-webkit-scrollbar-thumb {
    background: #C89B3C;
    border-radius: 3px;
  }

  /* Infinite marquee keyframe */
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 35s linear infinite;
  }

  .animate-marquee:hover {
    animation-play-state: paused;
  }

  /* Floating animation definitions */
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(3deg); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(-6deg); }
  }
  @keyframes float-fast {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(4deg); }
  }

  .animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
  }
  .animate-float-medium {
    animation: float-medium 8s ease-in-out infinite;
  }
  .animate-float-fast {
    animation: float-fast 6s ease-in-out infinite;
  }

  /* Glassmorphism utility */
  .glass-premium {
    background: rgba(24, 57, 43, 0.45);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .glass-card-light {
    background: rgba(248, 245, 240, 0.07);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  /* Gold glow shine effect */
  .gold-glow {
    box-shadow: 0 0 40px rgba(200, 155, 60, 0.15);
  }
`;

export default function AyurvedicHero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDosha, setActiveDosha] = useState('vata');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeIngredient, setActiveIngredient] = useState(null);
  const [activeProductTab, setActiveProductTab] = useState('all');
  const [quickQuizStep, setQuickQuizStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [likedProducts, setLikedProducts] = useState({});
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("isMobileMenuOpen",isMobileMenuOpen)

  // Audio Context references for Zen Ambient Synthesizer
  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef([]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleAmbientSound = () => {
    if (!soundEnabled) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Smooth breathing filter node
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, ctx.currentTime);

        // Slow ocean wave generator
        const bufferSize = ctx.sampleRate * 4;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const waveSource = ctx.createBufferSource();
        waveSource.buffer = noiseBuffer;
        waveSource.loop = true;

        const waveGain = ctx.createGain();
        waveGain.gain.setValueAtTime(0.012, ctx.currentTime);

        // Low frequency modulator (LFO) for wave motion
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime);

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.008, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(waveGain.gain);

        waveSource.connect(filter);
        filter.connect(waveGain);
        waveGain.connect(ctx.destination);

        // Organic warm drones (A minor pentatonic scale base)
        const notes = [110, 165, 220, 330]; // A2, E3, A3, E4
        const drones = [];

        notes.forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const droneGain = ctx.createGain();
          droneGain.gain.setValueAtTime(0.003, ctx.currentTime);

          const droneFilter = ctx.createBiquadFilter();
          droneFilter.type = 'lowpass';
          droneFilter.frequency.setValueAtTime(180, ctx.currentTime);

          // Connect
          osc.connect(droneFilter);
          droneFilter.connect(droneGain);
          droneGain.connect(ctx.destination);

          osc.start();
          drones.push({ osc, droneGain });
        });

        waveSource.start();
        lfo.start();

        synthNodesRef.current = [waveSource, lfo, ...drones];
        setSoundEnabled(true);
      } catch (err) {
        console.warn("Failed to initialize cinematic audio synth context: ", err);
      }
    } else {
      if (audioCtxRef.current) {
        try {
          synthNodesRef.current.forEach(node => {
            if (node.osc) node.osc.stop();
            else if (typeof node.stop === 'function') node.stop();
          });
          audioCtxRef.current.close();
        } catch (e) {}
      }
      setSoundEnabled(false);
    }
  };

  const doshas = {
    vata: {
      name: 'Vata',
      elements: 'Ether & Air',
      description: 'The energy of movement, change, and creativity. Characterized as cool, dry, agile, and spacious.',
      accent: 'text-amber-300 border-amber-300/30',
      glow: 'from-amber-500/10 via-amber-800/5 to-transparent',
      btnBg: 'bg-amber-300 text-black',
      icon: <Wind className="w-6 h-6" />
    },
    pitta: {
      name: 'Pitta',
      elements: 'Fire & Water',
      description: 'The energy of digestion, transformation, and intelligence. Characterized as hot, sharp, and intensely focused.',
      accent: 'text-orange-400 border-orange-400/30',
      glow: 'from-orange-500/10 via-red-900/5 to-transparent',
      btnBg: 'bg-orange-400 text-black',
      icon: <Flame className="w-6 h-6" />
    },
    kapha: {
      name: 'Kapha',
      elements: 'Earth & Water',
      description: 'The energy of structure, growth, and stability. Characterized as heavy, steady, cool, and compassionate.',
      accent: 'text-emerald-400 border-emerald-400/30',
      glow: 'from-emerald-500/10 via-emerald-950/5 to-transparent',
      btnBg: 'bg-emerald-400 text-black',
      icon: <Droplets className="w-6 h-6" />
    }
  };

  const quizSteps = [
    {
      question: "Which pattern best details your physical frame & movement?",
      options: [
        { label: "Slender, light-boned structure, fast-paced, easily cold", dosha: "vata" },
        { label: "Medium built, athletic body frame, high metabolic output", dosha: "pitta" },
        { label: "Strong, broad skeletal structure, steady pace, gains weight easily", dosha: "kapha" }
      ]
    },
    {
      question: "How does your skin texture react to changing environments?",
      options: [
        { label: "Dry, slightly rough, cool, requires dense moisturization", dosha: "vata" },
        { label: "Warm, highly sensitive, prone to irritation, reddish tone", dosha: "pitta" },
        { label: "Soft, smooth, oil-prone, consistently hydrated", dosha: "kapha" }
      ]
    },
    {
      question: "How would you characterize your mind's response to extreme pressure?",
      options: [
        { label: "Prone to sudden worry, racing thoughts, restlessness", dosha: "vata" },
        { label: "Impatient, determined, sharp execution, easily irritated", dosha: "pitta" },
        { label: "Calm, slow to act, reflective, tends to withdraw completely", dosha: "kapha" }
      ]
    }
  ];

  const handleQuizAnswer = (dosha) => {
    const nextAnswers = { ...selectedAnswers, [quickQuizStep]: dosha };
    setSelectedAnswers(nextAnswers);
    if (quickQuizStep < quizSteps.length - 1) {
      setQuickQuizStep(quickQuizStep + 1);
    } else {
      const counts = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(nextAnswers).forEach(d => counts[d]++);
      let dominant = 'vata';
      if (counts.pitta > counts.vata) dominant = 'pitta';
      if (counts.kapha > counts[dominant]) dominant = 'kapha';
      
      setActiveDosha(dominant);
      setFormSubmitted(true);
    }
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setQuickQuizStep(0);
    setFormSubmitted(false);
  };

  const products = [
    {
      id: 'kumkumadi',
      title: 'Kumkumadi Kaya Elixir',
      category: 'oils',
      subtitle: 'Night Skin Rejuvenator',
      price: 185.00,
      badge: 'Bestseller',
      description: 'Imbued with hand-harvested Saffron stigmas and organic cold-pressed botanicals.',
      rating: 4.9,
      reviews: 312,
      color: 'from-[#C89B3C] to-[#B65E3C]'
    },
    {
      id: 'ashwagandha',
      title: 'Ojas Ashwagandha Plus',
      category: 'immunity',
      subtitle: 'Cognitive Stress Shield',
      price: 64.00,
      badge: 'Pure Certified',
      description: 'Potent wild-crafted roots, slow-dried to stabilize cellular fatigue and cortisol curves.',
      rating: 4.8,
      reviews: 450,
      color: 'from-[#E7D8C9] to-[#C89B3C]'
    },
    {
      id: 'shilajit',
      title: 'Himalayan Shilajit Resin',
      category: 'capsules',
      subtitle: 'Primal Mineral Fuel',
      price: 110.00,
      badge: 'Limited Batch',
      description: 'Purified and sun-cured pitch packed with fulvic acids harvested at 16,000 feet.',
      rating: 5.0,
      reviews: 189,
      color: 'from-[#1A1308] to-[#C89B3C]'
    },
    {
      id: 'brahmi',
      title: 'Brahmi Ghrita Nectar',
      category: 'powders',
      subtitle: 'Mind & Focus Tonic',
      price: 55.00,
      badge: 'Organic Gold',
      description: 'Clarified absolute butter cooked with fresh Brahmi herb for advanced neuroprotection.',
      rating: 4.7,
      reviews: 210,
      color: 'from-[#316F4F] to-[#C89B3C]'
    },
    {
      id: 'turmeric',
      title: 'Golden Turmeric Concentré',
      category: 'immunity',
      subtitle: 'Anti-Inflammatory Tonic',
      price: 48.00,
      badge: 'Popular',
      description: 'High-potency curcumin combined with black pepper extracts for maximum bioavailability.',
      rating: 4.9,
      reviews: 580,
      color: 'from-[#C89B3C] to-[#E7D8C9]'
    },
    {
      id: 'neem',
      title: 'Neem Clarifying Balm',
      category: 'oils',
      subtitle: 'Pure Skin Restorative',
      price: 72.00,
      badge: 'Dermatologist Tested',
      description: 'Soothing organic leaf press that purifies deep tissues and clarifies complexion imbalances.',
      rating: 4.8,
      reviews: 165,
      color: 'from-[#18392B] to-[#C89B3C]'
    }
  ];

  const ingredients = [
    {
      name: "Ashwagandha",
      science: "Withania somnifera",
      property: "Restores vitality, manages biological stress, supports cognitive focus.",
      history: "Sanskrit for 'Smell of the Horse', symbolizing unique vigor and pristine life-force stamina.",
      color: "bg-amber-100 text-amber-900 border-amber-300",
      accent: "#C89B3C"
    },
    {
      name: "Tulsi",
      science: "Ocimum tenuiflorum",
      property: "Clears airways, adaptogenic defense, balances temperature.",
      history: "The 'Holy Basil' holds sacred status in Indian courtyards as an ultimate cellular purifying elixir.",
      color: "bg-emerald-100 text-emerald-900 border-emerald-300",
      accent: "#18392B"
    },
    {
      name: "Neem",
      science: "Azadirachta indica",
      property: "Intense purification, cools high Pitta, supports systemic tissue defense.",
      history: "Hailed as the universal natural pharmacy, every fiber of this bitter leaf heals.",
      color: "bg-teal-100 text-teal-900 border-teal-300",
      accent: "#3D7B5D"
    },
    {
      name: "Shilajit",
      science: "Asphaltum punjabianum",
      property: "Accelerates cellular ATP production, rich in trace minerals and organic acids.",
      history: "Called the 'Destroyer of Weakness', synthesized under geological pressure of ancient tectonic shifts.",
      color: "bg-stone-100 text-stone-900 border-stone-300",
      accent: "#B65E3C"
    }
  ];

  const toggleLike = (id) => {
    setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const nextQty = item.qty + delta;
          return nextQty > 0 ? { ...item, qty: nextQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="font-sans-lux bg-[#18392B] text-[#F8F5F0] min-h-screen overflow-x-hidden relative selection:bg-[#C89B3C]/40 selection:text-white">
      
      {}
      <div 
        className="hidden lg:block pointer-events-none fixed w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#C89B3C]/5 to-transparent filter blur-[120px] z-30 transition-transform duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {}
      <div className="w-full bg-[#11291F] border-b border-white/5 py-3 fixed left-0 top-0 overflow-hidden z-50">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-12">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div className="flex items-center space-x-3 text-xs tracking-[0.25em] uppercase font-sans-lux font-medium text-[#E7D8C9]">
                <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                <span>Wellnesstillulast Sanctuary</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />
              <div className="flex items-center space-x-3 text-xs tracking-[0.25em] uppercase font-sans-lux text-[#F8F5F0]">
                <span>Complimentary Ayurvedic Consultation with Global Shipments</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />
              <div className="flex items-center space-x-3 text-xs tracking-[0.25em] uppercase font-sans-lux text-[#C89B3C]">
                <span>Harvested with Honor • Organic Certified AYUSH Formulation</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {}
      <nav className={`fixed top-[40px] left-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-[#18392B]/85 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]' 
          : 'py-6 bg-transparent border-b border-white/0'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-2">
          
          {/* Logo Brand Title */}
          <div className="flex items-center space-x-1 md:space-x-3 group cursor-pointer">
            <div className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-[#C89B3C]/50 group-hover:border-[#C89B3C] transition-all duration-500 bg-[#18392B]/70 overflow-hidden">
              <span className="font-serif-lux text-md md:text-xl text-[#C89B3C] group-hover:scale-110 transition-transform duration-500">W</span>
              <div className="absolute inset-0.5 border border-white/10 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500" />
            </div>
            <div>
              <span className="font-serif-lux text-md md:text-2xl tracking-[0.15em] text-[#F8F5F0] block">Wellnesstillulast</span>
              <span className="text-[7px] md:text-[9px] tracking-[0.35em] text-[#C89B3C] uppercase block font-sans-lux font-semibold">Ayurvedic Apothecary</span>
            </div>
          </div>

          {/* Middle Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {['Home', 'Philosophy', 'Products', 'Ingredients', 'Testimonials', 'Our Story'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-xs tracking-[0.2em] uppercase font-sans-lux font-semibold text-[#E7D8C9] hover:text-[#C89B3C] transition-all duration-300 relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C89B3C] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Call-to-action Elements */}
          <div className="flex items-center space-x-2 md:space-x-4">      
           
            {/* Cart Trigger */}
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 md:p-3 rounded-full border border-white/10 hover:border-[#C89B3C]/40 hover:bg-[#C89B3C]/5 text-[#E7D8C9] transition-all duration-300 relative"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B65E3C] text-white font-bold text-[7px] md:text-[9px] w-5 h-5 flex items-center justify-center rounded-full border border-[#18392B]">
                  {cartItems.reduce((acc, i) => acc + i.qty, 0)}
                </span>
              )}
            </button>

            {/* Desktop CTA Button */}
            <button 
              onClick={() => { setConsultationOpen(true); restartQuiz(); }}
              className="hidden sm:flex px-6 py-3 rounded-full bg-transparent hover:bg-[#C89B3C] text-xs tracking-widest uppercase font-semibold border border-[#C89B3C] text-[#C89B3C] hover:text-[#18392B] shadow-[0_4px_25px_rgba(200,155,60,0.1)] transition-all duration-500 ease-out transform hover:scale-105 active:scale-95 items-center space-x-2"
            >
              <span>Consultation</span>
              <Calendar className="w-4 h-4" />
            </button>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 md:p-3 rounded-full border border-white/10 hover:border-[#C89B3C]/40 text-[#E7D8C9]"
            >
              {!isMobileMenuOpen ? <Plus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5 rotate-45" />}
            </button>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden w-full bg-[#18392B]/95 backdrop-blur-3xl border-b border-white/10 absolute left-0 px-6 py-8 space-y-4"
            >
              {['Home', 'Philosophy', 'Products', 'Ingredients', 'Testimonials', 'Our Story'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm tracking-widest uppercase text-[#E7D8C9] hover:text-[#C89B3C] transition-colors py-2"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={() => { setConsultationOpen(true); setIsMobileMenuOpen(false); restartQuiz(); }}
                  className="w-full py-4 rounded-full bg-[#C89B3C] text-black text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2"
                >
                  <span>Book Free Consultation</span>
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {}
      <section id="home" className="relative pt-44 lg:pt-52 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center overflow-hidden z-10">
        
        {/* Abstract Cinematic Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#C89B3C]/10 to-transparent filter blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#B65E3C]/10 to-transparent filter blur-[150px] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Sparkle className="w-3.5 h-3.5 text-[#C89B3C] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-[10px] tracking-[0.25em] text-[#C89B3C] font-semibold uppercase font-sans-lux">Awakening Cellular Well-being</span>
            </div>

            {/* Typography Master Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif-lux tracking-tight text-[#F8F5F0] leading-[1.05]">
                Ancient Ayurveda. <br />
                <span className="italic text-[#E7D8C9] font-normal font-serif-lux">Modern</span> <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F8F5F0] via-[#E7D8C9] to-[#C89B3C]">Healing.</span>
              </h1>
              <p className="max-w-xl text-[#E7D8C9] text-base md:text-lg tracking-wide font-light leading-relaxed">
                Discover the power of authentic Ayurvedic wellness crafted for modern lifestyles with Wellnesstillulast. Slow-batch cold-pressed elixirs engineered to heal.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
              <a 
                href="#products"
                className="px-8 py-4 rounded-full bg-[#C89B3C] hover:bg-[#B65E3C] text-[#18392B] hover:text-white text-xs tracking-widest font-sans-lux uppercase font-bold transition-all duration-500 shadow-[0_10px_30px_rgba(200,155,60,0.25)] hover:shadow-[0_15px_45px_rgba(182,94,60,0.4)] transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button 
                onClick={() => { setConsultationOpen(true); restartQuiz(); }}
                className="px-8 py-4 rounded-full bg-[#18392B]/50 hover:bg-[#18392B]/80 text-[#F8F5F0] border border-white/10 hover:border-[#C89B3C] text-xs tracking-widest font-sans-lux uppercase font-bold transition-all duration-500 backdrop-blur-md transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Personal Diagnosis</span>
                <Compass className="w-4 h-4 text-[#C89B3C]" />
              </button>
            </div>

            {/* Quick Dosha Selection Mini-Component */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C89B3C] font-semibold">Sanctuary Atmosphere Shift</span>
                <span className="text-[10px] text-white/30 italic">Select to adapt background resonance</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(doshas).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveDosha(key)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-500 ${
                      activeDosha === key 
                        ? 'bg-white/10 border-[#C89B3C] shadow-[0_10px_30px_rgba(200,155,60,0.08)]' 
                        : 'bg-[#18392B]/20 border-white/5 hover:border-white/15 hover:bg-[#18392B]/40'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      <span className={`${doshas[key].accent} mr-2`}>{doshas[key].icon}</span>
                      <span className="text-[11px] font-semibold tracking-wider uppercase">{doshas[key].name}</span>
                    </div>
                    <span className="text-[9px] text-[#E7D8C9]/60 block leading-tight">{doshas[key].elements}</span>
                  </button>
                ))}
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-xs text-[#E7D8C9] leading-relaxed font-light">
                  <span className="font-semibold text-white">The {doshas[activeDosha].name} Constitution: </span>
                  {doshas[activeDosha].description}
                </p>
              </div>
            </div>

          </div>

          {/* Right Product Composition Layer */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-12 lg:mt-0">
            
            {/* Golden Circle Portal */}
            <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#C89B3C]/10 via-[#B65E3C]/5 to-transparent border border-white/5 flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
              <div className="absolute inset-4 border border-[#C89B3C]/15 rounded-full border-dashed" />
              <div className="absolute inset-12 border border-white/5 rounded-full" />
            </div>

            {/* Immersive 3D Glass Bottle Render (SVG Layered Canvas) */}
            <div className="relative z-10 w-72 md:w-80 h-[450px] flex items-center justify-center animate-float-slow">
              <svg 
                className="w-full h-full filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)]"
                viewBox="0 0 320 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Gold Cap */}
                <rect x="135" y="40" width="50" height="35" rx="3" fill="url(#goldGrad)" stroke="#18392B" strokeWidth="1" />
                <rect x="130" y="75" width="60" height="8" rx="2" fill="url(#goldDark)" />
                <path d="M135 48 H185" stroke="#F8F5F0" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                
                {/* Bottle Neck */}
                <rect x="145" y="83" width="30" height="25" fill="url(#glassNeck)" />
                <rect x="141" y="100" width="38" height="6" rx="2" fill="url(#goldDark)" />
                
                {/* Bottle Body */}
                <path d="M80 140 C80 120 100 110 120 110 H200 C220 110 240 120 240 140 V420 C240 440 220 460 200 460 H120 C100 460 80 440 80 420 Z" fill="url(#amberGlass)" fillOpacity="0.88" stroke="url(#goldGrad)" strokeWidth="1.5" />
                
                {/* Liquid fill */}
                <path d="M84 190 C84 190 120 185 160 190 C200 195 236 190 236 190 V415 C236 430 220 454 195 454 H125 C100 454 84 430 84 415 Z" fill="url(#goldenLiquid)" opacity="0.9" />
                
                {/* Premium Label */}
                <rect x="100" y="215" width="120" height="150" rx="2" fill="#F8F5F0" stroke="url(#goldDark)" strokeWidth="1" />
                
                <text x="160" y="245" textAnchor="middle" fill="#18392B" fontSize="9" letterSpacing="0.25em" fontFamily="sans-serif" fontWeight="bold">WELLNESSTILLULAST</text>
                <line x1="125" y1="255" x2="195" y2="255" stroke="#C89B3C" strokeWidth="1" />
                <text x="160" y="282" textAnchor="middle" fill="#18392B" fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="600">Kumkumadi</text>
                <text x="160" y="302" textAnchor="middle" fill="#18392B" fontSize="9" letterSpacing="0.3em" fontFamily="sans-serif">KAYA TAILA</text>
                
                <text x="160" y="332" textAnchor="middle" fill="#B65E3C" fontSize="7" letterSpacing="0.1em" fontFamily="sans-serif" fontWeight="bold">PREMIUM RESTORATIVE NECTAR</text>
                <text x="160" y="345" textAnchor="middle" fill="#18392B" fontSize="8" fontFamily="sans-serif">Organic Botanical Blend</text>

                {/* Glass reflections */}
                <path d="M88 150 C88 150 92 122 120 116" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                <rect x="85" y="160" width="5" height="240" rx="3" fill="white" opacity="0.12" />
                
                {/* Gradients definitions */}
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C89B3C" />
                    <stop offset="30%" stopColor="#E7D8C9" />
                    <stop offset="70%" stopColor="#C89B3C" />
                    <stop offset="100%" stopColor="#8A6724" />
                  </linearGradient>
                  <linearGradient id="goldDark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8A6724" />
                    <stop offset="50%" stopColor="#C89B3C" />
                    <stop offset="100%" stopColor="#5D4312" />
                  </linearGradient>
                  <linearGradient id="glassNeck" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F8F5F0" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#F8F5F0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F8F5F0" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#221B0E" />
                    <stop offset="50%" stopColor="#3C2C13" />
                    <stop offset="100%" stopColor="#120E07" />
                  </linearGradient>
                  <linearGradient id="goldenLiquid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ECAE34" />
                    <stop offset="60%" stopColor="#C89B3C" />
                    <stop offset="100%" stopColor="#B65E3C" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Herbal Leaf Element Left */}
              <div className="absolute top-10 left-[-40px] w-20 h-20 animate-float-medium filter drop-shadow-xl">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M50 10 C50 10 20 40 20 65 C20 85 50 90 50 90 C50 90 80 85 80 65 C80 40 50 10 50 10 Z" fill="url(#leafGreen)" />
                  <path d="M50 10 V90" stroke="#3D7B5D" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3D7B5D" />
                      <stop offset="100%" stopColor="#18392B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Herbal Leaf Element Right */}
              <div className="absolute bottom-20 right-[-40px] w-24 h-24 animate-float-fast filter drop-shadow-xl transform rotate-45">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M50 10 C50 10 20 40 20 65 C20 85 50 90 50 90 C50 90 80 85 80 65 C80 40 50 10 50 10 Z" fill="url(#leafGreenDark)" />
                  <path d="M50 10 V90" stroke="#1D4E35" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="leafGreenDark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#235038" />
                      <stop offset="100%" stopColor="#0B2016" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Float Quality Badge */}
              <div className="absolute top-1/3 right-[-60px] bg-[#F8F5F0]/15 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#C89B3C]/25 flex items-center justify-center border border-[#C89B3C]/35 text-[#C89B3C]">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[9px] tracking-wider uppercase block text-white/60 mt-0.5">Sourced Globally</span>
                  <span className="text-[11px] font-semibold block text-white">100% Purity Certified</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll down prompt & mini analytics */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-8 border-t border-white/5 w-full">
          <div className="grid grid-cols-3 gap-6 md:gap-12 w-full md:w-auto">
            <div>
              <span className="text-2xl md:text-3xl font-serif-lux text-[#C89B3C] block font-semibold">100%</span>
              <span className="text-[9px] uppercase tracking-widest text-[#E7D8C9]/80 block mt-1 font-semibold">Biodynamic Cultivation</span>
            </div>
            <div className="border-l border-white/10 pl-6 md:pl-12">
              <span className="text-2xl md:text-3xl font-serif-lux text-[#C89B3C] block font-semibold">5000+</span>
              <span className="text-[9px] uppercase tracking-widest text-[#E7D8C9]/80 block mt-1 font-semibold">Traditional Heritage</span>
            </div>
            <div className="border-l border-white/10 pl-6 md:pl-12">
              <span className="text-2xl md:text-3xl font-serif-lux text-[#C89B3C] block font-semibold">50k+</span>
              <span className="text-[9px] uppercase tracking-widest text-[#E7D8C9]/80 block mt-1 font-semibold">Nourished Lives</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer mt-8 md:mt-0 group">
            <span className="text-xs tracking-[0.2em] uppercase text-[#E7D8C9]/80 group-hover:text-[#C89B3C] transition-colors duration-300">Descend to ritual path</span>
            <div className="w-7 h-11 rounded-full border border-white/20 flex justify-center p-1.5 group-hover:border-[#C89B3C] transition-colors duration-300">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-1.5 bg-[#C89B3C] rounded-full" 
              />
            </div>
          </div>
        </div>

      </section>

      {}
      <section id="philosophy" className="py-24 md:py-32 bg-[#11291F] border-t border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Storytelling Frame */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 relative shadow-2xl">
                
                {/* Simulated luxury motion imagery */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11291F] via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" 
                  alt="Ancient herbal treatment background" 
                  className="w-full h-full object-cover grayscale opacity-45 hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-8 left-8 right-8 z-20 space-y-3">
                  <div className="flex items-center space-x-2 text-[#C89B3C]">
                    <Activity className="w-5 h-5" />
                    <span className="text-xs font-semibold tracking-widest uppercase">Holistic Synthesis</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif-lux text-white leading-tight">The eternal convergence of soil, soul, and science.</h3>
                  <p className="text-xs text-[#E7D8C9]/80 font-light leading-relaxed">
                    Ayurveda is not a curation of quick remedies; it is a meticulous code of alignment that bridges stellar cycles, physical humors, and forest botanicals.
                  </p>
                </div>
              </div>

              {/* Interactive Floating Card */}
              <div className="absolute top-1/4 right-[-30px] hidden md:block glass-premium rounded-3xl p-6 border border-white/10 shadow-2xl max-w-[240px]">
                <div className="flex items-center space-x-2 text-[#C89B3C] mb-2">
                  <Award className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Absolute Trust</span>
                </div>
                <p className="text-xs text-[#E7D8C9] leading-relaxed font-light">
                  "Health is a dynamic equilibrium of toxins neutralized, metabolic heat balanced, and joyous perception preserved."
                </p>
                <span className="text-[9px] uppercase tracking-wider block mt-3 text-white/50">— Sushruta Samhita</span>
              </div>
            </div>

            {/* Philosophical Text Block */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block">Living the Philosophy</span>
                <h2 className="text-4xl md:text-5xl font-serif-lux text-white leading-tight">Healing is an organic sequence, not a symptom override.</h2>
                <p className="text-base text-[#E7D8C9] font-light leading-relaxed">
                  For centuries, humanity has addressed friction with temporary shields. Wellnesstillulast resurrects deep classical procedures, integrating them with absolute modern bio-chemistry to deliver lasting metabolic ease.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="space-y-4">
                {[
                  { title: "Pure Forest Stewardship", desc: "No greenhouse shortcuts. Ingredients are harvested wild under precise moon phases to capture maximum solar charge." },
                  { title: "The Tri-Dosha Equalizer", desc: "Our products target the cellular roots of Vata, Pitta, and Kapha rather than merely smoothing surface aesthetics." },
                  { title: "Clinical Botanical Standard", desc: "Every cold press batch is certified meticulously for zero heavy metals, zero pesticides, and absolute biological potency." }
                ].map((pillar, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C89B3C]/30 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#C89B3C]/10 flex items-center justify-center border border-[#C89B3C]/35 text-[#C89B3C] flex-shrink-0">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide text-white mb-1 uppercase">{pillar.title}</h4>
                      <p className="text-xs text-[#E7D8C9]/80 font-light leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <section id="products" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-3 text-left">
            <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block">Our Creations</span>
            <h2 className="text-4xl md:text-5xl font-serif-lux text-white tracking-tight">The Apothecary Formulations</h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Rituals' },
              { id: 'oils', label: 'Nourishing Oils' },
              { id: 'immunity', label: 'Immunity Boosters' },
              { id: 'capsules', label: 'Mineral Extracts' },
              { id: 'powders', label: 'Ojas Nectars' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProductTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 border ${
                  activeProductTab === tab.id 
                    ? 'bg-[#C89B3C] border-[#C89B3C] text-black font-semibold' 
                    : 'bg-white/5 border-white/10 text-[#E7D8C9] hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {products
              .filter(p => activeProductTab === 'all' || p.category === activeProductTab)
              .map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="rounded-[28px] overflow-hidden border border-white/10 bg-[#143125]/85 backdrop-blur-md p-6 relative group hover:border-[#C89B3C]/50 transition-all duration-500 shadow-xl"
                >
                  
                  {/* Like / Wishlist Trigger */}
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-6 right-6 p-2 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-[#C89B3C]/10 text-white transition-colors z-20"
                  >
                    <Heart className={`w-4 h-4 ${likedProducts[product.id] ? 'fill-[#B65E3C] text-[#B65E3C]' : 'text-white'}`} />
                  </button>

                  {/* Gradient Abstract Sphere Backing */}
                  <div className="absolute top-[-20px] left-[-20px] w-40 h-40 rounded-full bg-gradient-to-br from-[#C89B3C]/10 to-transparent filter blur-2xl group-hover:scale-125 transition-transform duration-700" />

                  {/* Styled Image Canvas Alternative (Geometric Luxury Product Render) */}
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative flex items-center justify-center bg-[#11291F]">
                    
                    {/* Floating geometric luxury jar design */}
                    <div className="w-24 h-24 relative flex items-center justify-center">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${product.color} opacity-40 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700`} />
                      <div className="w-16 h-20 bg-gradient-to-b from-[#E7D8C9] to-[#C89B3C] rounded-xl border border-white/20 flex flex-col justify-between p-2 shadow-2xl relative z-10 group-hover:rotate-6 transition-transform duration-500">
                        <div className="h-4 bg-[#18392B] rounded-sm w-full mb-1" />
                        <div className="flex-grow flex items-center justify-center">
                          <span className="text-[10px] font-bold text-black uppercase tracking-tight text-center">OJAS</span>
                        </div>
                        <div className="h-1 bg-white/50 rounded-sm w-full" />
                      </div>
                    </div>

                    {/* Premium Label Tag */}
                    <span className="absolute bottom-4 left-4 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] tracking-widest text-white uppercase font-semibold">
                      {product.badge}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] tracking-widest text-[#C89B3C] uppercase block font-semibold">{product.subtitle}</span>
                    <h3 className="text-xl font-serif-lux text-white font-semibold block">{product.title}</h3>
                    <p className="text-xs text-[#E7D8C9]/85 font-light leading-relaxed line-clamp-2 h-10">{product.description}</p>
                  </div>

                  {/* Rating block */}
                  <div className="flex items-center space-x-2 mt-4 text-xs text-white/60">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold text-[#F8F5F0]">{product.rating}</span>
                    <span>({product.reviews} reviews)</span>
                  </div>

                  {/* Add-to-cart strip */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                    <div>
                      <span className="text-[9px] tracking-wider text-[#E7D8C9]/60 block uppercase">Premium price</span>
                      <span className="text-lg font-semibold text-white">₹{product.price.toFixed(2)}</span>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#C89B3C] text-[#E7D8C9] hover:text-[#18392B] border border-white/10 hover:border-[#C89B3C] text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>Buy Now</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              ))}
          </AnimatePresence>
        </div>

      </section>

      {}
      <section className="py-24 md:py-32 bg-[#11291F] border-t border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-16">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block">Absolute Standards</span>
            <h2 className="text-4xl md:text-5xl font-serif-lux text-white leading-tight">Formulated with uncompromised clinical integrity.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-[#C89B3C]" />,
                title: "100% Certified Sourcing",
                desc: "We exclusively purchase roots, resins, and blooms from state-verified biodiversity forest reserves, paying fair living wages to tribal botanists."
              },
              {
                icon: <Award className="w-8 h-8 text-[#C89B3C]" />,
                title: "Traditional Coction Science",
                desc: "We cook our ghee and extract our resins in pure copper vessels over continuous slow solar heats according to precise Charaka Samhita instructions."
              },
              {
                icon: <Sparkles className="w-8 h-8 text-[#C89B3C]" />,
                title: "Clinically Validated",
                desc: "Classic wellness meets contemporary testing. Each formula is verified via gas chromatography for active molecule count and bio-safety."
              },
              {
                icon: <Wind className="w-8 h-8 text-[#C89B3C]" />,
                title: "Zero Preservatives",
                desc: "Naturally self-preserving formulations synthesized without a single chemical stabilizer, synthetic dye, paraben, or hormone disruptor."
              },
              {
                icon: <Activity className="w-8 h-8 text-[#C89B3C]" />,
                title: "The Zero-Waste Mandate",
                desc: "Every step respects earth rhythm. All raw mash residues are converted to premium organic field fertilizer, giving back completely to mother soil."
              },
              {
                icon: <Check className="w-8 h-8 text-[#C89B3C]" />,
                title: "Doctor Formulated",
                desc: "Crafted under absolute supervision of traditional vaidyas and contemporary pharmacologists to ensure ultimate efficacy."
              }
            ].map((card, i) => (
              <div 
                key={i}
                className="rounded-3xl border border-white/5 hover:border-[#C89B3C]/30 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-1 shadow-lg"
              >
                <div className="mb-6">{card.icon}</div>
                <h3 className="text-lg font-semibold text-white uppercase tracking-wider mb-2">{card.title}</h3>
                <p className="text-xs text-[#E7D8C9]/85 font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="ingredients" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block">Pure Forest Flora</span>
            <h2 className="text-4xl md:text-5xl font-serif-lux text-white leading-tight">The botanic pillars of metabolic youth.</h2>
            <p className="text-sm text-[#E7D8C9] leading-relaxed font-light">
              Explore the raw, sacred botanical components we harvest under strict lunar phases. Click any primary herb to reveal its deep physical properties and centuries of verified Ayurvedic heritage.
            </p>

            {/* Display active selection panel */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              {activeIngredient ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#C89B3C]" />
                    <h3 className="text-xl font-serif-lux text-white font-semibold">{activeIngredient.name}</h3>
                    <span className="text-[10px] italic text-[#E7D8C9]/60">({activeIngredient.science})</span>
                  </div>
                  <p className="text-xs text-[#E7D8C9] leading-relaxed font-light">{activeIngredient.property}</p>
                  <p className="text-xs text-[#C89B3C] italic leading-relaxed">{activeIngredient.history}</p>
                </div>
              ) : (
                <p className="text-xs text-[#E7D8C9]/50 italic text-center py-6">Select a botanical card on the right to reveal its sacred historical files.</p>
              )}
            </div>
          </div>

          {/* Right Cards Showcase */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {ingredients.map((ing, i) => (
              <button
                key={i}
                onClick={() => setActiveIngredient(ing)}
                className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  activeIngredient?.name === ing.name 
                    ? 'border-[#C89B3C] bg-white/10 shadow-[0_15px_30px_rgba(200,155,60,0.1)]' 
                    : 'border-white/5 bg-[#18392B] hover:border-white/15 hover:bg-white/5'
                }`}
              >
                {/* Background texture decor */}
                <div className="absolute bottom-[-10px] right-[-10px] w-20 h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full filter blur-xl group-hover:scale-150 transition-transform" />

                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] tracking-widest text-[#C89B3C] uppercase block font-semibold">Active Ingredient</span>
                  <h3 className="text-lg font-serif-lux text-white">{ing.name}</h3>
                  <p className="text-[11px] text-[#E7D8C9]/60 line-clamp-2 leading-relaxed">{ing.property}</p>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-[#C89B3C] group-hover:translate-x-1 transition-transform">
                    <span>Explore History</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>

      </section>

      {}
      <section id="testimonials" className="py-24 bg-[#11291F] border-t border-b border-white/5 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block mb-3">Revered Voices</span>
          <h2 className="text-4xl md:text-5xl font-serif-lux text-white max-w-2xl mx-auto">Awakened stories of biological balance.</h2>
        </div>

        {/* Testimonials Auto Scrolling Marquee block */}
        <div className="w-full relative py-4">
          <div className="animate-marquee whitespace-nowrap flex space-x-8">
            {[
              { name: "Adrienne M.", role: "Ayurveda Wellness Teacher", text: "Wellnesstillulast Kaya Taila has completely resolved my chronic late-autumn skin dryness. The quality matches vintage Ayurvedic apothecary formulations." },
              { name: "Dr. Julian K.", role: "Integrative Health Practitioner", text: "The Himalayan Shilajit pure resin has tested incredibly clean in our clinical lab trials. Energetic recovery is remarkable." },
              { name: "Meera P.", role: "Yogini & Spiritual Guide", text: "Ojas capsules bring a calm, centered clarity to my daily sadhana. No quick caffeine spike, just pristine metabolic vitality." },
              { name: "Steven R.", role: "Executive Performance Coach", text: "The Brahmi ghee has transformed my deep sleep scores. Truly exceptional quality." }
            ].map((test, i) => (
              <div 
                key={i}
                className="w-80 md:w-96 flex-shrink-0 glass-premium rounded-[24px] border border-white/10 p-8 whitespace-normal text-left shadow-xl"
              >
                <div className="flex text-amber-400 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#E7D8C9] leading-relaxed mb-6 font-light italic">
                  "{test.text}"
                </p>
                <div className="border-t border-white/5 pt-4">
                  <span className="text-sm font-semibold text-white block">{test.name}</span>
                  <span className="text-[10px] text-[#C89B3C] uppercase tracking-wider block font-semibold">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {}
      <section id="our-story" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block">The Source Journey</span>
            <h2 className="text-4xl md:text-5xl font-serif-lux text-white leading-tight">Rooted in ancient oral traditions. Built for modern survival.</h2>
            
            <div className="space-y-4 text-sm text-[#E7D8C9] font-light leading-relaxed">
              <p>
                Our founder, grandson of a celebrated Himalayan herbalist (Vaidya), watched raw forest resins cure complete localized communities. In 2021, he noticed that the purity of ancient remedies had been commercialized away for industrial scale.
              </p>
              <p>
                Wellnesstillulast was synthesized to preserve that raw truth. We believe physical cells deserve exact organic chemistry. We combine absolute clinical validation with centuries-old preservation secrets.
              </p>
            </div>

            {/* Founder Signature Mockup */}
            <div className="flex items-center space-x-6 pt-4 border-t border-white/5">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-[#C89B3C]/30 bg-[#11291F]">
                {/* Simulated portrait silhouette */}
                <div className="w-full h-full flex items-center justify-center text-[#C89B3C] text-lg font-serif-lux italic font-bold">W</div>
              </div>
              <div>
                <span className="text-base text-white block font-serif-lux font-semibold">Devendra Nath Shastri</span>
                <span className="text-[10px] tracking-widest text-[#C89B3C] uppercase block">Co-Founder, Traditional Botanist</span>
                
                {/* Luxury Signature Vector Line */}
                <svg className="w-32 h-8 mt-2 text-[#C89B3C]/70" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 25 Q20 5, 40 20 T75 5 T95 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

          {/* Media frame */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[36px] overflow-hidden border border-white/10 relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#18392B] via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
                alt="Ayurvedic oil pouring luxury shot" 
                className="w-full h-full object-cover grayscale opacity-40 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2">
                <span className="text-[9px] tracking-widest uppercase text-[#C89B3C] font-semibold">Pure Extraction Ritual</span>
                <p className="text-xs text-[#E7D8C9] font-light leading-relaxed">
                  "Let your daily nutrition be your biological defense medicine, and your medicine be your daily food."
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {}
      <section className="py-24 bg-[#11291F] border-t border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div className="space-y-3 text-left">
              <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block">Scribbled Wisdom</span>
              <h2 className="text-4xl md:text-5xl font-serif-lux text-white">The Living Chronicles</h2>
            </div>
            <a 
              href="#blog" 
              className="text-xs tracking-widest uppercase font-semibold text-[#C89B3C] hover:text-[#E7D8C9] transition-colors flex items-center space-x-2"
            >
              <span>Review All Articles</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Understanding the Agni: Your Internal Metabolic Fires",
                readTime: "7 min read",
                desc: "Discover simple culinary keys to awaken weak stomach acids and clear metabolic residue safely.",
                img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
              },
              {
                title: "Moon Cycles and Saffron Harvesting Dynamics",
                readTime: "5 min read",
                desc: "Why traditional families harvest beautiful Kumkumadi blossoms precisely before absolute sunset peaks.",
                img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400"
              },
              {
                title: "Winter Dinacharya: Adapting Your Daily Rituals",
                readTime: "9 min read",
                desc: "Adapt cold-weather protocols to pacify dry, airborne Vata humors using organic warm sesame oil layers.",
                img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400"
              }
            ].map((blog, i) => (
              <div 
                key={i}
                className="rounded-3xl overflow-hidden border border-white/5 hover:border-[#C89B3C]/30 bg-white/5 p-5 group transition-all duration-500 shadow-lg"
              >
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11291F] via-transparent to-transparent z-10" />
                  <img 
                    src={blog.img} 
                    alt={blog.title} 
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700 opacity-35"
                  />
                  <span className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-[#E7D8C9] tracking-widest uppercase font-semibold z-20">
                    {blog.readTime}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-serif-lux text-white group-hover:text-[#C89B3C] transition-colors leading-snug">{blog.title}</h3>
                  <p className="text-xs text-[#E7D8C9]/85 font-light leading-relaxed">{blog.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section className="py-24 md:py-32 relative overflow-hidden z-10 max-w-7xl mx-auto px-6">
        <div className="w-full rounded-[48px] bg-gradient-to-br from-[#11291F] to-[#143125] border border-[#C89B3C]/30 p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Animated Glow Backings */}
          <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-gradient-to-br from-[#C89B3C]/10 to-transparent filter blur-[120px]" />
          <div className="absolute bottom-[-50%] right-[-50%] w-full h-full bg-gradient-to-br from-[#B65E3C]/10 to-transparent filter blur-[120px]" />

          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <span className="text-xs tracking-[0.3em] text-[#C89B3C] font-semibold uppercase block">Initiate Balance</span>
            <h2 className="text-4xl md:text-6xl font-serif-lux text-white leading-tight">Begin your restorative wellness cycle today.</h2>
            <p className="text-sm md:text-base text-[#E7D8C9] font-light leading-relaxed max-w-xl mx-auto">
              Schedule a private digital consultation with our traditional Vaidya team. Receive dynamic formulations tailored to your physical constitution.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button 
                onClick={() => { setConsultationOpen(true); restartQuiz(); }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C89B3C] hover:bg-[#B65E3C] text-[#18392B] hover:text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Book Consultation
              </button>
              <a 
                href="#products"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-[#C89B3C] text-xs font-semibold tracking-widest text-[#E7D8C9] hover:text-white uppercase transition-all duration-300 bg-white/5 backdrop-blur-md"
              >
                Acquire Products
              </a>
            </div>
          </div>

        </div>
      </section>

      {}
      <footer className="bg-[#0b1b14] border-t border-white/5 py-16 md:py-24 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1 - Brand Profile */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#C89B3C]/50 flex items-center justify-center text-[#C89B3C] font-serif-lux text-lg bg-[#18392B]/50">
                W
              </div>
              <div>
                <span className="font-serif-lux text-xl tracking-wider text-white block">Wellnesstillulast</span>
                <span className="text-[8px] tracking-widest text-[#C89B3C] uppercase block">Traditional Apothecary</span>
              </div>
            </div>
            <p className="text-xs text-[#E7D8C9]/70 leading-relaxed font-light">
              Restoring human cellular vitality through traditional slow-batch Ayurveda synthesis, clinically tested for modern adaptation.
            </p>
          </div>

          {/* Col 2 - Ritual Paths */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] text-[#C89B3C] uppercase font-bold">Ritual Paths</h4>
            <div className="space-y-2 text-xs text-[#E7D8C9]/80 font-light">
              {['Kumkumadi Kaya Elixir', 'Ojas Ashwagandha Plus', 'Himalayan Shilajit Resin', 'Brahmi Ghrita Nectar', 'Golden Turmeric Concentré'].map((item) => (
                <a key={item} href="#products" className="block hover:text-[#C89B3C] transition-colors">{item}</a>
              ))}
            </div>
          </div>

          {/* Col 3 - Resources */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] text-[#C89B3C] uppercase font-bold">Resources</h4>
            <div className="space-y-2 text-xs text-[#E7D8C9]/80 font-light">
              {['Philosophical Roots', 'Pure Laboratory Tests', 'Ayurvedic Dinacharya Protocols', 'Clinical Sourcing Files', 'Global Shipping Policies'].map((item) => (
                <a key={item} href="#philosophy" className="block hover:text-[#C89B3C] transition-colors">{item}</a>
              ))}
            </div>
          </div>

          {/* Col 4 - Newsletter signup */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] text-[#C89B3C] uppercase font-bold">The Solstice Dispatch</h4>
            <p className="text-xs text-[#E7D8C9]/70 leading-relaxed font-light">
              Receive notifications of small-batch seasonal elixirs harvested during corresponding astral configurations.
            </p>
            <div className="flex rounded-full overflow-hidden border border-white/10 bg-white/5 p-1">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-transparent px-4 py-2 text-xs text-white focus:outline-none flex-grow w-full"
              />
              <button className="bg-[#C89B3C] hover:bg-[#B65E3C] text-[#18392B] hover:text-white px-4 py-2 rounded-full text-[10px] tracking-wider uppercase font-bold transition-all duration-300">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Legals */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>© 2026 Wellnesstillulast. All rights reserved. Registered under AYUSH Ministry protocols.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Formulation</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sourcing Disclosures</span>
          </div>
        </div>

      </footer>

      {}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            
            {/* Backdrop filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-[#000]/60 backdrop-blur-sm"
            />

            {/* Cart Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="relative w-full max-w-md bg-[#18392B] border-l border-white/10 h-full flex flex-col z-20 shadow-2xl p-6 md:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#C89B3C]" />
                  <h3 className="text-lg font-serif-lux text-white">Your Sanctuary Rituals</h3>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-full border border-white/10 hover:border-white/25 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto no-scrollbar py-6 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] text-[#C89B3C] uppercase tracking-wider">{item.subtitle}</span>
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <span className="text-xs text-[#E7D8C9]">${item.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Qty selectors */}
                      <div className="flex items-center space-x-3 bg-white/10 rounded-full px-3 py-1">
                        <button onClick={() => updateCartQty(item.id, -1)} className="text-white hover:text-[#C89B3C]"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold text-white">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="text-white hover:text-[#C89B3C]"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <p className="text-sm text-[#E7D8C9]/60 italic">Your cart is currently dry of elixirs.</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-2.5 rounded-full border border-[#C89B3C] text-[#C89B3C] text-xs font-semibold uppercase tracking-widest"
                    >
                      Return to formulations
                    </button>
                  </div>
                )}
              </div>

              {/* Total Block */}
              {cartItems.length > 0 && (
                <div className="border-t border-white/5 pt-6 space-y-6">
                  <div className="flex justify-between items-center text-sm font-semibold text-white">
                    <span>Valued Acquisition</span>
                    <span className="text-lg">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => { alert("Proceeding to secure clinical payment checkout."); setCartOpen(false); }}
                    className="w-full py-4 rounded-full bg-[#C89B3C] hover:bg-[#B65E3C] text-[#18392B] hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    Acquire Securely
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {consultationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Backdrop filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConsultationOpen(false)}
              className="absolute inset-0 bg-[#000]/70 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#1A3D2E] border border-[#C89B3C]/30 rounded-[36px] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-20 text-center"
            >
              
              {/* Background Ambient Glows */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89B3C]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#B65E3C]/10 rounded-full blur-3xl" />

              <button 
                onClick={() => setConsultationOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-[#C89B3C] text-[#E7D8C9] hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {!formSubmitted ? (
                <div className="space-y-6">
                  
                  {/* Header */}
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#C89B3C] font-semibold block">Dynamic Diagnostics</span>
                    <h3 className="text-2xl md:text-3xl font-serif-lux text-white">Your Constitutional Analysis</h3>
                    <p className="text-xs text-[#E7D8C9]/70 max-w-md mx-auto leading-relaxed">
                      This diagnostic evaluation leverages classical Charaka Samhita pulse profiles to discover your dominant Dosha archetype.
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#C89B3C] h-full transition-all duration-500"
                      style={{ width: `${((quickQuizStep + 1) / quizSteps.length) * 100}%` }}
                    />
                  </div>

                  {/* Question and Option list */}
                  <div className="space-y-4">
                    <span className="text-xs text-[#C89B3C] tracking-widest uppercase block">Segment {quickQuizStep + 1} of {quizSteps.length}</span>
                    <h4 className="text-lg md:text-xl text-white font-serif-lux">{quizSteps[quickQuizStep].question}</h4>
                    
                    <div className="grid gap-3 pt-2 text-left">
                      {quizSteps[quickQuizStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(option.dosha)}
                          className="w-full p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-[#C89B3C]/50 hover:bg-[#C89B3C]/5 text-[#E7D8C9] hover:text-white transition-all duration-300 flex justify-between items-center group"
                        >
                          <span className="text-xs md:text-sm font-light">{option.label}</span>
                          <ChevronRight className="w-4 h-4 text-[#C89B3C] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="space-y-6 py-4">
                  
                  <div className="w-20 h-20 bg-[#C89B3C]/10 border border-[#C89B3C] rounded-full flex items-center justify-center mx-auto text-[#C89B3C]">
                    {doshas[activeDosha].icon}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs tracking-[0.25em] uppercase text-[#C89B3C] font-semibold block">Your Verified Archetype</span>
                    <h3 className="text-4xl font-serif-lux text-white tracking-wide">{doshas[activeDosha].name}</h3>
                    <p className="text-xs text-amber-300 font-semibold uppercase tracking-widest">({doshas[activeDosha].elements})</p>
                  </div>

                  <div className="max-w-md mx-auto bg-white/5 border border-white/5 rounded-2xl p-6 text-left space-y-3">
                    <span className="text-xs font-semibold text-white block">Constitutional Guidance:</span>
                    <p className="text-xs text-[#E7D8C9] leading-relaxed font-light">
                      Your system demonstrates elevated {doshas[activeDosha].name} characteristics. We strongly advise using warm, nourishing elixirs, prioritizing stable sleep rhythms, and limiting processed inputs.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <button 
                      onClick={() => setConsultationOpen(false)}
                      className="px-6 py-3 rounded-full bg-[#C89B3C] text-black hover:bg-[#B65E3C] hover:text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                    >
                      Acquire Recommendations
                    </button>
                    <button 
                      onClick={restartQuiz}
                      className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-widest transition-all duration-300 text-white"
                    >
                      Re-evaluate
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}