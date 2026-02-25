import React, { createContext, useState, useContext } from 'react';
import { MOCK_RESOURCES } from '../data/mockData';

const ResourceContext = createContext();

export const useResourceContext = () => {
    return useContext(ResourceContext);
};

export const ResourceProvider = ({ children }) => {
    const [resources, setResources] = useState(MOCK_RESOURCES);

    const addResource = (newResource) => {
        setResources([newResource, ...resources]);
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

    return (
        <ResourceContext.Provider value={{ resources, addResource, borrowResource }}>
            {children}
        </ResourceContext.Provider>
    );
};
