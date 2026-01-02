import { api } from './api';
import {
  CompteBancaire,
  OperationBancaire,
  DepotRequest,
  RetraitRequest,
  VirementRequest,
  Client,
  CreateClientRequest,
  UpdateClientRequest,
  CreateCompteRequest,
  SoldeResponse,
  OperationResponse,
  HistoriqueResponse,
  StatsGlobales,
  StatsClient,
} from '@/types';

export const bankService = {
  // ==================== COMPTES ====================
  
  // GET /api/comptes - Récupérer tous les comptes
  getComptes: async (): Promise<CompteBancaire[]> => {
    return api.get<CompteBancaire[]>('/comptes');
  },

  // GET /api/comptes/{id} - Récupérer un compte par ID
  getCompteById: async (id: number): Promise<CompteBancaire> => {
    return api.get<CompteBancaire>(`/comptes/${id}`);
  },

  // GET /api/comptes/{id}/solde - Consulter le solde
  getSolde: async (compteId: number): Promise<SoldeResponse> => {
    return api.get<SoldeResponse>(`/comptes/${compteId}/solde`);
  },

  // POST /api/comptes - Créer un nouveau compte
  createCompte: async (data: CreateCompteRequest): Promise<CompteBancaire & { message: string }> => {
    return api.post<CompteBancaire & { message: string }>('/comptes', data);
  },

  // PATCH /api/comptes/{id}/statut - Bloquer/Débloquer un compte
  updateCompteStatut: async (
    id: number,
    statut: 'ACTIF' | 'BLOQUE' | 'FERME'
  ): Promise<{ message: string; nouveauStatut: string }> => {
    return api.patch<{ message: string; nouveauStatut: string }>(`/comptes/${id}/statut`, { statut });
  },

  // DELETE /api/comptes/{id} - Supprimer un compte
  deleteCompte: async (id: number): Promise<{ message: string }> => {
    return api.delete<{ message: string }>(`/comptes/${id}`);
  },

  // ==================== OPÉRATIONS ====================

  // POST /api/operations/depot - Effectuer un dépôt
  effectuerDepot: async (data: DepotRequest): Promise<OperationResponse> => {
    return api.post<OperationResponse>('/operations/depot', data);
  },

  // POST /api/operations/retrait - Effectuer un retrait
  effectuerRetrait: async (data: RetraitRequest): Promise<OperationResponse> => {
    return api.post<OperationResponse>('/operations/retrait', data);
  },

  // POST /api/operations/virement - Effectuer un virement
  effectuerVirement: async (data: VirementRequest): Promise<OperationResponse> => {
    return api.post<OperationResponse>('/operations/virement', data);
  },

  // GET /api/operations/historique/{compteId} - Historique d'un compte
  getHistorique: async (
    compteId: number,
    params?: {
      dateDebut?: string;
      dateFin?: string;
      type?: 'DEPOT' | 'RETRAIT' | 'VIREMENT';
      page?: number;
      size?: number;
    }
  ): Promise<HistoriqueResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.dateDebut) queryParams.append('dateDebut', params.dateDebut);
    if (params?.dateFin) queryParams.append('dateFin', params.dateFin);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.page !== undefined) queryParams.append('page', params.page.toString());
    if (params?.size !== undefined) queryParams.append('size', params.size.toString());
    
    const query = queryParams.toString();
    return api.get<HistoriqueResponse>(`/operations/historique/${compteId}${query ? `?${query}` : ''}`);
  },

  // GET /api/operations/{id} - Récupérer une opération par ID
  getOperationById: async (id: number): Promise<OperationBancaire> => {
    return api.get<OperationBancaire>(`/operations/${id}`);
  },

  // GET /api/operations/releve/{compteId} - Générer relevé PDF
  getRelevePDF: async (compteId: number, dateDebut: string, dateFin: string): Promise<Blob> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/operations/releve/${compteId}?dateDebut=${dateDebut}&dateFin=${dateFin}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ebank_token')}`,
        },
      }
    );
    return response.blob();
  },

  // GET /api/operations/export/{compteId} - Exporter historique CSV/Excel
  exportHistorique: async (
    compteId: number,
    format: 'CSV' | 'EXCEL',
    dateDebut?: string,
    dateFin?: string
  ): Promise<Blob> => {
    const params = new URLSearchParams({ format });
    if (dateDebut) params.append('dateDebut', dateDebut);
    if (dateFin) params.append('dateFin', dateFin);
    
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/operations/export/${compteId}?${params}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ebank_token')}`,
        },
      }
    );
    return response.blob();
  },

  // ==================== CLIENTS ====================

  // GET /api/clients - Récupérer tous les clients
  getAllClients: async (): Promise<Client[]> => {
    return api.get<Client[]>('/clients');
  },

  // GET /api/clients/{id} - Récupérer un client par ID
  getClientById: async (id: number): Promise<Client> => {
    return api.get<Client>(`/clients/${id}`);
  },

  // POST /api/clients - Créer un nouveau client
  createClient: async (data: CreateClientRequest): Promise<Client & { message: string }> => {
    return api.post<Client & { message: string }>('/clients', data);
  },

  // PUT /api/clients/{id} - Modifier un client
  updateClient: async (id: number, data: UpdateClientRequest): Promise<Client & { message: string }> => {
    return api.put<Client & { message: string }>(`/clients/${id}`, data);
  },

  // DELETE /api/clients/{id} - Supprimer un client
  deleteClient: async (id: number): Promise<{ message: string }> => {
    return api.delete<{ message: string }>(`/clients/${id}`);
  },

  // GET /api/clients/search?q={query} - Rechercher des clients
  searchClients: async (query: string): Promise<Client[]> => {
    return api.get<Client[]>(`/clients/search?q=${encodeURIComponent(query)}`);
  },

  // ==================== STATISTIQUES ====================

  // GET /api/stats/global - Statistiques globales
  getStatsGlobales: async (): Promise<StatsGlobales> => {
    return api.get<StatsGlobales>('/stats/global');
  },

  // GET /api/stats/client/{clientId} - Statistiques par client
  getStatsClient: async (clientId: number): Promise<StatsClient> => {
    return api.get<StatsClient>(`/stats/client/${clientId}`);
  },
};
