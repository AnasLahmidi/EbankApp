package ma.ebank.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateBankAccountRequest {
    @NotBlank
    private String rib;

    @NotBlank
    private String numeroIdentite; // CIN du client

    public String getRib() {
        return rib;
    }

    public String getNumeroIdentite() {
        return numeroIdentite;
    }

    public void setRib(String rib) {
        this.rib = rib;
    }

    public void setNumeroIdentite(String numeroIdentite) {
        this.numeroIdentite = numeroIdentite;
    }
}
