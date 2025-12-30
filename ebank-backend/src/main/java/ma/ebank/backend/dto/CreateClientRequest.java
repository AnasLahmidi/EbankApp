package ma.ebank.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class CreateClientRequest {
    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    @NotBlank
    private String numeroIdentite; // CIN

    @NotNull
    private LocalDate dateNaissance;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String adressePostale;

    @NotBlank
    private String login;

    // getters & setters

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getNumeroIdentite() {
        return numeroIdentite;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public String getEmail() {
        return email;
    }

    public String getAdressePostale() {
        return adressePostale;
    }

    public String getLogin() {
        return login;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setNumeroIdentite(String numeroIdentite) {
        this.numeroIdentite = numeroIdentite;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAdressePostale(String adressePostale) {
        this.adressePostale = adressePostale;
    }
}
