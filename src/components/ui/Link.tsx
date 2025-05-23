import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ 
  href, 
  children, 
  className = '' 
}) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <a 
      href={href}
      onClick={scrollToSection}
      className={`text-white hover:text-[#e35c75] transition-colors duration-300 text-sm font-medium ${className}`}
    >
      {children}
    </a>
  );
};