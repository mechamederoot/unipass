import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Clock, Calendar, Edit3, Award, Activity } from 'lucide-react';

interface CheckInHistory {
  id: string;
  gymName: string;
  date: string;
  duration: string;
  status: 'completed' | 'active';
}

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    memberSince: '2024-01-15',
    totalCheckIns: 47,
    favoriteGym: 'Smart Fit Centro'
  });

  const checkInHistory: CheckInHistory[] = [
    {
      id: '1',
      gymName: 'Smart Fit Centro',
      date: '2024-07-31',
      duration: '1h 30min',
      status: 'completed'
    },
    {
      id: '2',
      gymName: 'Academia Forma',
      date: '2024-07-29',
      duration: '2h 15min',
      status: 'completed'
    },
    {
      id: '3',
      gymName: 'Bio Ritmo',
      date: '2024-07-27',
      duration: '1h 45min',
      status: 'completed'
    },
    {
      id: '4',
      gymName: 'Smart Fit Centro',
      date: '2024-07-25',
      duration: '1h 20min',
      status: 'completed'
    }
  ];

  const stats = [
    { icon: <Activity />, label: 'Total Check-ins', value: userInfo.totalCheckIns },
    { icon: <Clock />, label: 'Horas Treinadas', value: '52h' },
    { icon: <Award />, label: 'Academias Visitadas', value: '8' },
    { icon: <Calendar />, label: 'Membro desde', value: new Date(userInfo.memberSince).toLocaleDateString('pt-BR') }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save functionality
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center">
                <User size={32} />
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-primary-500 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
                )}
                <p className="text-gray-600">Membro Unipass</p>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <Edit3 size={20} />
              <span>{isEditing ? 'Salvar' : 'Editar'}</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 border-b border-gray-300 focus:border-primary-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{userInfo.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 border-b border-gray-300 focus:border-primary-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{userInfo.phone}</span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">Academia Favorita: {userInfo.favoriteGym}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Check-in History */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Histórico de Check-ins
          </h2>
          <div className="space-y-4">
            {checkInHistory.map((checkin) => (
              <div key={checkin.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 text-primary-600 w-10 h-10 rounded-full flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {checkin.gymName}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{new Date(checkin.date).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{checkin.duration}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  checkin.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {checkin.status === 'completed' ? 'Concluído' : 'Ativo'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="btn-secondary">
              Ver Mais Histórico
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <button className="btn-primary">
            Fazer Check-in
          </button>
          <button className="btn-secondary">
            Encontrar Academias
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
