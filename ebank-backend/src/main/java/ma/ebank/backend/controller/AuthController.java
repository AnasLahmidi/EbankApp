package ma.ebank.backend.controller;

import ma.ebank.backend.dto.ChangePasswordRequest;
import ma.ebank.backend.dto.LoginRequest;
import ma.ebank.backend.dto.LoginResponse;
import ma.ebank.backend.config.JwtUtil;
import ma.ebank.backend.model.User;
import ma.ebank.backend.repository.UserRepository;
import ma.ebank.backend.config.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public LoginResponse login(@RequestBody LoginRequest request) {

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getLogin(),
                                    request.getPassword()
                            )
                    );

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userDetails.getUser();

            String token = jwtUtil.generateToken(user.getLogin());

            return new LoginResponse(token, user.getRole().getName().toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Login ou mot de passe erronés");
        }
    }

    @PostMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordRequest request,
                               Authentication authentication) {

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userDetails.getUser();

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Ancien mot de passe incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}