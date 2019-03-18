package src.Repository;

import org.springframework.transaction.annotation.Transactional;
import src.Model.Tutor;

@Transactional
public interface TutorRepository extends UserBaseRepository<Tutor>{

}
