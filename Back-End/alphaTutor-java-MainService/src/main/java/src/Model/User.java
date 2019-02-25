package src.Model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
public class User {

    @Id
    private Long userId;

    @NotNull(message = "error.title.notnull")
    @Size(min = 5, max = 20)
    private String firstName;

    @NotNull(message = "error.title.notnull")
    @Size(min = 5, max = 20)
    private String lastName;
    @NotNull(message = "error.title.notnull")
    @Pattern(regexp=".+@.+\\.[a-z]+", message = "error.accountprofile.email.pattern")
    private String email;
    @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
    @Column(unique = true, nullable = false)
    private String userName;

    @Size(min = 8, message = "Minimum password length: 8 characters")
    private String password;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_role", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "role_id",
                    referencedColumnName = "id"))
    private List<Role> roles;


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


    public User(@NotNull(message = "error.title.notnull") @Size(min = 5, max = 20) String firstName) {
        this.firstName = firstName;
    }

    public User() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
