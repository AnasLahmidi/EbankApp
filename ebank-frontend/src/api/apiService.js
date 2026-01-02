const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Auth
  login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Clients
  getClients() {
    return this.request('/clients');
  }

  getClient(id) {
    return this.request(`/clients/${id}`);
  }

  createClient(data) {
    return this.request('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  updateClient(id, data) {
    return this.request(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  deleteClient(id) {
    return this.request(`/clients/${id}`, {
      method: 'DELETE',
    });
  }

  // Comptes
  getComptes(clientId) {
    return this.request(`/comptes${clientId ? `?clientId=${clientId}` : ''}`);
  }

  getCompte(id) {
    return this.request(`/comptes/${id}`);
  }

  createCompte(data) {
    return this.request('/comptes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Opérations
  depot(data) {
    return this.request('/operations/depot', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  virement(data) {
    return this.request('/operations/virement', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  getOperations(compteId) {
    return this.request(`/operations${compteId ? `?compteId=${compteId}` : ''}`);
  }
}

export default new ApiService();