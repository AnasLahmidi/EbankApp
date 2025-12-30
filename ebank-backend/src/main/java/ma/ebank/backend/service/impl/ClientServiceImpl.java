package ma.ebank.backend.service.impl;

import ma.ebank.backend.dto.CreateClientRequest;
import ma.ebank.backend.model.Client;
import ma.ebank.backend.model.Role;
import ma.ebank.backend.model.User;
import ma.ebank.backend.model.enums.RoleType;
import ma.ebank.backend.repository.ClientRepository;
import ma.ebank.backend.repository.RoleRepository;
import ma.ebank.backend.repository.UserRepository;
import ma.ebank.backend.service.ClientService;
import ma.ebank.backend.service.EmailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final EmailService emailService;

    public ClientServiceImpl(ClientRepository clientRepository,
                             UserRepository userRepository,
                             RoleRepository roleRepository,
                             PasswordEncoder passwordEncoder, EmailService emailService) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public Client createClient(CreateClientRequest request) {

        // RG_4 : CIN unique
        if (clientRepository.existsByNumeroIdentite(request.getNumeroIdentite())) {
            throw new RuntimeException("Numéro d'identité déjà existant");
        }

        // RG_6 : Email unique
        if (userRepository.existsByLogin(request.getLogin())) {
            throw new RuntimeException("Adresse email déjà utilisée");
        }

        // Génération login + password
        String login = request.getEmail();
        String rawPassword = UUID.randomUUID().toString().substring(0, 8);

        User user = new User();
        user.setLogin(login);
        user.setPassword(passwordEncoder.encode(rawPassword));
        Role clientRole = roleRepository.findByName(RoleType.CLIENT);

        if (clientRole == null) {
            throw new RuntimeException("Rôle CLIENT introuvable");
        }

        user.setRole(clientRole);

        userRepository.save(user);
        emailService.sendCredentials(
                request.getEmail(),
                login,
                rawPassword
        );

        Client client = new Client();
        client.setNom(request.getNom());
        client.setPrenom(request.getPrenom());
        client.setNumeroIdentite(request.getNumeroIdentite());
        client.setDateNaissance(request.getDateNaissance());
        client.setEmail(request.getEmail());
        client.setAdresse(request.getAdressePostale());
        client.setUser(user);

        return clientRepository.save(client);
    }
}
