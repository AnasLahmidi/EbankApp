package ma.ebank.backend.config;

import ma.ebank.backend.model.Role;
import ma.ebank.backend.model.User;
import ma.ebank.backend.model.enums.RoleType;
import ma.ebank.backend.repository.RoleRepository;
import ma.ebank.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(RoleRepository roleRepository,
                               UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {

        return args -> {

            // 🧹 reset des users (TEMPORAIRE)
            //userRepository.deleteAll();

            // 1️⃣ rôles
            for (RoleType roleType : RoleType.values()) {
                if (!roleRepository.existsByName(roleType)) {
                    Role role = new Role();
                    role.setName(roleType);
                    roleRepository.save(role);
                }
            }

            // 2️⃣ rôle AGENT_GUICHET
            Role agentRole = roleRepository.findByName(RoleType.AGENT_GUICHET);

            // 3️⃣ users
            createAgentIfNotExists("agent1", "123456", agentRole, userRepository, passwordEncoder);
            createAgentIfNotExists("agent2", "123456", agentRole, userRepository, passwordEncoder);
        };
    }


 private void createAgentIfNotExists(String login,
                                        String rawPassword,
                                        Role role,
                                        UserRepository userRepository,
                                        PasswordEncoder passwordEncoder) {

        if (!userRepository.existsByLogin(login)) {
            User agent = new User();
            agent.setLogin(login);
            agent.setPassword(passwordEncoder.encode(rawPassword));
            agent.setRole(role);
            userRepository.save(agent);
        }
    }
}
