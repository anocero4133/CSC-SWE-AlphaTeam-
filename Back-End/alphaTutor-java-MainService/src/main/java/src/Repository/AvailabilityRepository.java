package src.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import src.Model.Availability;

@Repository
public interface AvailabilityRepository extends CrudRepository<Availability, Long> {
}
