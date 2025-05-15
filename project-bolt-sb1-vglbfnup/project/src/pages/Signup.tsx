import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Activity, ArrowLeft, Check } from 'lucide-react';
import FormField from '../components/FormField';
import Button from '../components/Button';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import { useAuth } from '../contexts/AuthContext';
import { UserType } from '../types';

interface SignupFormState {
  firstName: string;
  lastName: string;
  profilePicture: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  userType: UserType;
}

interface FormErrors {
  [key: string]: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  // Get userType from location state if available
  const initialUserType = location.state?.userType || 'patient';

  const [formState, setFormState] = useState<SignupFormState>({
    firstName: '',
    lastName: '',
    profilePicture: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    userType: initialUserType,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form state when userType changes from props
  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      userType: initialUserType,
    }));
  }, [initialUserType]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate each field
    if (!formState.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formState.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formState.username.trim()) newErrors.username = 'Username is required';
    
    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formState.password) {
      newErrors.password = 'Password is required';
    } else if (formState.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Address validation
    if (!formState.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formState.city.trim()) newErrors.city = 'City is required';
    if (!formState.state.trim()) newErrors.state = 'State is required';
    if (!formState.pincode.trim()) newErrors.pincode = 'Pincode is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleProfilePictureChange = (imageUrl: string) => {
    setFormState(prev => ({
      ...prev,
      profilePicture: imageUrl
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Create user object from form state
      const user = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        profilePicture: formState.profilePicture,
        username: formState.username,
        email: formState.email,
        address: {
          line1: formState.addressLine1,
          city: formState.city,
          state: formState.state,
          pincode: formState.pincode
        },
        userType: formState.userType
      };
      
      // Register user
      register(user);
      
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
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h1>
          
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange('patient')}
                className={`flex-1 py-3 px-4 rounded-md ${
                  formState.userType === 'patient'
                    ? 'bg-sky-100 text-sky-800 border-2 border-sky-500'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                } flex items-center justify-center transition-all`}
              >
                {formState.userType === 'patient' && <Check className="h-4 w-4 mr-2" />}
                Patient
              </button>
              
              <button
                type="button"
                onClick={() => handleUserTypeChange('doctor')}
                className={`flex-1 py-3 px-4 rounded-md ${
                  formState.userType === 'doctor'
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                } flex items-center justify-center transition-all`}
              >
                {formState.userType === 'doctor' && <Check className="h-4 w-4 mr-2" />}
                Doctor
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <FormField
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
                value={formState.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
              
              <FormField
                label="Last Name"
                id="lastName"
                name="lastName"
                type="text"
                value={formState.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>
            
            <ProfilePictureUpload 
              onImageChange={handleProfilePictureChange}
              error={errors.profilePicture}
            />
            
            <FormField
              label="Username"
              id="username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
              error={errors.username}
              required
            />
            
            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <FormField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              
              <FormField
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formState.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Address</h3>
              
              <FormField
                label="Address Line 1"
                id="addressLine1"
                name="addressLine1"
                type="text"
                value={formState.addressLine1}
                onChange={handleChange}
                error={errors.addressLine1}
                required
              />
              
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  label="City"
                  id="city"
                  name="city"
                  type="text"
                  value={formState.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
                />
                
                <FormField
                  label="State"
                  id="state"
                  name="state"
                  type="text"
                  value={formState.state}
                  onChange={handleChange}
                  error={errors.state}
                  required
                />
              </div>
              
              <FormField
                label="Pincode"
                id="pincode"
                name="pincode"
                type="text"
                value={formState.pincode}
                onChange={handleChange}
                error={errors.pincode}
                required
              />
            </div>
            
            <div className="mt-8">
              <Button
                type="submit"
                fullWidth
                isLoading={isSubmitting}
                variant={formState.userType === 'doctor' ? 'secondary' : 'primary'}
              >
                Create Account
              </Button>
              
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;