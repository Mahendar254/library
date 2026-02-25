import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Book, FileText, Bookmark, Download, MessageSquare, Filter, Star, Clock, Calendar } from 'lucide-react';
import { useResourceContext } from '../context/ResourceContext';
import './UserPortal.css';

const UserPortal = () => {
    const navigate = useNavigate();
    const { resources, borrowResource } = useResourceContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentUserEmail] = useState('student1@school.edu'); // hardcoded user for prototype

    // Feedback Modal State
    const [selectedResource, setSelectedResource] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(5);

    const handleLogout = () => {
        navigate('/login');
    };

    const categories = ['All', 'Textbook', 'Research Paper', 'Study Guide'];

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' ? true : resource.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'Textbook': return <Book size={18} />;
            case 'Research Paper': return <FileText size={18} />;
            case 'Study Guide': return <Bookmark size={18} />;
            default: return <FileText size={18} />;
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
        alert(`Feedback submitted for ${selectedResource.title}`);
        setSelectedResource(null);
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
                    <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Provide Feedback</h3>
                            <p>for {selectedResource.title}</p>
                        </div>

                        <form onSubmit={submitFeedback} className="feedback-form">
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
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Comments</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
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
                                    Submit Feedback
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
