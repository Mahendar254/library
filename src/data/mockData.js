export const MOCK_RESOURCES = [
    {
        id: 1,
        title: 'Introduction to Algorithms',
        description: 'A comprehensive guide to modern algorithms.',
        category: 'Textbook',
        uploadDate: '2023-10-01',
        author: 'Admin User',
        downloads: 145,
        status: 'Borrowed',
        borrowedBy: 'student1@school.edu',
        borrowedAt: '2026-02-23T10:30:00',
        expiresAt: '2026-03-09T10:30:00',
        feedback: [
            { id: 101, user: 'student1@school.edu', comment: 'Great resource for my data structures class!', rating: 5 }
        ]
    },
    {
        id: 2,
        title: 'Quantum Computing Fundamentals',
        description: 'Research paper detailing recent advancements in quantum error correction.',
        category: 'Research Paper',
        uploadDate: '2023-11-15',
        author: 'Dr. Smith',
        downloads: 87,
        status: 'Available',
        feedback: []
    },
    {
        id: 3,
        title: 'Calculus III Study Guide',
        description: 'Midterm preparation notes with practice problems and solutions.',
        category: 'Study Guide',
        uploadDate: '2024-01-20',
        author: 'Math Department',
        downloads: 320,
        status: 'Borrowed',
        borrowedBy: 'student2@school.edu',
        borrowedAt: '2026-02-25T09:15:00',
        expiresAt: '2026-02-27T09:15:00',
        feedback: [
            { id: 102, user: 'student2@school.edu', comment: 'Helped me pass the midterm!', rating: 4 }
        ]
    }
];
