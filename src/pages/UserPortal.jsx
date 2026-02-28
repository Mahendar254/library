import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Book, FileText, Bookmark, Download, MessageSquare, Filter, Star, Clock, Calendar, BookOpen, Play, X, AlertTriangle, Calculator, Monitor, Zap, Compass, Globe, Settings } from 'lucide-react';
import { useResourceContext } from '../context/ResourceContext';
import './UserPortal.css';

const UserPortal = () => {
    const navigate = useNavigate();
    const { resources, borrowResource, updateReadingProgress, addComplaint, addFeedback } = useResourceContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentUserEmail] = useState('student1@school.edu'); // hardcoded user for prototype

    // Reading Modal State
    const [readingResource, setReadingResource] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Feedback Modal State
    const [selectedResource, setSelectedResource] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(5);

    // Complaint Modal State
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
    const [complaintResource, setComplaintResource] = useState(null);
    const [complaintType, setComplaintType] = useState('General Issue');
    const [complaintDescription, setComplaintDescription] = useState('');

    const handleLogout = () => {
        navigate('/login');
    };

    const categories = ['All', 'Mathematics', 'Computer Science', 'Physics', 'Mechanical Engineering', 'Electronics', 'History'];

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' ? true : resource.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

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

    const handleDownload = (resourceTitle) => {
        alert(`Downloading: ${resourceTitle}`);
        // Simulated increment downloads 
    };

    const handleBorrow = (resource) => {
        borrowResource(resource.id, currentUserEmail);
        alert(`Successfully borrowed: ${resource.title}`);
    };

    const openFeedback = (resource) => {
        setSelectedResource(resource);
        setFeedbackText('');
        setRating(5);
    };

    const submitFeedback = (e) => {
        e.preventDefault();
        if (selectedResource) {
            addFeedback(selectedResource.id, {
                userEmail: currentUserEmail,
                rating,
                comment: feedbackText
            });
            alert(`Feedback submitted for ${selectedResource.title}`);
        }
        setSelectedResource(null);
    };

    const recentlyRead = resources
        .filter(res => res.userProgress && res.userProgress[currentUserEmail])
        .sort((a, b) => {
            const dateA = new Date(a.userProgress[currentUserEmail].lastReadAt);
            const dateB = new Date(b.userProgress[currentUserEmail].lastReadAt);
            return dateB - dateA;
        });

    const openReader = (resource) => {
        setReadingResource(resource);
        const progress = resource.userProgress?.[currentUserEmail];
        setCurrentPage(progress ? progress.lastPage : 1);
    };

    const saveAndCloseReader = () => {
        if (readingResource) {
            updateReadingProgress(readingResource.id, currentUserEmail, currentPage);
            setReadingResource(null);
        }
    };

    const openComplaint = (resource = null) => {
        setComplaintResource(resource);
        setComplaintType(resource ? 'Book Issue' : 'General Issue');
        setComplaintDescription('');
        setIsComplaintModalOpen(true);
    };

    const submitComplaint = (e) => {
        e.preventDefault();
        addComplaint({
            userEmail: currentUserEmail,
            type: complaintType,
            description: complaintDescription,
            resourceId: complaintResource ? complaintResource.id : null,
            resourceTitle: complaintResource ? complaintResource.title : 'N/A'
        });
        alert('Complaint submitted successfully. An administrator will review it shortly.');
        setIsComplaintModalOpen(false);
        setComplaintResource(null);
    };

    return (
        <div className="portal-container">
            {/* Top Navigation */}
            <nav className="portal-nav">
                <div className="nav-brand">
                    <div className="logo-small">
                        <Book size={24} color="var(--primary)" />
                    </div>
                    <h2>EdLibrary</h2>
                </div>

                <div className="nav-search">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search resources, topics, authors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="nav-actions">
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={() => openComplaint()}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    >
                        <AlertTriangle size={14} />
                        Support / Report Issue
                    </button>
                    <div className="user-profile">
                        <span className="profile-initial student-initial">S</span>
                        <span className="user-email">student@school.edu</span>
                    </div>
                    <button className="btn btn-outline btn-icon" onClick={handleLogout} title="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </nav>

            <main className="portal-main">
                {/* Hero Section */}
                <section className="portal-hero animate-fade-in">
                    <h1>Welcome back, Student!</h1>
                    <p>Discover educational resources curated for your academic journey.</p>
                </section>

                {/* History Section */}
                {recentlyRead.length > 0 && (
                    <section className="history-section animate-fade-in">
                        <div className="section-header">
                            <h2><Clock size={20} /> Continue Reading</h2>
                        </div>
                        <div className="history-cards">
                            {recentlyRead.map(resource => (
                                <div key={resource.id} className="history-card card hover-scale" onClick={() => openReader(resource)}>
                                    <div className="history-icon">
                                        {getCategoryIcon(resource.category)}
                                    </div>
                                    <div className="history-content">
                                        <h4>{resource.title}</h4>
                                        <p className="text-muted text-sm">Last read: {new Date(resource.userProgress[currentUserEmail].lastReadAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="history-progress">
                                        <span className="page-badge">Page {resource.userProgress[currentUserEmail].lastPage}</span>
                                        <button className="btn btn-icon btn-primary btn-sm rounded-full"><Play size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Filters */}
                <div className="filters-bar">
                    <div className="filter-title">
                        <Filter size={18} />
                        <span>Categories:</span>
                    </div>
                    <div className="category-pills">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat !== 'All' && getCategoryIcon(cat)}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resource Grid */}
                <div className="resources-grid portal-grid">
                    {filteredResources.length > 0 ? (
                        filteredResources.map(resource => (
                            <div key={resource.id} className="resource-card card hover-scale">
                                <div className="resource-category">
                                    {getCategoryIcon(resource.category)}
                                    <span>{resource.category}</span>
                                    {resource.status && (
                                        <span className={`status-badge ${resource.status.toLowerCase()}`}>
                                            {resource.status}
                                        </span>
                                    )}
                                </div>

                                <h3 className="resource-title">{resource.title}</h3>
                                <p className="resource-desc">{resource.description}</p>

                                {resource.status === 'Borrowed' && resource.borrowedAt && resource.expiresAt && (
                                    <div className="borrowing-info">
                                        <div className="info-row">
                                            <Clock size={14} className="info-icon" />
                                            <span><strong>Borrowed:</strong> {new Date(resource.borrowedAt).toLocaleString()}</span>
                                        </div>
                                        <div className="info-row text-warning">
                                            <Calendar size={14} className="info-icon" />
                                            <span><strong>Expires:</strong> {new Date(resource.expiresAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="resource-footer">
                                    <div className="author-info">By {resource.author}</div>
                                    <div className="user-actions">
                                        {resource.status === 'Available' && (
                                            <button
                                                className="action-btn borrow-btn"
                                                onClick={() => handleBorrow(resource)}
                                                title="Borrow Resource"
                                            >
                                                <Bookmark size={18} />
                                                <span>Borrow</span>
                                            </button>
                                        )}
                                        <button
                                            className="action-btn read-btn"
                                            onClick={() => openReader(resource)}
                                            title="Read Resource"
                                        >
                                            <BookOpen size={18} />
                                            <span>Read</span>
                                        </button>
                                        <button
                                            className="action-btn download-btn"
                                            onClick={() => handleDownload(resource.title)}
                                            title="Download Resource"
                                        >
                                            <Download size={18} />
                                            <span>Download</span>
                                        </button>
                                        <button
                                            className="action-btn feedback-btn"
                                            onClick={() => openFeedback(resource)}
                                            title="Provide Feedback"
                                        >
                                            <MessageSquare size={18} />
                                        </button>
                                        <button
                                            className="action-btn alert-btn"
                                            onClick={() => openComplaint(resource)}
                                            title="Report Issue"
                                            style={{ color: 'var(--accent)', backgroundColor: 'rgba(244, 63, 94, 0.1)' }}
                                        >
                                            <AlertTriangle size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <Search size={48} color="var(--text-muted)" />
                            <h3>No resources found</h3>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Feedback Modal */}
            {selectedResource && (
                <div className="modal-overlay" onClick={() => setSelectedResource(null)}>
                    <div className="modal-content card" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-header">
                            <div>
                                <h3>Feedback & Reviews</h3>
                                <p>for {selectedResource.title}</p>
                            </div>
                            <button className="btn btn-icon btn-outline" onClick={() => setSelectedResource(null)}><X size={20} /></button>
                        </div>

                        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem', marginBottom: '1rem' }}>
                            {selectedResource.feedback && selectedResource.feedback.length > 0 ? (
                                <div className="feedback-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                    {selectedResource.feedback.map(fb => (
                                        <div key={fb.id} className="feedback-item" style={{ backgroundColor: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <div className="star-rating" style={{ display: 'flex', gap: '2px' }}>
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <Star
                                                            key={star}
                                                            size={14}
                                                            color={star <= fb.rating ? "#F59E0B" : "var(--border)"}
                                                            fill={star <= fb.rating ? "#F59E0B" : "none"}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-muted text-sm">{new Date(fb.date).toLocaleDateString()}</span>
                                            </div>
                                            <p style={{ margin: '0 0 0.5rem', fontSize: '0.95rem' }}>{fb.comment}</p>
                                            <p className="text-muted text-sm" style={{ margin: 0 }}>By: {fb.userEmail}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                                    <MessageSquare size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                                    <p>No reviews yet. Be the first to share your thoughts!</p>
                                </div>
                            )}
                        </div>

                        <form onSubmit={submitFeedback} className="feedback-form" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Leave a Review</h4>
                            <div className="input-group">
                                <label className="input-label">Rating</label>
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={24}
                                            color={star <= rating ? "#F59E0B" : "var(--border)"}
                                            fill={star <= rating ? "#F59E0B" : "none"}
                                            onClick={() => setRating(star)}
                                            className="star-icon"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Comments</label>
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    placeholder="How was this resource helpful? Any suggestions for improvement?"
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setSelectedResource(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reading Modal */}
            {readingResource && (
                <div className="modal-overlay" onClick={saveAndCloseReader}>
                    <div className="modal-content reader-modal card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h3>{readingResource.title}</h3>
                                <p className="text-muted text-sm">Reading View</p>
                            </div>
                            <button className="btn btn-icon btn-outline" onClick={saveAndCloseReader}><X size={20} /></button>
                        </div>
                        <div className="reader-body">
                            <div className="reader-placeholder">
                                <BookOpen size={64} className="mb-4 text-muted mx-auto" style={{ opacity: 0.2 }} />
                                <h3>Reading Content</h3>
                                <p className="text-muted">In a real application, the PDF or e-reader component would be initialized here and render page content.</p>
                            </div>
                        </div>
                        <div className="reader-footer">
                            <div className="page-controls">
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage <= 1}
                                >
                                    Previous
                                </button>
                                <div className="page-indicator">
                                    <span className="text-muted text-sm mr-2">Page</span>
                                    <input
                                        type="number"
                                        className="input-field page-input"
                                        value={currentPage}
                                        onChange={(e) => setCurrentPage(Number(e.target.value) || 1)}
                                        min="1"
                                    />
                                </div>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                            <button className="btn btn-primary" onClick={saveAndCloseReader}>Save Bookmark & Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Complaint Modal */}
            {isComplaintModalOpen && (
                <div className="modal-overlay" onClick={() => setIsComplaintModalOpen(false)}>
                    <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                                    <AlertTriangle size={20} /> Report an Issue
                                </h3>
                                {complaintResource && <p className="text-muted">Regarding: {complaintResource.title}</p>}
                            </div>
                            <button className="btn btn-icon btn-outline" onClick={() => setIsComplaintModalOpen(false)}><X size={20} /></button>
                        </div>

                        <form onSubmit={submitComplaint} className="feedback-form" style={{ marginTop: '1rem' }}>
                            <div className="input-group">
                                <label className="input-label">Issue Type</label>
                                <select
                                    className="input-field"
                                    value={complaintType}
                                    onChange={(e) => setComplaintType(e.target.value)}
                                    style={{ appearance: 'auto' }}
                                >
                                    <option value="General Issue">General Issue</option>
                                    <option value="Book Not Opening">Book Not Opening</option>
                                    <option value="Missing Resource">Missing Resource</option>
                                    <option value="Incorrect Content">Incorrect Content</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Description</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
                                    placeholder="Please describe the issue in detail..."
                                    value={complaintDescription}
                                    onChange={(e) => setComplaintDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setIsComplaintModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
                                    Submit Complaint
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPortal;
