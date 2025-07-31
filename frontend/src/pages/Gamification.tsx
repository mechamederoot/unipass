import React, { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Target, Users, Calendar, Award, TrendingUp, Medal, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface UserPoints {
  total_points: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  points_to_next_level: number;
  last_checkin_date: string | null;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  points_reward: number;
  condition_type: string;
  condition_value: number;
  is_earned: boolean;
  earned_at: string | null;
  progress: number;
  progress_percentage: number;
}

interface LeaderboardEntry {
  position: number;
  user_id: number;
  name: string;
  points: number;
  level: number | null;
  is_current_user: boolean;
}

interface PointHistoryEntry {
  id: number;
  points_change: number;
  reason: string;
  description: string;
  created_at: string;
}

const Gamification: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [pointHistory, setPointHistory] = useState<PointHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('all_time');

  useEffect(() => {
    loadGamificationData();
  }, []);

  const loadGamificationData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadUserPoints(),
        loadAchievements(),
        loadLeaderboard(),
        loadPointHistory()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados de gamificação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserPoints = async () => {
    // Mock data - replace with actual API call
    const mockPoints: UserPoints = {
      total_points: 1250,
      level: 8,
      current_streak: 12,
      longest_streak: 28,
      points_to_next_level: 150,
      last_checkin_date: "2024-07-31T10:30:00Z"
    };
    setUserPoints(mockPoints);
  };

  const loadAchievements = async () => {
    // Mock data - replace with actual API call
    const mockAchievements: Achievement[] = [
      {
        id: 1,
        name: "Primeiro Check-in",
        description: "Faça seu primeiro check-in em uma academia",
        icon: "first-checkin",
        points_reward: 10,
        condition_type: "CHECKIN_COUNT",
        condition_value: 1,
        is_earned: true,
        earned_at: "2024-01-15T10:30:00Z",
        progress: 1,
        progress_percentage: 100
      },
      {
        id: 2,
        name: "Frequentador Assíduo",
        description: "Faça check-in por 7 dias consecutivos",
        icon: "streak-7",
        points_reward: 50,
        condition_type: "STREAK_DAYS",
        condition_value: 7,
        is_earned: true,
        earned_at: "2024-02-20T14:15:00Z",
        progress: 7,
        progress_percentage: 100
      },
      {
        id: 3,
        name: "Explorador",
        description: "Visite 10 academias diferentes",
        icon: "explorer",
        points_reward: 100,
        condition_type: "UNIQUE_GYMS",
        condition_value: 10,
        is_earned: false,
        earned_at: null,
        progress: 7,
        progress_percentage: 70
      },
      {
        id: 4,
        name: "Maratonista",
        description: "Complete 100 check-ins",
        icon: "marathon",
        points_reward: 200,
        condition_type: "CHECKIN_COUNT",
        condition_value: 100,
        is_earned: false,
        earned_at: null,
        progress: 67,
        progress_percentage: 67
      },
      {
        id: 5,
        name: "Dedicação Total",
        description: "Mantenha uma sequência de 30 dias",
        icon: "dedication",
        points_reward: 300,
        condition_type: "STREAK_DAYS",
        condition_value: 30,
        is_earned: false,
        earned_at: null,
        progress: 12,
        progress_percentage: 40
      }
    ];
    setAchievements(mockAchievements);
  };

  const loadLeaderboard = async () => {
    // Mock data - replace with actual API call
    const mockLeaderboard: LeaderboardEntry[] = [
      { position: 1, user_id: 101, name: "Ana Silva", points: 2340, level: 15, is_current_user: false },
      { position: 2, user_id: 102, name: "Carlos Santos", points: 2156, level: 14, is_current_user: false },
      { position: 3, user_id: 103, name: "Maria Costa", points: 1987, level: 13, is_current_user: false },
      { position: 4, user_id: 104, name: "Pedro Lima", points: 1834, level: 12, is_current_user: false },
      { position: 5, user_id: 105, name: user?.name || "Você", points: 1250, level: 8, is_current_user: true },
      { position: 6, user_id: 106, name: "Julia Fernandes", points: 1123, level: 7, is_current_user: false }
    ];
    setLeaderboard(mockLeaderboard);
  };

  const loadPointHistory = async () => {
    // Mock data - replace with actual API call
    const mockHistory: PointHistoryEntry[] = [
      {
        id: 1,
        points_change: 15,
        reason: "CHECKIN",
        description: "Check-in points + streak bonus",
        created_at: "2024-07-31T10:30:00Z"
      },
      {
        id: 2,
        points_change: 50,
        reason: "ACHIEVEMENT",
        description: "Achievement unlocked: Frequentador Assíduo",
        created_at: "2024-07-30T18:45:00Z"
      },
      {
        id: 3,
        points_change: 10,
        reason: "CHECKIN",
        description: "Check-in points + streak bonus",
        created_at: "2024-07-30T07:15:00Z"
      }
    ];
    setPointHistory(mockHistory);
  };

  const getAchievementIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'first-checkin': <Target className="h-8 w-8" />,
      'streak-7': <Calendar className="h-8 w-8" />,
      'explorer': <Star className="h-8 w-8" />,
      'marathon': <Trophy className="h-8 w-8" />,
      'dedication': <Crown className="h-8 w-8" />
    };
    return iconMap[iconName] || <Award className="h-8 w-8" />;
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (position === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (position === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">#{position}</span>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isLoading) {
    return <LoadingSpinner message="Carregando gamificação..." />;
  }

  return (
    <div className="min-h-screen-safe bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-4xl font-bold mb-4">Sistema de Pontos</h1>
            <p className="text-xl text-primary-100">
              Conquiste pontos, desbloqueie conquistas e compete com outros usuários!
            </p>
          </div>

          {userPoints && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{userPoints.total_points.toLocaleString()}</div>
                <div className="text-primary-200 text-sm">Total de Pontos</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">Nível {userPoints.level}</div>
                <div className="text-primary-200 text-sm">{userPoints.points_to_next_level} para próximo</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{userPoints.current_streak}</div>
                <div className="text-primary-200 text-sm">Sequência Atual</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{userPoints.longest_streak}</div>
                <div className="text-primary-200 text-sm">Melhor Sequência</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Visão Geral', icon: TrendingUp },
              { id: 'achievements', name: 'Conquistas', icon: Trophy },
              { id: 'leaderboard', name: 'Ranking', icon: Users },
              { id: 'history', name: 'Histórico', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon size={20} className="mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Level Progress */}
            {userPoints && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso do Nível</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Nível {userPoints.level}</span>
                  <span className="text-sm text-gray-500">Nível {userPoints.level + 1}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((userPoints.level * 100 - userPoints.points_to_next_level) / (userPoints.level * 100)) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Faltam {userPoints.points_to_next_level} pontos para o próximo nível
                </p>
              </div>
            )}

            {/* Recent Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conquistas Recentes</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.filter(a => a.is_earned).slice(0, 4).map((achievement) => (
                  <div key={achievement.id} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg mr-4">
                      {getAchievementIcon(achievement.icon)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">+{achievement.points_reward} pontos</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {achievements.filter(a => a.is_earned).length}
                </div>
                <div className="text-sm text-gray-600">Conquistas Desbloqueadas</div>
              </div>
              
              <div className="card text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {achievements.filter(a => !a.is_earned).length}
                </div>
                <div className="text-sm text-gray-600">Conquistas Restantes</div>
              </div>
              
              <div className="card text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  #{leaderboard.find(l => l.is_current_user)?.position || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Posição no Ranking</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Conquistas</h2>
              <div className="text-sm text-gray-600">
                {achievements.filter(a => a.is_earned).length} de {achievements.length} desbloqueadas
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`card transition-all duration-300 ${
                    achievement.is_earned
                      ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      achievement.is_earned
                        ? 'bg-green-200 text-green-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {getAchievementIcon(achievement.icon)}
                    </div>
                    {achievement.is_earned && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Desbloqueada
                      </div>
                    )}
                  </div>

                  <h3 className={`font-semibold mb-2 ${
                    achievement.is_earned ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {achievement.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    achievement.is_earned ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${
                      achievement.is_earned ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      +{achievement.points_reward} pontos
                    </span>
                    {achievement.is_earned ? (
                      <span className="text-green-600 text-xs">
                        {formatDate(achievement.earned_at!)}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        {achievement.progress}/{achievement.condition_value}
                      </span>
                    )}
                  </div>

                  {!achievement.is_earned && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress_percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(achievement.progress_percentage)}% completo
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Ranking de Pontos</h2>
              <select
                value={leaderboardPeriod}
                onChange={(e) => setLeaderboardPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all_time">Todos os Tempos</option>
                <option value="monthly">Este Mês</option>
                <option value="weekly">Esta Semana</option>
              </select>
            </div>

            <div className="card">
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.user_id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      entry.is_current_user
                        ? 'bg-primary-50 border-2 border-primary-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10">
                        {getPositionIcon(entry.position)}
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          entry.is_current_user ? 'text-primary-900' : 'text-gray-900'
                        }`}>
                          {entry.name}
                          {entry.is_current_user && (
                            <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                              Você
                            </span>
                          )}
                        </h3>
                        {entry.level && (
                          <p className="text-sm text-gray-600">Nível {entry.level}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        entry.is_current_user ? 'text-primary-900' : 'text-gray-900'
                      }`}>
                        {entry.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">pontos</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Histórico de Pontos</h2>

            <div className="card">
              <div className="space-y-4">
                {pointHistory.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        entry.points_change > 0
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {entry.reason === 'CHECKIN' && <Zap className="h-5 w-5" />}
                        {entry.reason === 'ACHIEVEMENT' && <Trophy className="h-5 w-5" />}
                        {entry.reason === 'STREAK' && <Calendar className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{entry.description}</h4>
                        <p className="text-sm text-gray-600">
                          {formatDate(entry.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      entry.points_change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.points_change > 0 ? '+' : ''}{entry.points_change}
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

export default Gamification;
