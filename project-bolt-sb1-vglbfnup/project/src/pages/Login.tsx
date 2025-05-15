import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { UserType } from '../types';

interface LoginFormState {
  email: string;
  password: string;
  userType: UserType;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    userType: 'patient'
  });
  
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleUserTypeChange = (userType: UserType) => {
    setFormState(prev => ({
      ...prev,
      userType
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formState.email || !formState.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock user data - in a real app this would come from the backend
      const mockUser = {
        firstName: formState.userType === 'doctor' ? 'Dr. Jane' : 'John',
        lastName: 'Doe',
        profilePicture: '',
        username: formState.email.split('@')[0],
        email: formState.email,
        address: {
          line1: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          pincode: '62704'
        },
        userType: formState.userType
      };
      
      // Login successful
      login(mockUser);
      
      // Navigate to respective dashboard
      const dashboardRoute = formState.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard';
      navigate(dashboardRoute);
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-sky-500" />
            <span className="ml-2 text-xl font-semibold text-gray-900">MedConnect</span>
          </div>
          <Link to="/" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Login to your account</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I am a:
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange('patient')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  formState.userType === 'patient'
                    ? 'bg-sky-100 text-sky-800 border-2 border-sky-500'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                } flex items-center justify-center transition-all`}
              >
                Patient
              </button>
              
              <button
                type="button"
                onClick={() => handleUserTypeChange('doctor')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  formState.userType === 'doctor'
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                } flex items-center justify-center transition-all`}
              >
                Doctor
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            
            <FormField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            
            <div className="flex items-center justify-between mt-4 mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              variant={formState.userType === 'doctor' ? 'secondary' : 'primary'}
            >
              Sign in
            </Button>
            
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                state={{ userType: formState.userType }}
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;