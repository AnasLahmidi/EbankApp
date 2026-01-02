// User types
export type UserRole = 'ADMIN' | 'AGENT' | 'CLIENT';

export interface User {
  id: number;
  username: string;
  email?: string;
  role: UserRole;
  nom?: string;
  prenom?: string;
}

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse?: string;
  dateNaissance?: string;
  cin?: string;
  dateCreation: string;
  nombreComptes?: number;
  user?: User;
  comptes?: CompteBancaire[];
}

export interface CompteBancaire {
  id: number;
  numero: string;
  type: 'COURANT' | 'EPARGNE';
  solde: number;
  dateCreation: string;
  dateModification?: string;
  statut: 'ACTIF' | 'BLOQUE' | 'FERME';
  clientId?: number;
  clientNom?: string;
  client?: Client;
}

export interface OperationBancaire {
  id: number;
  type: 'DEPOT' | 'RETRAIT' | 'VIREMENT';
  montant: number;
  date: string;
  description?: string;
  soldeAvant?: number;
  soldeApres?: number;
  statut?: string;
  compteSource?: string;
  compteDestination?: string;
  compteSourceId?: number;
  compteDestId?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
}

export interface DepotRequest {
  compteId: number;
  montant: number;
  description?: string;
}

export interface RetraitRequest {
  compteId: number;
  montant: number;
  description?: string;
}

export interface VirementRequest {
  compteSourceId: number;
  compteDestId: number;
  montant: number;
  description?: string;
}

export interface CreateClientRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse?: string;
  dateNaissance?: string;
  cin?: string;
  username: string;
  password: string;
}

export interface UpdateClientRequest {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
}

export interface CreateCompteRequest {
  clientId: number;
  type: 'COURANT' | 'EPARGNE';
  soldeInitial?: number;
}

export interface SoldeResponse {
  compteId: number;
  numero: string;
  solde: number;
  devise: string;
  dateConsultation: string;
}

export interface OperationResponse {
  operationId: number;
  type: 'DEPOT' | 'RETRAIT' | 'VIREMENT';
  compteId?: number;
  compteSourceId?: number;
  compteDestId?: number;
  montant: number;
  nouveauSolde?: number;
  nouveauSoldeSource?: number;
  nouveauSoldeDest?: number;
  date: string;
  message: string;
}

export interface HistoriqueResponse {
  content: OperationBancaire[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

export interface StatsGlobales {
  totalClients: number;
  totalComptes: number;
  totalComptesCourants: number;
  totalComptesEpargne: number;
  soldeTotalMAD: number;
  nombreOperationsAujourdhui: number;
  montantOperationsAujourdhui: number;
  dateGeneration: string;
}

export interface StatsClient {
  clientId: number;
  nombreComptes: number;
  soldeTotalMAD: number;
  nombreOperationsMois: number;
  montantDepotsMois: number;
  montantRetraitsMois: number;
  dernierOperation: string;
}

export interface ApiError {
  message: string;
  code?: string;
  timestamp?: string;
  soldeActuel?: number;
  montantDemande?: number;
}
