import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { CalendarDays, Clipboard, UserCircle, MapPin } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { authState } = useAuth();
  const user = authState.user;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Patient Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex items-center">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center mr-4">
                      <UserCircle className="h-8 w-8 text-sky-600" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <UserCircle className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Username</p>
                      <p className="text-sm text-gray-600">{user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-sm text-gray-600">
                        {user.address.line1}, {user.address.city}, {user.address.state}, {user.address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
                  <CalendarDays className="h-5 w-5 text-sky-500" />
                </div>
                
                <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
                  <p>You have no upcoming appointments.</p>
                  <button className="mt-2 text-sky-600 font-medium hover:text-sky-800">
                    Schedule an appointment
                  </button>
                </div>
              </div>
            </div>
            
            {/* Medical Records */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Medical Records</h2>
                  <Clipboard className="h-5 w-5 text-sky-500" />
                </div>
                
                <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
                  <p>No medical records available.</p>
                  <button className="mt-2 text-sky-600 font-medium hover:text-sky-800">
                    Upload medical records
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 MedConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PatientDashboard;