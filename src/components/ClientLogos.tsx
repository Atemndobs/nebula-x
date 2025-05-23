import React from 'react';

const ClientLogos: React.FC = () => {
  const logos = [
    {
      name: 'Memberstack',
      color: '#4f46e5',
      url: 'public/logos/memberstack-seeklogo.png'
    },
    {
      name: 'Dropbox',
      color: '#0061ff',
      url: 'public/logos/dropbox-seeklogo.png'
    },
    {
      name: 'Pinterest',
      color: '#e60023',
      url: 'public/logos/pinterest-seeklogo.png'
    },
    {
      name: 'Pingdom',
      color: '#00b1b3',
      url: 'public/logos/pingdom.SVG'
    },
    {
      name: 'Miro',
      color: '#ffc400',
      url: 'public/logos/miro-seeklogo.png'
    },
    {
      name: 'Prism',
      color: '#0c344b',
      url: 'public/logos/icons8-prismic-24.png'
    }
  ];

  return (
    <div className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {logos.map((logo) => (
          <div 
            key={logo.name} 
            className="flex justify-center items-center opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            {logo.name === 'Prism' ? (
              <div className="flex items-center gap-2">
                <img 
                  src={logo.url}
                  alt={`${logo.name} logo`}
                  className="h-8 object-contain invert brightness-0"
                />
                <span className="text-white font-medium">Prismic</span>
              </div>
            ) : (
              <img 
                src={logo.url}
                alt={`${logo.name} logo`}
                className={`h-8 object-contain ${['Dropbox', 'Pingdom'].includes(logo.name) ? 'invert brightness-0' : ''}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;