import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<any>({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      await register(name, email, password, passwordConfirmation);
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: ['Registration failed. Please try again.'] });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-card">
          <h2>Create an Account</h2>
          <p className="auth-subtitle">Join us and start organizing your work</p>
          
          {errors.general && (
            <div className="error-message">
              {errors.general.map((err: string, index: number) => (
                <span key={index} className="error-text">{err}</span>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-text">{errors.name[0]}</span>}
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-text">{errors.email[0]}</span>}
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Create a password"
              />
              {errors.password && <span className="error-text">{errors.password[0]}</span>}
            </div>
            
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                value={passwordConfirmation} 
                onChange={(e) => setPasswordConfirmation(e.target.value)} 
                required 
                placeholder="Confirm your password"
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </form>
          
          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div style={{ zIndex: 10 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Join KnoVista</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>Experience seamless task management tailored for teams.</p>
        </div>
        {/* Background decorative circles */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
      </div>
    </div>
  );
};

export default Register;
