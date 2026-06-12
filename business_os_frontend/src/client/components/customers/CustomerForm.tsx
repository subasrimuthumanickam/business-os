// import React, { useState } from 'react';
// import './CustomerForm.css';

// interface CustomerFormProps {
//   onSubmit: (data: { name: string; email: string; location: string }) => void;
//   onCancel: () => void;
// }

// export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [location, setLocation] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !email) {
//       alert("Name and Email are required fields.");
//       return;
//     }
//     onSubmit({ name, email, location });
//   };

//   return (
//     <div className="form-card">
//       <h3>Register New SaaS Platform Customer</h3>
//       <p className="form-subtitle">Add a brand partner entity entry directly to your isolated workspace cluster database context.</p>
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="cust-name">Full Corporate/Customer Name *</label>
//           <input 
//             id="cust-name"
//             type="text" 
//             placeholder="e.g. Eleanor Pena" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             required 
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="cust-email">Active Communication Email Address *</label>
//           <input 
//             id="cust-email"
//             type="email" 
//             placeholder="customer@domain.com" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="cust-loc">Operational Headquarters / Location</label>
//           <input 
//             id="cust-loc"
//             type="text" 
//             placeholder="e.g. Corona, Michigan" 
//             value={location} 
//             onChange={(e) => setLocation(e.target.value)} 
//           />
//         </div>

//         <div className="form-actions-row">
//           <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
//           <button type="submit" className="btn-primary">Save Profile Context</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CustomerForm;
import React, { useState, useEffect } from 'react';
import './CustomerForm.css';

interface CustomerFormProps {
  onSubmit: (data: { name: string; email: string; location: string }) => void;
  onCancel: () => void;
  initialData?: { name: string; email: string; location: string };
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  // Pre-populate fields automatically if editing mode is active
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setLocation(initialData.location);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email, location });
  };

  return (
    <div className="form-card">
      <h3>{initialData ? 'Update Customer Profile' : 'Register New SaaS Platform Customer'}</h3>
      <p className="form-subtitle">Modify configurations or add custom brand enterprise metrics inside your system terminal profile context.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cust-name">Full Customer Name *</label>
          <input 
            id="cust-name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="cust-email">Communication Email Address *</label>
          <input 
            id="cust-email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="cust-loc">Operational Location</label>
          <input 
            id="cust-loc"
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
        </div>

        <div className="form-actions-row">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">{initialData ? 'Save Changes' : 'Save Profile Context'}</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;