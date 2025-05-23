import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'cloud', name: 'Cloud Migration' },
    { id: 'app', name: 'App Development' },
    { id: 'ai', name: 'AI Solutions' },
  ];
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise Cloud Migration',
      category: 'cloud',
      description: 'Migrated a legacy system to a modern cloud architecture, reducing costs by 40%.',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      title: 'E-commerce Mobile App',
      category: 'app',
      description: 'Built a scalable mobile application with real-time inventory management.',
      image: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      title: 'Predictive Analytics Platform',
      category: 'ai',
      description: 'Developed an AI system that predicts customer behavior with 94% accuracy.',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      title: 'Serverless Microservices Architecture',
      category: 'cloud',
      description: 'Implemented a serverless architecture that scales automatically with demand.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="text-sm uppercase tracking-wider text-[#e35c75] mb-2">Our Work</div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-1.5 rounded-[12px] text-sm transition-all duration-300 border-4 ${
                  activeCategory === category.id
                    ? 'bg-[#f64661] border-[#f64661] text-white'
                    : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="group bg-black/40 border border-white/5 rounded-2xl overflow-hidden hover:border-[#e35c75]/20 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-[#e35c75] hover:text-[#c24a63] transition-colors duration-300"
                >
                  View Case Study <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;