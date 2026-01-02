package ma.ebank.backend.controller;

import ma.ebank.backend.dto.ChangePasswordRequest;
import ma.ebank.backend.dto.LoginRequest;
import ma.ebank.backend.dto.LoginResponse;
import ma.ebank.backend.config.JwtUtil;
import ma.ebank.backend.model.User;
import ma.ebank.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getLogin(),
                                    request.getPassword()
                            )
                    );

            // Cast direct vers User (User implémente UserDetails maintenant)
            User user = (User) authentication.getPrincipal();

            String token = jwtUtil.generateToken(user.getLogin());

            LoginResponse response = new LoginResponse(token, user.getRole().getName().toString());
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Login ou mot de passe erronés"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Une erreur s'est produite lors de l'authentification"));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request,
                                            Authentication authentication) {
        try {
            // Cast direct vers User
            User user = (User) authentication.getPrincipal();

            if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Ancien mot de passe incorrect"));
            }

            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "Mot de passe modifié avec succès"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Une erreur s'est produite lors du changement de mot de passe"));
        }
    }
}