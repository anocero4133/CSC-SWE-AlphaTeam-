package src.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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
