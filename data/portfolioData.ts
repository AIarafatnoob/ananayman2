
import { Project, Experience, Education } from '../types';

export interface PortfolioData {
    experience: Experience[];
    education: Education[];
    projects: Project[];
}

export const initialPortfolioData: PortfolioData = {
    experience: [
        {
            id: 'exp1',
            period: 'Feb 2023 — Present',
            role: 'Senior SQA Engineer',
            company: 'Celloscope Limited',
            points: [
                'Developed hybrid automation frameworks using Python, Playwright, and Cypress, increasing coverage by 45%.',
                'Managed functional/load testing cycles maintaining a 99.1% defect-free production rate.',
                'Automated mobile testing with Appium, reducing release-critical bugs by 30%.'
            ]
        },
        {
            id: 'exp2',
            period: 'Nov 2021 — Jan 2023',
            role: 'Junior SQA Engineer',
            company: 'Spectrum Engineering Consortium Ltd.',
            points: [
                'Collaborated with developers to reduce average bug fix time from 18 hours to 8 hours.',
                'Applied reliable XPath/CSS locator strategies ensuring 95% script reliability.',
                'Executed end-to-end integration testing across Manual, API, and Database points.'
            ]
        }
    ],
    education: [
        {
            id: 'edu1',
            year: '2016 — 2021',
            degree: 'B.Sc. in Computer Science',
            institution: 'East West University',
            description: 'Specialized in Software Engineering with a focus on Algorithm design and Quality Assurance methodologies.',
            type: 'education'
        },
        {
            id: 'cert1',
            year: 'Certification',
            degree: 'ISTQB Foundation',
            institution: 'Global Certification',
            description: 'Certified Tester Foundation Level (CTFL), mastery of standardized testing terminologies and processes.',
            type: 'certification'
        },
        {
            id: 'cert2',
            year: 'Certification',
            degree: 'AWS Solutions Architect',
            institution: 'Amazon Web Services',
            description: 'Understanding of cloud infrastructure to better architect automated testing in scalable environments.',
            type: 'certification'
        }
    ],
    projects: [
        {
            id: '1',
            title: 'Bangladesh Customs User Management',
            category: 'Web',
            image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
            tags: ['Selenium', 'PostgreSQL', 'Manual Testing'],
            impact: 'Conducted full-stack QA for high-security government data, automating critical UI workflows to ensure zero critical failures during production.',
            description: 'Developed a robust testing framework for critical national infrastructure.'
        },
        {
            id: '2',
            title: 'Agriculture Cluster Admission System',
            category: 'Mobile',
            image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800',
            tags: ['Cypress', 'Mobile Testing', 'API Testing'],
            impact: 'Developed the automation roadmap and a robust Cypress suite, managing the bug lifecycle for API and load testing to streamline the admission process.',
            description: 'End-to-end QA architecture for high-traffic educational systems.'
        },
        {
            id: '3',
            title: 'IDRA UMP & BI',
            category: 'BI',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            tags: ['Cypress', 'SQL', 'Manual Testing'],
            impact: 'Implemented automated scripts for core insurance modules and verified data integrity through complex SQL validation strategies.',
            description: 'Financial data assurance and business intelligence verification.'
        },
        {
            id: '4',
            title: 'Agent License Online (ALO)',
            category: 'Web',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
            tags: ['Cypress', 'Automation Architecture'],
            impact: 'Established the automation framework from scratch, enabling significantly faster feedback loops for the licensing approval module.',
            description: 'Streamlining licensing processes through automated verification.'
        },
        {
            id: '5',
            title: 'Bangladesh Customs Agent Management System',
            category: 'Web',
            image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
            tags: ['Cypress', 'API Testing', 'Database Testing'],
            impact: 'Directed client deliverables and performed comprehensive full-stack testing, including the creation of custom automation scripts.',
            description: 'Comprehensive QA for customs management systems.'
        },
        {
            id: '6',
            title: 'Microcredit Regulatory Authority (SIB)',
            category: 'API',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            tags: ['Cypress', 'Jasper Report', 'API Testing'],
            impact: 'Coordinated QA operations for the Staff Information Bureau, executing API tests and automating analytics reporting with Jasper.',
            description: 'Automation and analytics reporting for regulatory systems.'
        }
    ]
};
