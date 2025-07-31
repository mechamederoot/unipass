import React, { useState } from 'react';
import { QrCode, MapPin, Clock, Check, AlertCircle, Search } from 'lucide-react';

interface Gym {
  id: string;
  name: string;
  address: string;
  distance: string;
  isOpen: boolean;
  openHours: string;
}

const CheckInPage: React.FC = () => {
  const [checkInMethod, setCheckInMethod] = useState<'qr' | 'search'>('qr');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkedInGym, setCheckedInGym] = useState<Gym | null>(null);

  const nearbyGyms: Gym[] = [
    {
      id: '1',
      name: 'Smart Fit Centro',
      address: 'Rua das Flores, 123 - Centro',
      distance: '0.5 km',
      isOpen: true,
      openHours: '6h às 22h'
    },
    {
      id: '2',
      name: 'Academia Forma',
      address: 'Av. Paulista, 456 - Bela Vista',
      distance: '1.2 km',
      isOpen: true,
      openHours: '24 horas'
    },
    {
      id: '3',
      name: 'Bio Ritmo',
      address: 'Rua Augusta, 789 - Consolação',
      distance: '1.8 km',
      isOpen: false,
      openHours: '6h às 20h'
    }
  ];

  const handleCheckIn = (gym: Gym) => {
    setCheckedInGym(gym);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckedInGym(null);
  };

  const filteredGyms = nearbyGyms.filter(gym =>
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isCheckedIn && checkedInGym) {
    return (
      <div className="min-h-screen-safe bg-gradient-to-br from-green-50 to-primary-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="card text-center">
            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check-in Realizado!
            </h2>
            <p className="text-gray-600 mb-6">
              Você está agora na
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {checkedInGym.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {checkedInGym.address}
              </p>
              <div className="flex items-center justify-center text-green-600 text-sm">
                <Clock size={16} className="mr-1" />
                <span>Check-in às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Aproveite seu treino! Lembre-se de fazer o check-out ao sair.
            </p>
            <button
              onClick={handleCheckOut}
              className="btn-secondary w-full mb-4"
            >
              Fazer Check-out
            </button>
            <p className="text-xs text-gray-500">
              O check-out será automático após 4 horas
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Check-in na Academia
          </h1>
          <p className="text-gray-600">
            Escolha como fazer seu check-in
          </p>
        </div>

        {/* Method Selection */}
        <div className="flex bg-white rounded-lg p-1 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setCheckInMethod('qr')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              checkInMethod === 'qr'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <QrCode size={20} className="inline mr-2" />
            QR Code
          </button>
          <button
            onClick={() => setCheckInMethod('search')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              checkInMethod === 'search'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <Search size={20} className="inline mr-2" />
            Buscar
          </button>
        </div>

        {checkInMethod === 'qr' ? (
          <div className="card text-center max-w-md mx-auto">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
              <QrCode size={80} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                Aponte a câmera para o QR code da academia
              </p>
              <button className="btn-primary">
                Abrir Câmera
              </button>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <AlertCircle size={16} className="mr-2" />
              <span>Certifique-se de estar na academia para usar o QR code</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Buscar academia..."
                />
              </div>
            </div>

            {/* Nearby Gyms */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Academias Próximas
              </h2>
              <div className="grid gap-4 max-w-2xl mx-auto">
                {filteredGyms.map((gym) => (
                  <div key={gym.id} className="card hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {gym.name}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin size={16} className="mr-1" />
                          <span>{gym.address}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{gym.distance}</span>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1 text-gray-400" />
                            <span className="text-gray-500">{gym.openHours}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <div className={`text-xs px-2 py-1 rounded-full mb-3 ${
                          gym.isOpen 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {gym.isOpen ? 'Aberta' : 'Fechada'}
                        </div>
                        <button
                          onClick={() => handleCheckIn(gym)}
                          disabled={!gym.isOpen}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            gym.isOpen
                              ? 'bg-primary-600 hover:bg-primary-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {gym.isOpen ? 'Check-in' : 'Fechada'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInPage;
