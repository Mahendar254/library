import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Upload, Book, FileText, Bookmark, Search, Users, Settings, Clock, Calendar, User, AlertTriangle, CheckCircle, MessageSquare, Star, X, Calculator, Monitor, Zap, Compass, Globe } from 'lucide-react';
import { useResourceContext } from '../context/ResourceContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { resources, addResource, complaints, resolveComplaint } = useResourceContext();
    const [activeTab, setActiveTab] = useState('resources'); // resources, upload, borrowed, users, complaints

    // Upload State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Computer Science');

    // Admin Feedback Modal State
    const [viewingFeedbackFor, setViewingFeedbackFor] = useState(null);

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
            case 'Mathematics': return <Calculator size={18} />;
            case 'Computer Science': return <Monitor size={18} />;
            case 'Physics': return <Compass size={18} />;
            case 'Mechanical Engineering': return <Settings size={18} />;
            case 'Electronics': return <Zap size={18} />;
            case 'History': return <Globe size={18} />;
            default: return <Book size={18} />;
        }
    };

    const borrowedResources = resources.filter(res => res.status === 'Borrowed');

    const openComplaintsBadge = complaints.filter(c => c.status === 'Open').length;

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
                    <button
                        className={`nav-item ${activeTab === 'complaints' ? 'active' : ''}`}
                        onClick={() => setActiveTab('complaints')}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <AlertTriangle size={20} color={openComplaintsBadge > 0 ? 'var(--accent)' : 'currentColor'} />
                            <span>Complaints</span>
                        </div>
                        {openComplaintsBadge > 0 && (
                            <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '1rem', fontSize: '0.75rem' }}>
                                {openComplaintsBadge}
                            </span>
                        )}
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
                                activeTab === 'borrowed' ? 'Borrowed Books' :
                                    activeTab === 'complaints' ? 'User Complaints' : 'User Management'}
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
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => setViewingFeedbackFor(resource)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                        >
                                            <MessageSquare size={14} /> View Feedback ({resource.feedback ? resource.feedback.length : 0})
                                        </button>
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
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="History">History</option>
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

                    {/* Complaints Tab */}
                    {activeTab === 'complaints' && (
                        <div className="complaints-view">
                            {complaints.length > 0 ? (
                                <div className="complaints-list">
                                    {complaints.map(complaint => (
                                        <div key={complaint.id} className={`complaint-card card ${complaint.status === 'Open' ? 'border-l-accent border-l-4' : ''}`} style={{ borderLeft: complaint.status === 'Open' ? '4px solid var(--accent)' : '1px solid var(--border)' }}>
                                            <div className="complaint-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                        <span className={`status-badge ${complaint.status === 'Open' ? 'error' : 'success'}`} style={{ backgroundColor: complaint.status === 'Open' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: complaint.status === 'Open' ? 'var(--accent)' : 'var(--secondary)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                            {complaint.status}
                                                        </span>
                                                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{complaint.type}</h3>
                                                    </div>
                                                    <p className="text-muted text-sm" style={{ margin: 0 }}>From: {complaint.userEmail} • {new Date(complaint.date).toLocaleString()}</p>
                                                    {complaint.resourceTitle !== 'N/A' && (
                                                        <p className="text-sm" style={{ margin: '0.25rem 0 0', fontWeight: '500' }}>Resource: {complaint.resourceTitle}</p>
                                                    )}
                                                </div>
                                                {complaint.status === 'Open' && (
                                                    <button
                                                        className="btn btn-sm btn-outline"
                                                        onClick={() => resolveComplaint(complaint.id)}
                                                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}
                                                    >
                                                        <CheckCircle size={14} /> Mark Resolved
                                                    </button>
                                                )}
                                            </div>
                                            <div className="complaint-body" style={{ backgroundColor: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{complaint.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                    <AlertTriangle size={48} color="var(--text-muted)" className="mb-4 opacity-50 mx-auto" style={{ display: 'block', margin: '0 auto 1rem' }} />
                                    <h2>No complaints</h2>
                                    <p className="text-muted">There are zero user complaints at this time. All good!</p>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </main>

            {/* Admin Feedback Modal */}
            {viewingFeedbackFor && (
                <div className="modal-overlay" onClick={() => setViewingFeedbackFor(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="modal-content card" onClick={(e) => e.stopPropagation()} style={{ width: '90%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.25rem' }}>Feedback & Reviews</h3>
                                <p className="text-muted" style={{ margin: 0 }}>for {viewingFeedbackFor.title}</p>
                            </div>
                            <button className="btn btn-icon btn-outline" onClick={() => setViewingFeedbackFor(null)}><X size={20} /></button>
                        </div>

                        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
                            {viewingFeedbackFor.feedback && viewingFeedbackFor.feedback.length > 0 ? (
                                <div className="feedback-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {viewingFeedbackFor.feedback.map(fb => (
                                        <div key={fb.id} className="feedback-item" style={{ backgroundColor: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                                <div className="star-rating" style={{ display: 'flex', gap: '2px' }}>
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <Star
                                                            key={star}
                                                            size={16}
                                                            color={star <= fb.rating ? "#F59E0B" : "var(--border)"}
                                                            fill={star <= fb.rating ? "#F59E0B" : "none"}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-muted text-sm" style={{ fontWeight: '500' }}>{new Date(fb.date).toLocaleDateString()}</span>
                                            </div>
                                            <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', lineHeight: '1.5' }}>"{fb.comment}"</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                                <User size={14} />
                                                <span style={{ fontSize: '0.85rem' }}>{fb.userEmail}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                                    <MessageSquare size={48} style={{ opacity: 0.3, marginBottom: '1rem', display: 'inline-block' }} />
                                    <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-main)' }}>No Feedback Yet</h3>
                                    <p style={{ margin: 0 }}>There are no reviews for this resource so far.</p>
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: '1.5rem', textAlign: 'right', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                            <button className="btn btn-outline" onClick={() => setViewingFeedbackFor(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
