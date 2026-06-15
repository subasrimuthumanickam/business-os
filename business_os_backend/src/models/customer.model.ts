export interface Customer {
    id?: number;
    company_id: number;
    name: string;
    email: string;
    phone?: string;
    status: 'active' | 'inactive';
    created_at?: Date;
}