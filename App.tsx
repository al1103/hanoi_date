import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { 
  Calendar, 
  MapPin, 
  Utensils, 
  Heart, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Send,
  Edit3,
  Star,
  Cloud,
  Shuffle,
  Sun,
  PenTool,
  Plus,
  Loader2,
  CloudRain,
  CloudLightning,
  Snowflake,
  Gift,
  PartyPopper,
  Carrot,
  PawPrint,
  Leaf,
  Download,
  Camera,
  Share2,
  Music,
  Zap
} from 'lucide-react';

// --- Types & Interfaces ---

interface LocationItem {
  id: string;
  name: string;
  emoji: string;
  desc: string;
}

interface FoodItem {
  id: string;
  name: string;
  imageAlt: string;
  desc: string;
}

interface WeatherType {
  text: string;
  color: string;
  icon: React.ReactNode;
  temp?: number;
}

// --- Data Constants ---

const LOCATIONS: LocationItem[] = [
  { id: '1', name: 'Hồ Gươm', emoji: '⭐', desc: 'Check-in trung tâm' },
  { id: '2', name: 'Phố cổ Hà Nội', emoji: '🏮', desc: 'Dạo phố' },
  { id: '3', name: 'West Lake (Hồ Tây)', emoji: '🌅', desc: 'Ngắm hoàng hôn' },
  { id: '4', name: 'Lotte Observation Deck', emoji: '🏙️', desc: 'View thành phố' },
  { id: '5', name: 'Landmark 72 Sky', emoji: '🌆', desc: 'View cao tầng' },
  { id: '6', name: 'AEON Mall Hà Đông', emoji: '🎡', desc: 'Vui chơi + ăn uống' },
  { id: '7', name: 'Royal City', emoji: '⛸️', desc: 'Sân trượt băng' },
  { id: '8', name: 'Vincom Bà Triệu', emoji: '🍿', desc: 'Xem phim' },
  { id: '9', name: 'Công Viên Thống Nhất', emoji: '🌳', desc: 'Picnic' },
  { id: '10', name: 'Long Biên Bridge', emoji: '🌉', desc: 'Chụp ảnh' },
  { id: '11', name: 'Keangnam Sky Walk', emoji: '👣', desc: 'Đi bộ trên kính' },
  { id: '12', name: 'Công viên Yên Sở', emoji: '🚴', desc: 'Đạp xe' },
];

const FOODS: FoodItem[] = [
  { id: 'f1', name: 'Phở bò', imageAlt: 'Tô phở bốc hơi', desc: 'Hương vị truyền thống' },
  { id: 'f2', name: 'Bún chả', imageAlt: 'Bún chả + nem', desc: 'Đậm đà Hà Nội' },
  { id: 'f3', name: 'Bánh mì Hà Nội', imageAlt: 'Ổ bánh mì', desc: 'Giòn rụm thơm ngon' },
  { id: 'f4', name: 'Trà chanh chém gió', imageAlt: 'Cốc trà chanh', desc: 'Vỉa hè cực chill' },
  { id: 'f5', name: 'Chả cá Lã Vọng', imageAlt: 'Chảo chả cá', desc: 'Tinh hoa ẩm thực' },
  { id: 'f6', name: 'Xôi xéo', imageAlt: 'Gói xôi vàng', desc: 'Bữa sáng ấm bụng' },
  { id: 'f7', name: 'Bánh cuốn Thanh Trì', imageAlt: 'Đĩa bánh cuốn', desc: 'Mỏng tang mềm mịn' },
  { id: 'f8', name: 'Nem rán', imageAlt: 'Đĩa nem rán', desc: 'Giòn tan khó cưỡng' },
];

const FORTUNES = [
  "Cặp đôi hoàn hảo nhất Zootopia! 🦊🐰",
  "Hợp nhau như Cà rốt với Thỏ! 🥕",
  "Tình yêu sét đánh như Flash chạy đua! ⚡",
  "Đi chơi vui vẻ, cẩn thận lạc vào tim nhau! ❤️",
  "Kèo này chắc chắn 100% vui nổ trời! 🎉",
  "Dễ thương xỉu up xỉu down! 🥰",
];

// Helper to map WMO weather codes to cute UI
const getWeatherConfig = (code: number): WeatherType => {
  // Codes: https://open-meteo.com/en/docs
  if (code === 0 || code === 1) {
    return { text: "Trời quang, đi chơi thôi Judy ơi! ✨", color: "text-blue-500", icon: <Star size={20} className="animate-spin-slow text-yellow-400"/> };
  }
  if (code === 2 || code === 3) {
    return { text: "Mát mẻ như ở Tundra Town! ☁️", color: "text-slate-500", icon: <Cloud size={20} className="animate-bounce text-slate-400"/> };
  }
  if (code >= 45 && code <= 48) {
    return { text: "Sương mù mờ ảo lắm nha! 🌫️", color: "text-purple-500", icon: <Cloud size={20} className="text-purple-300"/> };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { text: "Mưa rơi như ở Rainforest District! ☔", color: "text-blue-600", icon: <CloudRain size={20} className="animate-pulse text-blue-400"/> };
  }
  if (code >= 95) {
    return { text: "Sấm chớp! Trú mưa cùng Nick thôi! ⚡", color: "text-yellow-600", icon: <CloudLightning size={20} className="animate-pulse text-yellow-500"/> };
  }
  if (code >= 71) {
    return { text: "Lạnh buốt! Cần bộ lông ấm áp! ❄️", color: "text-cyan-600", icon: <Snowflake size={20} className="animate-spin text-cyan-400"/> };
  }
  
  // Default fallback
  return { text: "Thời tiết Zootopia hôm nay bí ẩn! ❤️", color: "text-pink-500", icon: <Sun size={20} className="text-pink-400"/> };
};

// --- Sub-Components ---

const CursorTrail = () => {
  const [trail, setTrail] = useState<{id: number, x: number, y: number, rotation: number}[]>([]);
  const requestRef = useRef<number>(0);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle to create distinct paw prints
      const now = Date.now();
      if (now - timerRef.current > 100) { // Add paw every 100ms
        timerRef.current = now;
        const id = now;
        const rotation = Math.random() * 30 - 15; // Slight random rotation
        
        setTrail(prev => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY, rotation }]);
        
        // Cleanup individual paw after animation
        setTimeout(() => {
          setTrail(prev => prev.filter(p => p.id !== id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {trail.map((p) => (
        <div 
          key={p.id}
          className="absolute text-orange-300 opacity-60 animate-fade-out"
          style={{ 
            left: p.x, 
            top: p.y,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`
          }}
        >
          <PawPrint size={24} fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      
      {/* Subtle Pattern Grid */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* Sunburst / Light Rays Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-20 bg-gradient-to-b from-white to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Icons */}
      <div className="absolute top-[10%] left-[5%] text-orange-400 animate-float opacity-60"><Carrot size={48} fill="#fdba74" /></div>
      <div className="absolute top-[20%] right-[10%] text-slate-400 animate-float-delayed opacity-40"><PawPrint size={32} fill="#cbd5e1" /></div>
      <div className="absolute top-[50%] left-[8%] text-green-400 animate-float opacity-50"><Leaf size={40} fill="#86efac" /></div>
      <div className="absolute bottom-[20%] right-[5%] text-pink-300 animate-float opacity-50"><Heart size={28} fill="#f9a8d4" /></div>
      <div className="absolute bottom-[10%] left-[15%] text-blue-300 animate-float-delayed opacity-60"><Cloud size={56} fill="#bae6fd" /></div>
      <div className="absolute top-[15%] left-[40%] text-yellow-400 animate-spin-slow opacity-50"><Star size={24} fill="#fde047" /></div>
      
      {/* Large Gradient Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse"></div>
      
      {/* City Skyline Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20 text-slate-600 flex items-end">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
              <path fill="currentColor" d="M0,120 L0,60 Q150,80 300,60 T600,60 T900,60 T1200,60 L1200,120 Z" opacity="0.4"/>
              <path fill="currentColor" d="M0,120 L100,120 L100,50 L150,50 L150,120 L250,120 L250,80 L350,80 L350,120 L500,120 L500,40 L600,40 L600,120 L800,120 L800,60 L900,60 L900,120 L1100,120 L1100,70 L1200,70 L1200,120 Z" />
          </svg>
      </div>
    </div>
  );
};

const ClickSparkles = () => {
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number, emoji: string}[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Zootopia themed emojis
      const emojis = ['🐰', '🦊', '🥕', '🍩', '🐾', '🚓', '🍦', '👮‍♀️', '🦁', '✨', '💖'];
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      };

      setSparkles(prev => [...prev, newSparkle]);
      
      // Remove after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {sparkles.map(s => (
         <div 
           key={s.id}
           className="absolute animate-float-fade text-2xl select-none"
           style={{ left: s.x, top: s.y }}
         >
           {s.emoji}
         </div>
       ))}
    </div>
  );
};

const Mascot = ({ step }: { step: number }) => {
  const [poked, setPoked] = useState(false);
  let gifUrl = "";
  let message = "";
  let borderColor = "border-blue-400"; // Default Judy blue
  
  if (step === 1) {
    // Judy Hopps - Ready for duty/planning
    gifUrl = "https://media.giphy.com/media/l2JHVUriDGEtWOx0c/giphy.gif"; 
    message = "Sẵn sàng làm nhiệm vụ... hẹn hò chưa? 🐰👮‍♀️";
    borderColor = "border-blue-400";
  } else if (step === 2) {
    // Clawhauser - Loving donuts/food
    gifUrl = "https://media.giphy.com/media/10t57cXgo7x5kI/giphy.gif"; 
    message = "Oa! Món này ngon như bánh rán của tớ vậy! 🍩🐆";
    borderColor = "border-yellow-400";
  } else if (step === 3) {
    // Flash - Sloth smiling slowly (Gift waiting)
    gifUrl = "https://media.giphy.com/media/l2JIm1W8s8rI8966Y/giphy.gif";
    message = "Đợi... một... chút... quà... tới... nè... 🦥";
    borderColor = "border-green-400";
  } else {
    // Nick & Judy - Final Result / Summary
    gifUrl = "https://media.giphy.com/media/l2JIdnF6aJcNqaEng/giphy.gif";
    message = "Cặp đôi hoàn hảo chốt đơn nè! 🦊🐰";
    borderColor = "border-orange-400";
  }

  const handlePoke = (e: React.MouseEvent) => {
     e.stopPropagation(); 
     setPoked(true);
     setTimeout(() => setPoked(false), 1500);
  };

  return (
    <div 
      className="flex flex-col items-center mb-6 animate-pop cursor-pointer transition-transform hover:scale-105" 
      onClick={handlePoke}
      title="Chạm vào tớ đi! 🫣"
    >
      <div className={`relative ${poked ? 'animate-wiggle' : ''}`}>
         <div className={`w-36 h-36 rounded-full border-[6px] shadow-xl overflow-hidden bg-white ${borderColor}`}>
            <img src={gifUrl} alt="Zootopia Mascot" className="w-full h-full object-cover" />
         </div>
         <div className="absolute -bottom-2 -right-2 bg-white text-orange-500 rounded-full p-2 shadow-md animate-bounce border-2 border-orange-200">
            <Carrot size={20} fill="#f97316" />
         </div>
         {poked && (
             <>
               <div className="absolute -top-2 -right-6 text-3xl animate-bounce z-20">🐰</div>
               <div className="absolute top-0 -left-6 text-3xl animate-pulse z-20 delay-100">🦊</div>
             </>
         )}
      </div>
      <div className={`mt-3 px-5 py-2.5 rounded-2xl shadow-sm border border-white/60 transition-colors duration-300 backdrop-blur-md ${poked ? 'bg-orange-100 text-orange-600' : 'bg-white/80 text-slate-700'}`}>
        <p className="font-heading font-bold text-lg text-center leading-tight">{poked ? "Sly fox! Dumb bunny! 🥰" : message}</p>
      </div>
    </div>
  );
};

const Confetti = () => {
  const [pieces, setPieces] = useState<{id: number, x: number, y: number, color: string, rotate: number, shape: string}[]>([]);

  useEffect(() => {
    const colors = ['#f97316', '#3b82f6', '#facc15', '#ec4899', '#4ade80']; // Orange, Blue, Yellow, Pink, Green
    const newPieces = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 50, // Start above
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'circle' : 'rect'
    }));
    setPieces(newPieces);

    const interval = setInterval(() => {
      setPieces(prev => prev.map(p => ({
        ...p,
        y: p.y + 2 + Math.random() * 3, // Fall down
        x: p.x + Math.sin(p.y / 10) * 0.5, // Sway
        rotate: p.rotate + 10
      })).filter(p => p.y < 110)); // Remove when off screen
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map(p => (
        <div 
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: '10px',
            height: '10px',
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            transform: `rotate(${p.rotate}deg)`
          }}
        />
      ))}
    </div>
  );
};

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '' 
}: { 
  children?: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-heading font-bold transition-all duration-200 transform active:scale-90 flex items-center gap-2 justify-center shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100";
  
  const variants = {
    // Modified primary to be more Zootopia-ish (Judy Blue to Nick Orange)
    primary: "bg-gradient-to-r from-blue-400 to-orange-400 text-white hover:from-blue-500 hover:to-orange-500 shadow-orange-200/50 border-b-4 border-orange-500 active:border-b-0 active:mt-1",
    secondary: "bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-100 shadow-slate-100/50",
    outline: "border-2 border-blue-300 text-blue-500 hover:bg-blue-50",
    ghost: "bg-transparent text-slate-500 shadow-none hover:bg-slate-100/50 border-none"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  if (currentStep > 2) return null; // Only show for input steps
  
  return (
    <div className="flex justify-center items-center gap-3 mb-4">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-lg transition-all duration-500 border-2
              ${step === currentStep 
                ? 'bg-orange-400 border-orange-500 text-white scale-110 shadow-lg shadow-orange-200 rotate-3' 
                : step < currentStep 
                  ? 'bg-blue-400 border-blue-500 text-white' 
                  : 'bg-white border-slate-200 text-slate-300'
              }`}
          >
            {step < currentStep ? <Check size={20} /> : step}
          </div>
          {step < 2 && (
            <div className={`w-8 h-1.5 rounded-full mx-2 transition-all duration-500 ${step < currentStep ? 'bg-blue-300' : 'bg-slate-100'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

// --- Main Application ---

const App = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  
  // Locations State
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [customLocations, setCustomLocations] = useState<LocationItem[]>([]);
  const [newLocationName, setNewLocationName] = useState('');
  
  // Food State (Now Multi-select)
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [customFoodName, setCustomFoodName] = useState('');

  const [loveNote, setLoveNote] = useState('');
  const [isAnimate, setIsAnimate] = useState(false);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  
  // Step 3 Interactive State
  const [unwrapProgress, setUnwrapProgress] = useState(0);

  const ticketRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsAnimate(true);
    const timer = setTimeout(() => setIsAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [step]);

  // Fetch Weather when date changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (!date) {
        setWeather(null);
        return;
      }

      setIsLoadingWeather(true);
      
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&hourly=weathercode,temperature_2m&timezone=Asia%2FBangkok&start_date=${date}&end_date=${date}`
        );

        if (!response.ok) throw new Error('Weather API error');

        const data = await response.json();
        
        if (data.hourly && data.hourly.time && data.hourly.time.length > 0) {
          const targetHourStr = `${date}T19:00`;
          let index = data.hourly.time.findIndex((t: string) => t.startsWith(targetHourStr));
          
          if (index === -1) index = 12; 
          if (index >= data.hourly.weathercode.length) index = 0;

          const code = data.hourly.weathercode[index];
          const temp = data.hourly.temperature_2m[index];
          
          const config = getWeatherConfig(code);
          setWeather({ ...config, temp });
        } else {
             setWeather({ 
                 text: "Xa quá chưa dự báo được, nhưng chắc chắn là đẹp! ✨", 
                 color: "text-blue-500", 
                 icon: <Sparkles size={20} className="text-blue-400"/> 
             });
        }
      } catch (error) {
        setWeather({ 
            text: "Không lấy được thời tiết, cứ đi là vui! ❤️", 
            color: "text-slate-500", 
            icon: <Sun size={20} className="text-orange-400"/> 
        });
      } finally {
        setIsLoadingWeather(false);
      }
    };

    const debounce = setTimeout(() => {
        fetchWeather();
    }, 500);

    return () => clearTimeout(debounce);
  }, [date]);

  const allLocations = [...LOCATIONS, ...customLocations];

  const handleToggleLocation = (id: string) => {
    setSelectedLocations(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleFood = (id: string) => {
    setSelectedFoods(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomLocation = () => {
    if (!newLocationName.trim()) return;
    const newId = `custom-loc-${Date.now()}`;
    const newLoc: LocationItem = {
      id: newId,
      name: newLocationName,
      emoji: '✨',
      desc: 'Địa điểm tự chọn'
    };
    setCustomLocations([...customLocations, newLoc]);
    setSelectedLocations([...selectedLocations, newId]);
    setNewLocationName('');
  };

  const handleRandomize = () => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 7) + 1;
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + randomDays);
    setDate(randomDate.toISOString().split('T')[0]);

    const shuffled = [...LOCATIONS].sort(() => 0.5 - Math.random());
    const randomLocs = shuffled.slice(0, 3).map(l => l.id);
    setSelectedLocations(randomLocs);
  };

  const handleNext = () => {
    if (step === 1 && (!date || selectedLocations.length === 0)) return;
    if (step === 2) {
      if (selectedFoods.length === 0) return;
      if (selectedFoods.includes('custom') && !customFoodName.trim()) return;
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setIsSaving(true);
    
    try {
        const canvas = await html2canvas(ticketRef.current, {
            useCORS: true, 
            scale: 2, 
            backgroundColor: null, 
            logging: false,
        });
        
        // Mobile "Save to Photos" requires Web Share API with files
        const filename = `zootopia-ticket-${date || 'lovely-date'}.png`;

        canvas.toBlob(async (blob) => {
            if (!blob) throw new Error('Canvas is empty');
            
            // 1. Try Native Share (Mobile)
            if (navigator.share && navigator.canShare) {
                const file = new File([blob], filename, { type: 'image/png' });
                const shareData = {
                   files: [file],
                   title: 'Zootopia Date Ticket',
                   text: 'Kèo hẹn hò chốt đơn nè! ❤️'
                };

                if (navigator.canShare(shareData)) {
                    try {
                        await navigator.share(shareData);
                        setIsSaving(false);
                        return; // Success, exit
                    } catch (err) {
                        // User cancelled share or error, fallback to download
                        console.log('Share skipped/failed', err);
                    }
                }
            }

            // 2. Fallback: Direct Download (Desktop/Unsupported Browsers)
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

        }, 'image/png');

    } catch (err) {
        console.error("Save failed:", err);
        alert("Úi, máy ảnh của Flash bị kẹt rồi! Thử chụp màn hình lại nha 📸");
    } finally {
        setTimeout(() => setIsSaving(false), 2000); 
    }
  };

  // --- Step 3 Interaction Logic ---
  const handleUnwrap = () => {
    if (unwrapProgress < 5) {
      setUnwrapProgress(prev => prev + 1);
    } else {
      setStep(4);
    }
  };

  // --- Step 1 Render ---
  const renderStep1 = () => (
    <div className={`space-y-8 animate-slide-up`}>
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-heading font-bold text-slate-700">Lên kèo đi chơi! ✨</h2>
        <p className="text-slate-500 font-medium">Chọn ngày đẹp & địa điểm cùng Judy nào</p>
      </div>

      {/* Date Picker */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl shadow-blue-100/50 border-2 border-white transform transition-transform">
        <label className="block text-slate-600 font-heading font-bold mb-3 flex items-center gap-2 text-lg">
          <Calendar className="text-blue-400 animate-bounce" size={24} /> Chọn ngày
        </label>
        <div className="flex gap-4 items-center">
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 p-4 rounded-2xl border-2 border-blue-100 bg-blue-50/30 text-slate-600 font-bold focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer text-lg"
            />
            <button 
              onClick={handleRandomize} 
              className="p-4 rounded-2xl bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
              title="Chọn hộ tui đi!"
            >
              <Shuffle size={24} />
            </button>
        </div>
        
        {/* Weather Forecast Widget */}
        <div className="mt-4 min-h-[60px]">
            {isLoadingWeather ? (
                <div className="flex items-center justify-center gap-2 p-3 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <Loader2 size={20} className="animate-spin" /> Flash đang tra cứu thời tiết... chậm... lắm...
                </div>
            ) : weather ? (
              <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-3 animate-pop shadow-sm">
                 <div className="p-2 bg-slate-50 rounded-full">{weather.icon}</div>
                 <div className="flex flex-col">
                    <p className={`font-heading font-bold ${weather.color}`}>{weather.text}</p>
                    {weather.temp !== undefined && (
                        <span className="text-xs text-slate-400 font-medium">Dự báo khoảng {weather.temp}°C vào lúc 19:00</span>
                    )}
                 </div>
              </div>
            ) : date ? null : (
                <div className="p-3 bg-white/50 rounded-xl border border-transparent text-slate-400 text-sm text-center">
                    Chọn ngày để xem ông trời Zootopia bảo sao 🌦️
                </div>
            )}
        </div>
      </div>

      {/* Locations */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl shadow-orange-100/50 border-2 border-white">
        <div className="flex justify-between items-center mb-6">
          <label className="text-slate-600 font-heading font-bold flex items-center gap-2 text-lg">
            <MapPin className="text-orange-400 animate-bounce" size={24} /> Chọn địa điểm
          </label>
          <span className="bg-gradient-to-r from-orange-100 to-blue-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            {selectedLocations.length} đã chọn
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {allLocations.map(loc => {
            const isSelected = selectedLocations.includes(loc.id);
            return (
              <button
                key={loc.id}
                onClick={() => handleToggleLocation(loc.id)}
                className={`
                  relative group p-4 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-3 overflow-hidden
                  ${isSelected 
                    ? 'border-orange-400 bg-orange-50 shadow-md scale-[1.02]' 
                    : 'border-slate-100 bg-white hover:border-orange-200 hover:bg-orange-50/30'
                  }
                `}
              >
                <span className="text-3xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform">{loc.emoji}</span>
                <div className="z-10 relative">
                  <div className={`font-heading font-bold text-lg ${isSelected ? 'text-orange-600' : 'text-slate-700'}`}>{loc.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{loc.desc}</div>
                </div>
                {isSelected && (
                  <>
                    <div className="absolute top-2 right-2 text-orange-500 animate-wiggle">
                      <PawPrint size={18} fill="currentColor" />
                    </div>
                    {/* Cute sparkle background effect on selected */}
                    <div className="absolute -bottom-4 -right-4 text-orange-200 opacity-50">
                        <Sparkles size={60} />
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Add Custom Location Input */}
        <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
           <input
             type="text"
             value={newLocationName}
             onChange={(e) => setNewLocationName(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleAddCustomLocation()}
             placeholder="Nhập địa điểm bí mật..."
             className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-slate-600 placeholder:text-slate-400 font-medium"
           />
           <button 
             onClick={handleAddCustomLocation}
             className="bg-blue-400 text-white p-2.5 rounded-xl hover:bg-blue-500 transition-colors shadow-sm"
           >
             <Plus size={20} />
           </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext} 
          disabled={!date || selectedLocations.length === 0}
          className="w-full sm:w-auto text-lg"
        >
          Tiếp theo <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );

  // --- Step 2 Render ---
  const renderStep2 = () => (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-heading font-bold text-slate-700">Măm măm gì đây? 🍩</h2>
        <p className="text-slate-500 font-medium">Clawhauser bảo món nào cũng ngon hết!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FOODS.map((item, index) => {
           const isSelected = selectedFoods.includes(item.id);
           const imgUrl = `https://picsum.photos/400/300?random=${index + 10}`;
           
           return (
            <div 
              key={item.id}
              onClick={() => handleToggleFood(item.id)}
              className={`
                cursor-pointer rounded-[2rem] overflow-hidden border-4 transition-all duration-300 relative group
                ${isSelected 
                  ? 'border-yellow-300 shadow-2xl shadow-yellow-100 scale-[1.02]' 
                  : 'border-white shadow-md hover:shadow-lg hover:scale-[1.01] hover:-rotate-1'
                }
              `}
            >
              <div className="h-44 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-all" />
                <img 
                  src={imgUrl} 
                  alt={item.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                 {isSelected && (
                  <div className="absolute inset-0 bg-yellow-400/30 z-20 flex items-center justify-center backdrop-blur-[2px]">
                     {/* Sticker effect */}
                    <div className="bg-white text-yellow-600 rounded-full px-4 py-2 shadow-lg animate-pop border-2 border-yellow-200 flex items-center gap-2 transform -rotate-6">
                       <span className="text-2xl">😋</span>
                       <span className="font-heading font-bold">Yummy!</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`p-5 ${isSelected ? 'bg-yellow-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-heading font-bold text-xl ${isSelected ? 'text-yellow-700' : 'text-slate-700'}`}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                  </div>
                  <div className={`
                    w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors
                    ${isSelected ? 'border-yellow-400 bg-yellow-400' : 'border-slate-200'}
                  `}>
                    {isSelected && <Check size={16} className="text-white" strokeWidth={4} />}
                  </div>
                </div>
              </div>
            </div>
           );
        })}

        {/* Custom Food Option */}
        <div 
          onClick={() => handleToggleFood('custom')}
          className={`
            cursor-pointer rounded-[2rem] overflow-hidden border-4 transition-all duration-300 relative group p-6 flex flex-col justify-center min-h-[280px]
            ${selectedFoods.includes('custom')
              ? 'border-yellow-300 bg-yellow-50 shadow-xl scale-[1.02]' 
              : 'border-dashed border-slate-300 bg-white/50 hover:border-yellow-200 hover:bg-white'
            }
          `}
        >
          <div className="flex flex-col items-center text-center gap-4">
             <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl
               ${selectedFoods.includes('custom') ? 'bg-yellow-200' : 'bg-slate-100 text-slate-300'}
             `}>
               🍽️
             </div>
             <div>
                <h3 className={`font-heading font-bold text-xl ${selectedFoods.includes('custom') ? 'text-yellow-600' : 'text-slate-500'}`}>Món khác?</h3>
                <p className="text-sm text-slate-400 font-medium">Bánh Pawpsicle hay gì?</p>
             </div>
             
             {selectedFoods.includes('custom') && (
                <div className="w-full mt-2 animate-pop" onClick={(e) => e.stopPropagation()}>
                   <input
                     autoFocus
                     type="text"
                     value={customFoodName}
                     onChange={(e) => setCustomFoodName(e.target.value)}
                     placeholder="Nhập món bạn thích..."
                     className="w-full p-3 rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:outline-none bg-white text-slate-700 font-bold text-center"
                   />
                </div>
             )}
          </div>
        </div>
      </div>
      
      {/* Love Note Input Moved Here */}
      <div className="bg-yellow-50/80 p-4 rounded-2xl shadow-sm border border-yellow-200 transform transition-all focus-within:scale-105">
           <label className="flex items-center gap-2 text-yellow-600 font-bold mb-2">
              <PenTool size={18} /> Lời nhắn cho người ấy (ZPD Notes 📝):
           </label>
           <textarea
             value={loveNote}
             onChange={(e) => setLoveNote(e.target.value)}
             placeholder="Ghi gì đó thật ngầu như Nick Wilde đi..."
             className="w-full bg-white/80 rounded-xl p-3 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-hand text-xl text-slate-600"
             rows={2}
           />
      </div>

      <div className="flex justify-between pt-4 gap-4">
        <Button onClick={handleBack} variant="secondary">
          <ChevronLeft size={20} /> Quay lại
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={selectedFoods.length === 0 || (selectedFoods.includes('custom') && !customFoodName.trim())}
          className="flex-1 sm:flex-none text-lg"
        >
          <Send size={20} /> Gửi ngay
        </Button>
      </div>
    </div>
  );

  // --- Step 3 Render (Interactive Gift Box) ---
  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] animate-slide-up text-center">
       <h2 className="text-3xl font-heading font-bold text-slate-700 mb-8">
         {unwrapProgress < 5 ? 'Đã gửi thành công!' : 'Sẵn sàng chưa?'}
       </h2>
       <p className="text-slate-500 font-medium mb-8">
         {unwrapProgress < 5 ? `Gõ cửa nhà Flash ${5 - unwrapProgress} lần nữa để lấy vé nhé!` : 'Mở thôi!'}
       </p>
       
       <button 
         onClick={handleUnwrap}
         className={`group relative transition-all focus:outline-none select-none transform
            ${unwrapProgress > 0 ? 'scale-110' : 'scale-100'}
         `}
         style={{
             transform: `scale(${1 + unwrapProgress * 0.1}) rotate(${unwrapProgress % 2 === 0 ? 3 : -3}deg)`
         }}
       >
         <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse"></div>
         <Gift 
           size={160} 
           className={`text-orange-500 drop-shadow-2xl cursor-pointer z-10 relative transition-transform ${unwrapProgress > 0 ? 'animate-wiggle' : ''}`}
           strokeWidth={1}
           fill="#fed7aa" 
         />
         
         {/* Progress Rings */}
         {unwrapProgress > 0 && (
             <div className="absolute inset-0 border-4 border-orange-300 rounded-full animate-ping opacity-50"></div>
         )}

         <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-orange-400 font-bold font-hand text-2xl whitespace-nowrap opacity-100 transition-opacity">
            {unwrapProgress < 5 ? 'Chạm vào tớ đi! 👇' : 'BÙM! 🎉'}
         </span>
       </button>
    </div>
  );

  // --- Step 4 Render (Final Summary - Was Step 5) ---
  const renderStep4 = () => {
    // Collect all selected food objects for display
    const standardFoods = FOODS.filter(f => selectedFoods.includes(f.id));
    const locations = allLocations.filter(l => selectedLocations.includes(l.id));
    
    // Deterministic Fortune based on selections length
    const fortuneIndex = (selectedLocations.length + selectedFoods.length + date.length) % FORTUNES.length;
    const matchPercent = 90 + ((selectedLocations.length * selectedFoods.length) % 11); // Always 90-100%

    return (
      <div className="space-y-6 animate-pop relative">
        <Confetti />
        
        <div className="flex justify-center mb-6">
           <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 rounded-full shadow-lg animate-spin-slow">
              <PartyPopper size={40} />
           </div>
        </div>

        {/* Realistic Ticket UI - Final Version */}
        <div ref={ticketRef} className="bg-white rounded-[2rem] shadow-2xl overflow-hidden relative mx-2 sm:mx-0 transform hover:scale-[1.01] transition-transform duration-500 border-4 border-blue-200">
            {/* Top decorative header */}
            <div className="bg-gradient-to-r from-blue-400 via-indigo-400 to-orange-400 p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-2 left-10 animate-pulse"><Carrot fill="white" size={20}/></div>
                    <div className="absolute bottom-4 right-10 animate-pulse"><PawPrint fill="white" size={24}/></div>
                </div>
                <h3 className="text-white font-heading font-bold text-3xl tracking-widest uppercase drop-shadow-md">SUMMARY</h3>
                <div className="text-white/80 text-sm font-medium tracking-widest">ZOOTOPIA DATE TICKET</div>
                <div className="ticket-rip"></div>
            </div>

            <div className="p-8 space-y-6 bg-white relative">
              {/* Date Section */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 shadow-sm">
                  <Calendar size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ngày hẹn hò</h4>
                  <p className="text-2xl font-heading font-bold text-slate-700">
                    {date ? new Date(date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }) : '...'}
                  </p>
                  {weather && (
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className={weather.color}>{weather.icon}</span>
                        <p className={`text-sm font-bold ${weather.color}`}>{weather.text}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t-2 border-dashed border-slate-100 my-2" />

              {/* Locations Section */}
              <div className="flex items-start gap-4">
                 <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-400 shadow-sm shrink-0">
                  <MapPin size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Điểm đến ({locations.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {locations.map(loc => (
                      <span key={loc.id} className="bg-orange-50 px-3 py-1.5 rounded-xl text-slate-600 text-sm font-bold border border-orange-100 flex items-center gap-1.5">
                        <span className="text-lg">{loc.emoji}</span> {loc.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-slate-100 my-2" />

              {/* Food Section */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-400 shadow-sm shrink-0">
                  <Utensils size={28} />
                </div>
                <div className="flex-1">
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                     Thực đơn ({selectedFoods.length} món)
                   </h4>
                   <div className="grid grid-cols-2 gap-2">
                      {standardFoods.map(food => (
                        <div key={food.id} className="flex items-center gap-2 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                           <div className="w-8 h-8 rounded-full bg-white overflow-hidden shrink-0 border border-yellow-200">
                             <img src={`https://picsum.photos/400/300?random=${FOODS.indexOf(food) + 10}`} alt="" className="w-full h-full object-cover"/>
                           </div>
                           <span className="text-sm font-bold text-slate-700 truncate">{food.name}</span>
                        </div>
                      ))}
                      {selectedFoods.includes('custom') && (
                        <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs shrink-0 border border-yellow-200">✨</div>
                           <span className="text-sm font-bold text-slate-700 truncate">{customFoodName}</span>
                        </div>
                      )}
                   </div>
                </div>
              </div>

               {/* New Fortune Section */}
               <div className="mt-4 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Zap size={40} className="text-purple-500" />
                    </div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                        <Sparkles size={12} /> Góc Tiên Tri Zootopia
                    </h4>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-heading font-bold text-purple-600">{matchPercent}% Hợp Cạ</p>
                            <p className="text-sm text-slate-500 italic mt-1 font-medium">{FORTUNES[fortuneIndex]}</p>
                        </div>
                        <div className="text-4xl animate-pulse">🔮</div>
                    </div>
               </div>
              
              {/* Handwritten Love Note Display */}
              {loveNote && (
                <div className="mt-4 p-4 bg-orange-50 rounded-xl relative transform rotate-1 border border-orange-100 shadow-sm">
                    <div className="absolute -top-3 -left-2 text-red-400 transform -rotate-12"><Heart fill="currentColor" size={20}/></div>
                    <p className="font-hand text-2xl text-slate-700 text-center leading-relaxed">
                        "{loveNote}"
                    </p>
                </div>
              )}
            </div>
            
            {/* Footer with barcode look */}
            <div className="bg-slate-50 p-6 relative">
               <div className="ticket-rip-top"></div>
               <div className="flex justify-between items-end mt-2">
                   <div className="space-y-1">
                       <div className="h-8 w-48 bg-slate-200 rounded-sm opacity-50 flex items-center justify-center gap-1 overflow-hidden">
                           {/* Fake barcode lines */}
                           {[...Array(20)].map((_,i) => <div key={i} className="h-full bg-slate-400 w-0.5" style={{width: Math.random() * 4 + 'px', marginLeft: '2px'}}></div>)}
                       </div>
                       <div className="text-[10px] text-slate-400 font-mono tracking-[0.2em]">ZPD-TICKET-{new Date().getFullYear()}</div>
                   </div>
                   <div className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 transform rotate-[-10deg]">
                      APPROVED BY ZPD 👮‍♀️
                   </div>
               </div>
            </div>
        </div>

        <div className="text-center pb-8 flex justify-center gap-6">
            <button 
               onClick={() => { setStep(1); setUnwrapProgress(0); }}
               className="text-slate-400 hover:text-orange-500 font-bold underline decoration-2 underline-offset-4 transition-colors"
             >
               Sửa lại kế hoạch ✏️
             </button>
            <button 
              onClick={handleDownload}
              disabled={isSaving}
              className="text-slate-400 hover:text-blue-500 font-bold underline decoration-2 underline-offset-4 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20}/> : <><Share2 size={20} /> Lưu / Chia sẻ vé</>}
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans p-4 sm:p-8 relative selection:bg-orange-200 selection:text-orange-800">
      <FloatingBackground />
      <ClickSparkles />
      <CursorTrail />
      
      <div className="max-w-xl mx-auto relative z-10">
        <Mascot step={step} />
        <StepIndicator currentStep={step} />
        
        <div className={`transition-all duration-500 transform ${isAnimate ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        <footer className="mt-12 text-center text-slate-400 text-sm font-medium pb-8">
          <p className="flex items-center justify-center gap-2">
             Made with <Heart size={12} fill="currentColor" className="text-orange-400" /> for my dumb bunny
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;