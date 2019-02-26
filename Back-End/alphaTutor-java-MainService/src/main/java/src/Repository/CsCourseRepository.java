package src.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import src.Model.CSCourses;

@Repository
public interface CsCourseRepository extends CrudRepository<CSCourses, Long> {
}
