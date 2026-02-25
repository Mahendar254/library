import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Upload, Book, FileText, Bookmark, Search, Users, Settings, Clock, Calendar, User } from 'lucide-react';
import { useResourceContext } from '../context/ResourceContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { resources, addResource } = useResourceContext();
    const [activeTab, setActiveTab] = useState('resources'); // resources, upload, users

    // Upload State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Textbook');

    const handleLogout = () => {
        navigate('/login');
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const newResource = {
            id: resources.length + 1,
            title,
            description,
            category,
            uploadDate: new Date().toISOString().split('T')[0],
            author: 'Admin User',
            downloads: 0,
            status: 'Available',
            feedback: []
        };

        addResource(newResource);

        // Reset form
        setTitle('');
        setDescription('');
        setCategory('Textbook');
        setActiveTab('resources');
        alert('Resource updated successfully!');
    };

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'Textbook': return <Book size={18} />;
            case 'Research Paper': return <FileText size={18} />;
            case 'Study Guide': return <Bookmark size={18} />;
            default: return <FileText size={18} />;
        }
    };

    const borrowedResources = resources.filter(res => res.status === 'Borrowed');

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'resources' ? 'active' : ''}`}
                        onClick={() => setActiveTab('resources')}
                    >
                        <Book size={20} />
                        <span>Manage Resources</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upload')}
                    >
                        <Upload size={20} />
                        <span>Upload New</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'borrowed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('borrowed')}
                    >
                        <Clock size={20} />
                        <span>Borrowed Books</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <Users size={20} />
                        <span>Manage Users</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="content-header">
                    <h1>
                        {activeTab === 'resources' ? 'Resource Library' :
                            activeTab === 'upload' ? 'Upload Resource' :
                                activeTab === 'borrowed' ? 'Borrowed Books' : 'User Management'}
                    </h1>
                    <div className="header-actions">
                        <div className="search-bar">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Search..." className="search-input" />
                        </div>
                        <div className="admin-profile">
                            <span className="profile-initial">A</span>
                        </div>
                    </div>
                </header>

                <div className="content-body animate-fade-in">
                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="resources-grid">
                            {resources.map(resource => (
                                <div key={resource.id} className="resource-card card">
                                    <div className="resource-category">
                                        {getCategoryIcon(resource.category)}
                                        <span>{resource.category}</span>
                                    </div>
                                    <h3 className="resource-title">{resource.title}</h3>
                                    <p className="resource-desc">{resource.description}</p>
                                    <div className="resource-meta">
                                        <span className="date">Uploaded: {resource.uploadDate}</span>
                                        <span className="downloads">{resource.downloads} Downloads</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn btn-outline btn-sm">Edit</button>
                                        <button className="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upload Tab */}
                    {activeTab === 'upload' && (
                        <div className="upload-container card">
                            <form onSubmit={handleUpload} className="upload-form">
                                <div className="input-group">
                                    <label className="input-label" htmlFor="title">Resource Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="input-field"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label" htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        className="input-field"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="Textbook">Textbook</option>
                                        <option value="Research Paper">Research Paper</option>
                                        <option value="Study Guide">Study Guide</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label className="input-label" htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        className="input-field"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="upload-box">
                                    <Upload size={32} color="var(--text-muted)" />
                                    <p>Drag and drop a file here, or click to browse</p>
                                    <span className="upload-hint">Simulated upload (no actual file needed)</span>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg mt-4 w-full">
                                    Publish Resource
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Borrowed Books Tab */}
                    {activeTab === 'borrowed' && (
                        <div className="borrowed-view">
                            {borrowedResources.length > 0 ? (
                                <div className="borrowed-list">
                                    {borrowedResources.map(resource => (
                                        <div key={resource.id} className="borrowed-item card">
                                            <div className="borrowed-item-header">
                                                <div className="borrowed-title">
                                                    {getCategoryIcon(resource.category)}
                                                    <h3>{resource.title}</h3>
                                                </div>
                                                <span className="status-badge borrowed">Borrowed</span>
                                            </div>

                                            <div className="borrowed-item-details">
                                                <div className="detail-row">
                                                    <User size={16} className="detail-icon" />
                                                    <span><strong>User:</strong> {resource.borrowedBy || 'Unknown User'}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <Clock size={16} className="detail-icon" />
                                                    <span><strong>Borrowed At:</strong> {resource.borrowedAt ? new Date(resource.borrowedAt).toLocaleString() : 'N/A'}</span>
                                                </div>
                                                <div className="detail-row text-warning">
                                                    <Calendar size={16} className="detail-icon" />
                                                    <span><strong>Expires At:</strong> {resource.expiresAt ? new Date(resource.expiresAt).toLocaleString() : 'N/A'}</span>
                                                </div>
                                            </div>

                                            <div className="borrowed-item-actions">
                                                <button className="btn btn-sm btn-outline">Notify User</button>
                                                <button className="btn btn-sm btn-primary">Revoke Access</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state card">
                                    <Clock size={48} color="var(--text-muted)" className="mb-4 opacity-50 mx-auto" />
                                    <h2>No borrowed books</h2>
                                    <p className="text-muted">Currently, no students have borrowed any resources.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Users Tab (Mock) */}
                    {activeTab === 'users' && (
                        <div className="users-placeholder card">
                            <Users size={48} color="var(--primary)" className="mb-4 opacity-50" />
                            <h2>User Management</h2>
                            <p className="text-muted">This feature allows admins to restrict or grant access to specific students and educators.</p>
                            <div className="mock-users-list">
                                <div className="user-row">
                                    <span>student1@school.edu</span>
                                    <span className="role-badge role-user">Student</span>
                                    <button className="btn btn-sm btn-outline">Revoke Access</button>
                                </div>
                                <div className="user-row">
                                    <span>prof.smith@school.edu</span>
                                    <span className="role-badge role-educator">Educator</span>
                                    <button className="btn btn-sm btn-outline">Revoke Access</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
