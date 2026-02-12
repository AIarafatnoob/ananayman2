
export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'API' | 'BI';
  image: string;
  tags: string[];
  impact: string;
  description: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  points: string[];
}

export interface Education {
  id: string;
  year: string;
  degree: string;
  institution: string;
  description: string;
  type: 'education' | 'certification';
}


export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: string[];
}

