import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Phone, Star, Users, Wifi, Car, Shower, Coffee, CheckCircle } from 'lucide-react';

interface GymData {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  totalReviews: number;
  openHours: {
    weekdays: string;
    weekends: string;
  };
  amenities: string[];
  description: string;
  images: string[];
  isOpen: boolean;
  currentOccupancy: number;
  maxCapacity: number;
}

const GymProfile: React.FC = () => {
  const { id } = useParams();
  const [showAllImages, setShowAllImages] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Mock data - In a real app, this would come from an API
  const gymData: GymData = {
    id: id || '1',
    name: 'Smart Fit Centro',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    phone: '(11) 3333-4444',
    rating: 4.5,
    totalReviews: 234,
    openHours: {
      weekdays: '6h às 22h',
      weekends: '8h às 18h'
    },
    amenities: ['Wifi Grátis', 'Estacionamento', 'Chuveiros', 'Café'],
    description: 'Academia completa com equipamentos modernos e ambiente climatizado. Oferecemos aulas funcionais, musculação completa e acompanhamento nutricional.',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800'
    ],
    isOpen: true,
    currentOccupancy: 45,
    maxCapacity: 80
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    'Wifi Grátis': <Wifi size={20} />,
    'Estacionamento': <Car size={20} />,
    'Chuveiros': <Shower size={20} />,
    'Café': <Coffee size={20} />
  };

  const occupancyPercentage = (gymData.currentOccupancy / gymData.maxCapacity) * 100;
  const occupancyColor = occupancyPercentage > 80 ? 'bg-red-500' : occupancyPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500';

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    // TODO: Implement actual check-in logic
  };

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Image Gallery */}
        <div className="relative">
          <div className="h-64 md:h-80 overflow-hidden">
            <img
              src={gymData.images[0]}
              alt={gymData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => setShowAllImages(true)}
              className="bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg text-sm"
            >
              Ver todas as fotos
            </button>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {gymData.name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{gymData.rating}</span>
                    <span className="text-sm">({gymData.totalReviews} avaliações)</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    gymData.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {gymData.isOpen ? 'Aberta agora' : 'Fechada'}
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin size={16} className="mr-1" />
                  <span>{gymData.address}</span>
                </div>
              </div>
            </div>

            {/* Check-in Button */}
            <div className="mb-6">
              {isCheckedIn ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-800">Check-in realizado!</p>
                    <p className="text-sm text-green-600">Aproveite seu treino na {gymData.name}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleCheckIn}
                  disabled={!gymData.isOpen}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                    gymData.isOpen
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {gymData.isOpen ? 'Fazer Check-in' : 'Academia Fechada'}
                </button>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Hours & Contact */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Horários e Contato
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Seg-Sex:</p>
                    <p className="font-medium">{gymData.openHours.weekdays}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Sáb-Dom:</p>
                    <p className="font-medium">{gymData.openHours.weekends}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="font-medium">{gymData.phone}</span>
                </div>
              </div>
            </div>

            {/* Occupancy */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Movimento Atual
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Ocupação atual</span>
                  </div>
                  <span className="font-semibold">{gymData.currentOccupancy}/{gymData.maxCapacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${occupancyColor} transition-all duration-300`}
                    style={{ width: `${occupancyPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {occupancyPercentage < 60 ? 'Academia com movimento tranquilo' :
                   occupancyPercentage < 80 ? 'Academia com movimento moderado' :
                   'Academia com movimento intenso'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sobre a Academia
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {gymData.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Comodidades
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gymData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-primary-600">
                    {amenityIcons[amenity] || <CheckCircle size={20} />}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymProfile;
