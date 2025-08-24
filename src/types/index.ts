export interface User {
  id: string;
  name: string;
  email: string;
  contactNumber?: string;
  address?: string;
  yearsOfExperience?: number;
  skillset?: string;
  idProofUploaded?: boolean;
  status: 'pending' | 'approved' | 'rejected';
  profileComplete: boolean;
}

export interface ClientRequest {
  id: string;
  clientName: string;
  area: string;
  rooms: number;
  tasks: string[];
  requirements: string;
  paymentOffered: number;
  duration: string;
  datePosted: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ActiveSession {
  id: string;
  clientName: string;
  startDate: string;
  endDate: string;
  paymentAmount: number;
  status: 'ongoing' | 'completed' | 'cancelled';
}