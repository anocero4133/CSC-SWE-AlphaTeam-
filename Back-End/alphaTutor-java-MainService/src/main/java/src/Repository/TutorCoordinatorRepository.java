package src.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import src.Model.Coordinator;
import src.Model.Role;
import src.Model.User;

// This repository is going to talk to the db and also do some operations such as delete, put, update, retrieve
@Repository
public interface TutorCoordinatorRepository extends UserBaseRepository<Coordinator>{

}
