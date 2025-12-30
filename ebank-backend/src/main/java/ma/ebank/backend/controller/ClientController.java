package ma.ebank.backend.controller;

import jakarta.validation.Valid;
import ma.ebank.backend.dto.CreateClientRequest;
import ma.ebank.backend.model.Client;
import ma.ebank.backend.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/agent/clients")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    @PreAuthorize("hasRole('AGENT_GUICHET')")
    public ResponseEntity<Client> createClient(
            @Valid @RequestBody CreateClientRequest request) {

        Client client = clientService.createClient(request);

        return new ResponseEntity<>(client, HttpStatus.CREATED);
    }
}
