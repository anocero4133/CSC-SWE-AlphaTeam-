package src.Model;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

@Entity
public class Student extends User {
    public Student(boolean isVerified) {
        this.isVerified = isVerified;
    }

    public Student() {
    }

    public Student(@NotNull(message = "error.title.notnull") @Size(min = 2, max = 20) String firstName, @NotNull(message = "error.title.notnull") @Size(min = 2, max = 20) String lastName, @NotNull(message = "error.title.notnull") @Pattern(regexp = ".+@.+\\.[a-z]+", message = "error.accountprofile.email.pattern") String email, @Size(min = 4, max = 255, message = "Minimum username length: 4 characters") String userName, @Size(min = 8, message = "Minimum password length: 8 characters") String password, List<Role> roles, boolean isVerified) {
        super(firstName, lastName, email, userName, password, roles);
        this.isVerified = isVerified;
    }

    private boolean isVerified;

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public Map<String, Object> convertStudentToMap(){
        Map<String , Object> map = super.convertUserToMap();
        return map;
    }
}
