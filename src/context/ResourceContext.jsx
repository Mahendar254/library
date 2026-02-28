import React, { createContext, useState, useContext } from 'react';
import { MOCK_RESOURCES } from '../data/mockData';

const ResourceContext = createContext();

export const useResourceContext = () => {
    return useContext(ResourceContext);
};

export const ResourceProvider = ({ children }) => {
    const [resources, setResources] = useState(MOCK_RESOURCES);
    const [complaints, setComplaints] = useState([]);

    const addResource = (newResource) => {
        setResources([newResource, ...resources]);
    };

    const addComplaint = (complaint) => {
        setComplaints([
            { id: Date.now(), ...complaint, status: 'Open', date: new Date().toISOString() },
            ...complaints
        ]);
    };

    const resolveComplaint = (id) => {
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
    };

    const borrowResource = (resourceId, userEmail) => {
        const now = new Date();
        const expires = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days from now

        setResources(resources.map(res => {
            if (res.id === resourceId) {
                return {
                    ...res,
                    status: 'Borrowed',
                    borrowedBy: userEmail,
                    borrowedAt: now.toISOString(),
                    expiresAt: expires.toISOString()
                };
            }
            return res;
        }));
    };

    const updateReadingProgress = (resourceId, userEmail, page) => {
        setResources(resources.map(res => {
            if (res.id === resourceId) {
                const userProgress = res.userProgress || {};
                return {
                    ...res,
                    userProgress: {
                        ...userProgress,
                        [userEmail]: {
                            lastPage: page,
                            lastReadAt: new Date().toISOString()
                        }
                    }
                };
            }
            return res;
        }));
    };

    const addFeedback = (resourceId, feedbackObj) => {
        setResources(resources.map(res => {
            if (res.id === resourceId) {
                const currentFeedback = res.feedback || [];
                return {
                    ...res,
                    feedback: [
                        { ...feedbackObj, id: Date.now(), date: new Date().toISOString() },
                        ...currentFeedback
                    ]
                };
            }
            return res;
        }));
    };

    return (
        <ResourceContext.Provider value={{
            resources,
            addResource,
            borrowResource,
            updateReadingProgress,
            addFeedback,
            complaints,
            addComplaint,
            resolveComplaint
        }}>
            {children}
        </ResourceContext.Provider>
    );
};
