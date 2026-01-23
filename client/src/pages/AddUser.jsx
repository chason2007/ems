import { useState } from 'react';
import axios from 'axios';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [position, setPosition] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/auth/register', {
                name,
                email,
                password,
                role,
                position
            });
            alert('User Created Successfully!');
            // Reset Form (Don't navigate away)
            setName('');
            setEmail('');
            setPassword('');
            setRole('Employee');
            setPosition('');
        } catch (err) {
            console.error(err);
            alert(err.response?.data || 'Failed to create user');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-8">Add Employee</h1>
            <div className="card">
                <h3 className="mb-4">New User Details</h3>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="john@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Position</label>
                            <input
                                type="text"
                                placeholder="Manager, Lead..."
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Role</label>
                            <div style={{ display: 'flex', gap: '1rem', height: '46px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Employee"
                                        checked={role === 'Employee'}
                                        onChange={(e) => setRole(e.target.value)}
                                        style={{ width: '1.2rem', height: '1.2rem', margin: 0 }}
                                    />
                                    Employee
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Admin"
                                        checked={role === 'Admin'}
                                        onChange={(e) => setRole(e.target.value)}
                                        style={{ width: '1.2rem', height: '1.2rem', margin: 0 }}
                                    />
                                    <span style={{ color: 'var(--pk-primary)', fontWeight: '500' }}>Admin</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Default Password</label>
                        <input
                            type="text"
                            placeholder="Secret123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
