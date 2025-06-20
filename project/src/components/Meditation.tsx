import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Clock } from 'lucide-react';

const Meditation: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);

  const breathingExercises = [
    {
      id: '4-7-8',
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8. Great for anxiety and sleep.',
      phases: { inhale: 4, hold: 7, exhale: 8 },
      color: 'blue'
    },
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Equal 4-count breathing. Inhale, hold, exhale, hold for 4 seconds each.',
      phases: { inhale: 4, hold: 4, exhale: 4 },
      color: 'green'
    },
    {
      id: 'calm',
      name: 'Calming Breath',
      description: 'Longer exhale for relaxation. Inhale for 4, exhale for 6.',
      phases: { inhale: 4, hold: 0, exhale: 6 },
      color: 'purple'
    }
  ];

  const currentExercise = breathingExercises.find(ex => ex.id === selectedExercise);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && currentExercise) {
      interval = setInterval(() => {
        setPhaseTime(prev => {
          const phases = currentExercise.phases;
          
          if (currentPhase === 'inhale' && prev >= phases.inhale - 1) {
            setCurrentPhase(phases.hold > 0 ? 'hold' : 'exhale');
            return 0;
          } else if (currentPhase === 'hold' && prev >= phases.hold - 1) {
            setCurrentPhase('exhale');
            return 0;
          } else if (currentPhase === 'exhale' && prev >= phases.exhale - 1) {
            setCycleCount(count => count + 1);
            setCurrentPhase('inhale');
            return 0;
          }
          
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, currentPhase, currentExercise]);

  const handleStart = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setIsActive(true);
    setCurrentPhase('inhale');
    setPhaseTime(0);
    setCycleCount(0);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setPhaseTime(0);
    setCycleCount(0);
    setSelectedExercise(null);
  };

  const getPhaseInstruction = () => {
    if (!currentExercise) return '';
    
    const remaining = currentExercise.phases[currentPhase] - phaseTime;
    
    switch (currentPhase) {
      case 'inhale':
        return `Breathe in... ${remaining}`;
      case 'hold':
        return `Hold... ${remaining}`;
      case 'exhale':
        return `Breathe out... ${remaining}`;
      default:
        return '';
    }
  };

  const getCircleScale = () => {
    if (!currentExercise) return 1;
    
    const progress = phaseTime / currentExercise.phases[currentPhase];
    
    if (currentPhase === 'inhale') {
      return 1 + (progress * 0.5); // Grow from 1 to 1.5
    } else if (currentPhase === 'exhale') {
      return 1.5 - (progress * 0.5); // Shrink from 1.5 to 1
    }
    
    return 1.5; // Hold phase
  };

  if (!selectedExercise) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Breathwork & Meditation</h2>
          <p className="text-gray-600">Choose a breathing exercise to begin your practice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {breathingExercises.map((exercise) => (
            <div key={exercise.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-${exercise.color}-100 flex items-center justify-center mb-3`}>
                  <Wind className={`w-8 h-8 text-${exercise.color}-500`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  {exercise.phases.inhale}s inhale
                  {exercise.phases.hold > 0 && ` • ${exercise.phases.hold}s hold`}
                  • {exercise.phases.exhale}s exhale
                </span>
              </div>

              <button
                onClick={() => handleStart(exercise.id)}
                className={`w-full py-3 px-4 bg-${exercise.color}-500 text-white rounded-lg hover:bg-${exercise.color}-600 focus:outline-none focus:ring-2 focus:ring-${exercise.color}-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2`}
              >
                <Play className="w-4 h-4" />
                <span>Start Practice</span>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Baymax's Guidance</h3>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800">
              "Hello! I am Baymax, your personal healthcare companion. Breathing exercises can help reduce stress, anxiety, and improve your overall well-being. Choose an exercise that feels comfortable for you, and remember - there's no pressure to be perfect. Focus on your breath and let your body relax."
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentExercise?.name}</h2>
        <p className="text-gray-600">Follow the circle and breathing instructions</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          {/* Breathing Circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div 
              className={`w-full h-full rounded-full bg-gradient-to-br from-${currentExercise?.color}-200 to-${currentExercise?.color}-300 border-4 border-${currentExercise?.color}-400 transition-all duration-1000 ease-in-out flex items-center justify-center`}
              style={{ 
                transform: `scale(${getCircleScale()})`,
              }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 capitalize">{currentPhase}</p>
                <p className="text-lg text-gray-600">{currentExercise?.phases[currentPhase] - phaseTime}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <p className="text-xl font-semibold text-gray-900 mb-2">
              {getPhaseInstruction()}
            </p>
            <p className="text-gray-600">Cycle {cycleCount + 1}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePause}
              className={`flex items-center space-x-2 px-6 py-3 bg-${currentExercise?.color}-500 text-white rounded-lg hover:bg-${currentExercise?.color}-600 focus:outline-none focus:ring-2 focus:ring-${currentExercise?.color}-500 focus:ring-offset-2 transition-colors`}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isActive ? 'Pause' : 'Resume'}</span>
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Baymax Encouragement */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-800">
            <strong>Baymax says:</strong> "You are doing great! Remember, breathing exercises become more effective with regular practice. Focus on the rhythm and let your mind settle. I am here to support your wellness journey."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Meditation;