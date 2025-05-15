import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, UserCog } from 'lucide-react';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-sky-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MedConnect</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MedConnect</h1>
            <p className="text-lg text-gray-600">Connecting patients and doctors for better healthcare</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-sky-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">For Patients</h2>
                <p className="text-gray-600 mb-6">
                  Create your patient account to access personalized healthcare services and connect with doctors.
                </p>
                <Button 
                  onClick={() => {
                    navigate('/signup', { state: { userType: 'patient' } });
                  }} 
                  fullWidth
                >
                  Join as Patient
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <UserCog className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">For Doctors</h2>
                <p className="text-gray-600 mb-6">
                  Register as a doctor to manage your practice, connect with patients, and provide care efficiently.
                </p>
                <Button 
                  variant="secondary"
                  onClick={() => {
                    navigate('/signup', { state: { userType: 'doctor' } });
                  }} 
                  fullWidth
                >
                  Join as Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 MedConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;