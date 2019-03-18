package src.Repository;

import org.springframework.transaction.annotation.Transactional;
import src.Model.User;

@Transactional
public interface TutorRepository extends UserBaseRepository<User>{

}
