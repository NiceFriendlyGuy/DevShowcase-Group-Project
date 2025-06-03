export interface Request {
  id: string;
  userId: string;
  status: 'pending' | 'solved' | 'cancelled';
  type:
    | 'Demande de support'
    | 'Demande de verification'
    | 'Plainte'
    | 'Suggestion'
    | 'Autre demande';
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
