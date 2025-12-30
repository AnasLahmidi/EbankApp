package ma.ebank.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(unique = true, nullable = false)
    private String numeroIdentite;

    @Column(nullable = false)
    private LocalDate dateNaissance;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String adresse;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters & setters

    public Long getId() {
        return id;
    }

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

    public String getAdresse() {
        return adresse;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
