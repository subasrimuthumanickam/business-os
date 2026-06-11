 export interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
}

export const ProjectController = {
  getAll: async (): Promise<Project[]> => {
    return [];
  },
  getById: async (id: string): Promise<Project | null> => {
    return null;
  },
  create: async (data: any): Promise<Project> => {
    return {} as Project;
  },
  update: async (id: string, data: any): Promise<Project> => {
    return {} as Project;
  },
  delete: async (id: string): Promise<void> => {}
};

export {};  // ← ADD THIS
