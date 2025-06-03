const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2024 Fantasy NBA - Desarrollado para MARCA
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-200">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-blue-200">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-blue-200">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 