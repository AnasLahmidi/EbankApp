package ma.ebank.backend.repository;

import ma.ebank.backend.model.CompteBancaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<CompteBancaire, Long> {
    boolean existsByRib(String rib);
}
