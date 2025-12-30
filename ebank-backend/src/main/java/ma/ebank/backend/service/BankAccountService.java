package ma.ebank.backend.service;

import ma.ebank.backend.dto.CreateBankAccountRequest;
import ma.ebank.backend.model.CompteBancaire;

public interface BankAccountService {
    CompteBancaire createAccount(CreateBankAccountRequest request);
}
