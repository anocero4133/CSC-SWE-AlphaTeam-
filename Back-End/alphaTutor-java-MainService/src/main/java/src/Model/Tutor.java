package src.Model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity(name = "Tutor")
@DiscriminatorValue(("Tutor"))
public class Tutor extends Admin{

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "tutor_courses", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "course_id",
                    referencedColumnName = "csCourseId"))
    private List<CSCourses> courses;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "tutor_availability", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "availability_id",
                    referencedColumnName = "availabilityId"))
    private List<Availability> availabilities;
}
