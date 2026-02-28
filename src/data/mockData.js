export const MOCK_RESOURCES = [
    {
        id: 1,
        title: 'Introduction to Algorithms',
        description: 'A comprehensive guide to modern algorithms.',
        category: 'Computer Science',
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
        category: 'Physics',
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
        category: 'Mathematics',
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
    },
    {
        id: 4,
        title: 'Machine Learning for Beginners',
        description: 'An introductory textbook on basic ML concepts like regression and classification.',
        category: 'Computer Science',
        uploadDate: '2024-02-10',
        author: 'Dr. Alan Turing',
        downloads: 450,
        status: 'Available',
        feedback: [],
        userProgress: {
            'student1@school.edu': { lastPage: 45, lastReadAt: '2026-02-25T14:20:00' }
        }
    },
    {
        id: 5,
        title: 'Advances in Deep Neural Networks',
        description: 'State-of-the-art architectures in deep learning.',
        category: 'Computer Science',
        uploadDate: '2024-02-15',
        author: 'Yann LeCun',
        downloads: 210,
        status: 'Available',
        feedback: []
    },
    {
        id: 6,
        title: 'Linear Algebra Cheatsheet',
        description: 'Quick reference for matrices and vector spaces.',
        category: 'Mathematics',
        uploadDate: '2024-02-18',
        author: 'Math Department',
        downloads: 650,
        status: 'Available',
        feedback: []
    },
    {
        id: 7,
        title: 'Data Structures with JavaScript',
        description: 'Implementing lists, trees, and graphs from scratch in JS.',
        category: 'Computer Science',
        uploadDate: '2024-02-20',
        author: 'Jane Doe',
        downloads: 300,
        status: 'Available',
        feedback: [],
        userProgress: {
            'student1@school.edu': { lastPage: 12, lastReadAt: '2026-02-24T09:00:00' }
        }
    },
    {
        id: 8,
        title: 'Operating Systems: Design Approach',
        description: 'Core concepts behind modern OS architectures.',
        category: 'Computer Science',
        uploadDate: '2024-02-21',
        author: 'Linus Torvalds',
        downloads: 890,
        status: 'Available',
        feedback: []
    },
    {
        id: 9,
        title: 'Fundamentals of Physics',
        description: 'Comprehensive textbook covering mechanics, waves, and thermodynamics.',
        category: 'Physics',
        uploadDate: '2024-03-01',
        author: 'David Halliday',
        downloads: 120,
        status: 'Available',
        feedback: []
    },
    {
        id: 10,
        title: 'Classical Mechanics',
        description: 'Advanced mechanics course notes with detailed mathematical derivations.',
        category: 'Physics',
        uploadDate: '2024-03-05',
        author: 'John Taylor',
        downloads: 95,
        status: 'Available',
        feedback: []
    },
    {
        id: 11,
        title: 'Electromagnetism and Light',
        description: 'Exploration of Maxwell equations and optics.',
        category: 'Physics',
        uploadDate: '2024-03-10',
        author: 'Sarah Jenkins',
        downloads: 150,
        status: 'Available',
        feedback: []
    },
    {
        id: 12,
        title: 'Thermodynamics and Statistical Mechanics',
        description: 'Principles of heat, work, and statistical distributions.',
        category: 'Physics',
        uploadDate: '2024-03-12',
        author: 'Michael Faraday',
        downloads: 110,
        status: 'Available',
        feedback: []
    },
    {
        id: 13,
        title: 'Discrete Mathematics and Its Applications',
        description: 'Essential discrete math concepts for computer science.',
        category: 'Mathematics',
        uploadDate: '2024-03-15',
        author: 'Kenneth Rosen',
        downloads: 400,
        status: 'Available',
        feedback: []
    },
    {
        id: 14,
        title: 'Introduction to Probability',
        description: 'Basic probability theory with engineering applications.',
        category: 'Mathematics',
        uploadDate: '2024-03-18',
        author: 'Dimitri Bertsekas',
        downloads: 230,
        status: 'Available',
        feedback: []
    },
    {
        id: 15,
        title: 'Ordinary Differential Equations',
        description: 'Solving linear and non-linear differential equations.',
        category: 'Mathematics',
        uploadDate: '2024-03-20',
        author: 'Vladimir Arnold',
        downloads: 180,
        status: 'Available',
        feedback: []
    },
    {
        id: 16,
        title: 'Engineering Mechanics: Dynamics',
        description: 'Fundamentals of kinematics and kinetics for engineering.',
        category: 'Mechanical Engineering',
        uploadDate: '2024-03-22',
        author: 'J.L. Meriam',
        downloads: 275,
        status: 'Available',
        feedback: []
    },
    {
        id: 17,
        title: 'Fluid Mechanics Fundamentals',
        description: 'Fluid statics and dynamics principles with examples.',
        category: 'Mechanical Engineering',
        uploadDate: '2024-03-25',
        author: 'Bruce Munson',
        downloads: 310,
        status: 'Available',
        feedback: []
    },
    {
        id: 18,
        title: 'Thermodynamics: An Engineering Approach',
        description: 'Practical thermodynamic cycles and energy conversion.',
        category: 'Mechanical Engineering',
        uploadDate: '2024-03-28',
        author: 'Yunus Cengel',
        downloads: 450,
        status: 'Available',
        feedback: []
    },
    {
        id: 19,
        title: 'Materials Science for Engineers',
        description: 'Properties, processing, and application of engineering materials.',
        category: 'Mechanical Engineering',
        uploadDate: '2024-04-01',
        author: 'William Callister',
        downloads: 290,
        status: 'Available',
        feedback: []
    },
    {
        id: 20,
        title: 'Machine Design',
        description: 'Design and analysis of machine elements.',
        category: 'Mechanical Engineering',
        uploadDate: '2024-04-05',
        author: 'Robert Norton',
        downloads: 180,
        status: 'Available',
        feedback: []
    },
    {
        id: 21,
        title: 'Microelectronic Circuits',
        description: 'Analysis and design of analog and digital microelectronic circuits.',
        category: 'Electronics',
        uploadDate: '2024-04-08',
        author: 'Adel Sedra',
        downloads: 520,
        status: 'Available',
        feedback: []
    },
    {
        id: 22,
        title: 'Digital Design',
        description: 'Logic gates, boolean algebra, and sequential circuits.',
        category: 'Electronics',
        uploadDate: '2024-04-10',
        author: 'M. Morris Mano',
        downloads: 410,
        status: 'Available',
        feedback: []
    },
    {
        id: 23,
        title: 'Signals and Systems',
        description: 'Continuous and discrete-time signals and systems theory.',
        category: 'Electronics',
        uploadDate: '2024-04-12',
        author: 'Alan Oppenheim',
        downloads: 330,
        status: 'Available',
        feedback: []
    },
    {
        id: 24,
        title: 'Power Electronics',
        description: 'Converters, applications, and design concepts.',
        category: 'Electronics',
        uploadDate: '2024-04-15',
        author: 'Ned Mohan',
        downloads: 215,
        status: 'Available',
        feedback: []
    },
    {
        id: 25,
        title: 'Embedded Systems Design',
        description: 'Hardware and software aspects of embedded system design.',
        category: 'Electronics',
        uploadDate: '2024-04-18',
        author: 'Frank Vahid',
        downloads: 280,
        status: 'Available',
        feedback: []
    },
    {
        id: 26,
        title: 'A People\'s History of the United States',
        description: 'American history told from the perspective of the common people.',
        category: 'History',
        uploadDate: '2024-04-20',
        author: 'Howard Zinn',
        downloads: 650,
        status: 'Available',
        feedback: []
    },
    {
        id: 27,
        title: 'Sapiens: A Brief History of Humankind',
        description: 'Exploration of human evolution and history.',
        category: 'History',
        uploadDate: '2024-04-22',
        author: 'Yuval Noah Harari',
        downloads: 980,
        status: 'Available',
        feedback: []
    },
    {
        id: 28,
        title: 'The Guns of August',
        description: 'A historical account of the first month of World War I.',
        category: 'History',
        uploadDate: '2024-04-25',
        author: 'Barbara W. Tuchman',
        downloads: 320,
        status: 'Available',
        feedback: []
    },
    {
        id: 29,
        title: 'The Silk Roads: A New History of the World',
        description: 'A new perspective on world history focusing on the East.',
        category: 'History',
        uploadDate: '2024-04-28',
        author: 'Peter Frankopan',
        downloads: 410,
        status: 'Available',
        feedback: []
    },
    {
        id: 30,
        title: 'SPQR: A History of Ancient Rome',
        description: 'Comprehensive history of the Roman Republic and Empire.',
        category: 'History',
        uploadDate: '2024-05-01',
        author: 'Mary Beard',
        downloads: 350,
        status: 'Available',
        feedback: []
    }
];
