
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, initialPortfolioData } from '../data/portfolioData';

interface AdminContextType {
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    data: PortfolioData;
    setData: (data: PortfolioData) => void;
    resetData: () => void;
    exportData: () => string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [data, setDataState] = useState<PortfolioData>(() => {
        const savedData = localStorage.getItem('portfolio_data');
        return savedData ? JSON.parse(savedData) : initialPortfolioData;
    });

    const setData = (newData: PortfolioData) => {
        setDataState(newData);
        localStorage.setItem('portfolio_data', JSON.stringify(newData));
    };

    const resetData = () => {
        setDataState(initialPortfolioData);
        localStorage.removeItem('portfolio_data');
    };

    const exportData = () => {
        return JSON.stringify(data, null, 2);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin, data, setData, resetData, exportData }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
