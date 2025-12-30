package ma.ebank.backend.controller;

import jakarta.validation.Valid;
import ma.ebank.backend.dto.CreateBankAccountRequest;
import ma.ebank.backend.model.CompteBancaire;
import ma.ebank.backend.service.BankAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/agent/accounts")
public class BankAccountController {
    private final BankAccountService bankAccountService;

    public BankAccountController(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    @PostMapping
    @PreAuthorize("hasRole('AGENT_GUICHET')")
    public ResponseEntity<CompteBancaire> createAccount(
            @Valid @RequestBody CreateBankAccountRequest request) {

        CompteBancaire account = bankAccountService.createAccount(request);
        return new ResponseEntity<>(account, HttpStatus.CREATED);
    }
}
