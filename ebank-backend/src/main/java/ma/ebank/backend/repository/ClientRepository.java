package ma.ebank.backend.repository;

import ma.ebank.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    boolean existsByNumeroIdentite(String numeroIdentite);
    Optional<Client> findByNumeroIdentite(String numeroIdentite);
}
