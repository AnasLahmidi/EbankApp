package ma.ebank.backend.repository;

import ma.ebank.backend.model.Role;
import ma.ebank.backend.model.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleType name);
    boolean existsByName(RoleType name);
}
