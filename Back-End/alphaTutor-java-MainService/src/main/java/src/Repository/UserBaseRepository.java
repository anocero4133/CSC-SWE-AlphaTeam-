package src.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import src.Model.User;

@NoRepositoryBean
public interface UserBaseRepository<T extends User> extends CrudRepository<T, Long> {
    T findByEmail(String email);
    T findByUserName(String username);
    T findByUserId(Long id);
    T findByUserNameAndPassword(String username, String password);
}
