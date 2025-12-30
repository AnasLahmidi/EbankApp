package ma.ebank.backend.service.impl;

import ma.ebank.backend.dto.CreateBankAccountRequest;
import ma.ebank.backend.model.Client;
import ma.ebank.backend.model.CompteBancaire;
import ma.ebank.backend.model.enums.AccountStatus;
import ma.ebank.backend.repository.BankAccountRepository;
import ma.ebank.backend.repository.ClientRepository;
import ma.ebank.backend.service.BankAccountService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class BankAccountServiceImpl implements BankAccountService {
    private final BankAccountRepository bankAccountRepository;
    private final ClientRepository clientRepository;

    public BankAccountServiceImpl(BankAccountRepository bankAccountRepository,
                                  ClientRepository clientRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public CompteBancaire createAccount(CreateBankAccountRequest request) {

        // RG_8 : client doit exister
        Client client = clientRepository
                .findByNumeroIdentite(request.getNumeroIdentite())
                .orElseThrow(() ->
                        new RuntimeException("Client introuvable"));

        // RG_9 : RIB unique
        if (bankAccountRepository.existsByRib(request.getRib())) {
            throw new RuntimeException("RIB déjà existant");
        }

        // (Validation simple du format RIB)
        if (!request.getRib().matches("\\d{24}")) {
            throw new RuntimeException("RIB invalide");
        }

        CompteBancaire account = new CompteBancaire();
        account.setRib(request.getRib());
        account.setClient(client);
        account.setStatut(AccountStatus.OUVERT);
        account.setSolde(0.0);
        //account.setSolde(BigDecimal.ZERO);

        return bankAccountRepository.save(account);
    }
}
