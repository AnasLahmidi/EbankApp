package ma.ebank.backend.service.impl;

import ma.ebank.backend.service.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendCredentials(String to, String login, String password) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Création de votre compte bancaire");
        message.setText(
                "Bonjour,\n\n" +
                        "Votre compte bancaire a été créé avec succès.\n\n" +
                        "Login : " + login + "\n" +
                        "Mot de passe : " + password + "\n\n" +
                        "Veuillez changer votre mot de passe lors de votre première connexion.\n\n" +
                        "Cordialement,\n" +
                        "E-Bank"
        );

        mailSender.send(message);
    }
}
