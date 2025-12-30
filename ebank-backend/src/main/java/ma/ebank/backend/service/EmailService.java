package ma.ebank.backend.service;

public interface EmailService {
    void sendCredentials(String to, String login, String password);
}
