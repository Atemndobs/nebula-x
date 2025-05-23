import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Nebula Logix transformed our entire cloud infrastructure. Their expertise saved us countless hours and reduced our operating costs by 35%.",
      author: "Sarah Johnson",
      position: "CTO",
      company: "TechFront Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      quote: "The team at Nebula Logix delivered our application ahead of schedule. Their attention to detail and commitment to quality is unmatched in the industry.",
      author: "Michael Chen",
      position: "Product Director",
      company: "Innovate Systems",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      quote: "Working with Nebula Logix has been a game-changer for our business. Their AI solutions have increased our efficiency by over 40%.",
      author: "Elena Rodriguez",
      position: "Operations Manager",
      company: "GlobalScale",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section className="py-24 bg-gradient-to-br from-[#140726] via-[#1a0a2e] to-[#140726] relative overflow-hidden">
      <div className="container mx-auto px-28 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex -space-x-4 mb-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`w-12 h-12 rounded-full border-2 border-[#e35c75] transition-all duration-500 ${
                      index === currentIndex ? 'scale-125 z-10' : 'opacity-50'
                    }`}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mb-8">
                <p className="text-xl text-white/90 italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="font-semibold text-[#e35c75]">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-sm text-white/60">
                  {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={prevTestimonial}
                  title="Previous testimonial"
                  className="w-10 h-10 rounded-[12px] border-4 border-[#f64661]/20 flex items-center justify-center hover:bg-[#f64661]/10 hover:border-[#f64661]/30 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  title="Next testimonial"
                  className="w-10 h-10 rounded-[12px] border-4 border-[#f64661]/20 flex items-center justify-center hover:bg-[#f64661]/10 hover:border-[#f64661]/30 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;