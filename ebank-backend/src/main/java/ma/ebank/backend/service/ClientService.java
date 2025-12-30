package ma.ebank.backend.service;

import ma.ebank.backend.dto.CreateClientRequest;
import ma.ebank.backend.model.Client;

public interface ClientService {
    Client createClient(CreateClientRequest request);
}
