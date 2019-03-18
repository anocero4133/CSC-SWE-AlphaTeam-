package src.Model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@Entity(name = "Tutor")
public class Tutor extends User {

    @NotNull
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "tutor_courses", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id",
                    referencedColumnName = "csCourseId"))
    private List<CSCourses> courses;

    @NotNull
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "tutor_availability", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "availability_id",
                    referencedColumnName = "availabilityId"))
    private List<Availability> availabilities;

    public List<CSCourses> getCourses() {
        return courses;
    }

    public void setCourses(List<CSCourses> courses) {
        this.courses = courses;
    }

    public List<Availability> getAvailabilities() {
        return availabilities;
    }

    public void setAvailabilities(List<Availability> availabilities) {
        this.availabilities = availabilities;
    }
    public Map<String, Object> convertTutorToMap() {
        Map<String, Object> map = super.convertUserToMap();
        map.put("courses", courses);
        map.put("availabilities",availabilities);
        return map;
    }
}
