package src.Model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId", updatable = false, nullable = false)
    protected Long userId;

    @NotNull(message = "error.title.notnull")
    @Size(min = 2, max = 20)
    private String firstName;

    @NotNull(message = "error.title.notnull")
    @Size(min = 2, max = 20)
    private String lastName;
    @NotNull(message = "error.title.notnull")
    @Pattern(regexp=".+@.+\\.[a-z]+", message = "error.accountprofile.email.pattern")
    @Column(unique = true)
    private String email;
    @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
    @Column(unique = true, nullable = false)
    private String userName;
    @Size(min = 8, message = "Minimum password length: 8 characters")
    private String password;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "RoleUser", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "role_id",
                    referencedColumnName = "id"))
    private List<Role> roles;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private Chat chat;



    public User() {
    }

    public User(@NotNull(message = "error.title.notnull") @Size(min = 2, max = 20) String firstName, @NotNull(message = "error.title.notnull") @Size(min = 2, max = 20) String lastName, @NotNull(message = "error.title.notnull") @Pattern(regexp = ".+@.+\\.[a-z]+", message = "error.accountprofile.email.pattern") String email, @Size(min = 4, max = 255, message = "Minimum username length: 4 characters") String userName, @Size(min = 8, message = "Minimum password length: 8 characters") String password, List<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.roles = roles;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Map<String,Object>  convertUserToMap(){
        Map<String, Object>  map = new HashMap<>();
        map.put("userId", userId);
        map.put("firstName", firstName);
        map.put("lastName", lastName);
        map.put("email", email);
        map.put("username", userName);
        map.put("roles", roles);
        return map;
    }
//    public Chat getChat() {
//        return chat;
//    }
//
//    public void setChat(Chat chat) {
//        this.chat = chat;
//    }
    @Override
    public  String toString() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);
        }
        catch (JsonProcessingException e){
            e.printStackTrace();
        }
        return null;
    }
}
