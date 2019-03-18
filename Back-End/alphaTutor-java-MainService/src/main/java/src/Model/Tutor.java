package src.Model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

@Entity(name = "Tutor")
public class Tutor extends User {
    public Tutor(@NotNull(message = "error.title.notnull") @Size(min = 2, max = 20) String firstName, @NotNull(message = "error.title.notnull") @Size(min = 2, max = 20) String lastName, @NotNull(message = "error.title.notnull") @Pattern(regexp = ".+@.+\\.[a-z]+", message = "error.accountprofile.email.pattern") String email, @Size(min = 4, max = 255, message = "Minimum username length: 4 characters") String userName, @Size(min = 8, message = "Minimum password length: 8 characters") String password, List<Role> roles) {
        super(firstName, lastName, email, userName, password, roles);
    }
    public Tutor(){}


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
