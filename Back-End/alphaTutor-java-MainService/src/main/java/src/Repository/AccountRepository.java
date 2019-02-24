package src.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import src.Model.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account,Long>{

}
