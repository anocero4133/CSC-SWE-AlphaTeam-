package src.ControllerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import src.Controller.AuthController;
import src.Model.Coordinator;
import src.Model.Role;
import src.Model.Student;
import src.Model.User;
import src.Repository.StudentRepository;
import src.Repository.TutorCoordinatorRepository;
import src.Repository.UserRepository;

import java.util.Arrays;
import java.util.HashMap;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;

@RunWith(SpringRunner.class)
@WebMvcTest(AuthController.class)
public class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private JavaMailSender sender;

    @MockBean
    private StudentRepository studentRepository;

    @MockBean
    private TutorCoordinatorRepository tutorCoordinatorRepository;

    @MockBean
    private RedisTemplate<String , Object> redisTemplate;

   @Before
   @Disabled
   public void setUp(){

   }

   @DisplayName("Log in user successfully")
   @Test
    public void test_LogInUser_thenReturnUserJSON() throws  Exception{
       User student = new Student("Emily", "Tran", "emilfffay@tran.com", "emiaaan", "123123131233", Arrays.asList(new Role("Student", "Student at GSU")), false);
       given(userRepository.findByUserNameAndPassword("emiaaan", "123123131233")).willReturn(student);
       HashMap<String, String> map = new HashMap<>();
       map.put("username", "emiaaan");
       map.put("password", "123123131233");
       ObjectMapper mapper = new ObjectMapper();
       mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
       ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
       String requestJson=ow.writeValueAsString(map);
       this.mockMvc.perform(post("/api/auth/login/").contentType(MediaType.APPLICATION_JSON)
               .content(requestJson))
               .andExpect(status().isOk())
               .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("email", is(student.getEmail())));
   }
   @DisplayName("Get username successfully")
   @Test
    public void test_getUserByUsername_thenReturnUserJSON() throws Exception{
       User student = new User("Emily", "Tran", "emilfffay@tran.com", "emiaaan", "123123131233", Arrays.asList(new Role("Student", "Student at GSU")));
       given(userRepository.findByUserName("emiaaan")).willReturn(student);
       this.mockMvc.perform(get("/api/auth/user/{username}", student.getUserName())
               .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(jsonPath("email", is("emilfffay@tran.com")));

       this.mockMvc.perform(get("/api/auth/user/adasdad").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound());
   }

   @DisplayName("Sign Up successfully")
   @Test
    public void test_signUpNewStudent_thenReturnStudentJSON() throws Exception{
       Student student = new Student("Emily", "Tran", "emilfffay@tran.com", "emiaaan", "123123131233", Arrays.asList(new Role("Student", "Student at GSU")), false);
       given(studentRepository.save(student)).willReturn(student);
       this.mockMvc.perform(post("/api/auth/signUp/student").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(student.toString()))
               .andExpect(status().isOk());
       Coordinator coordinator = new Coordinator("Emily", "Tran", "emilffadddddfay@tran.com", "ddsddsad", "123123131233", Arrays.asList(new Role("Coordinator", "Coordinator at GSU")) );
       given(tutorCoordinatorRepository.save(coordinator)).willReturn(coordinator);
       this.mockMvc.perform(post("/api/auth/signUp/coordinator").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(student.toString()))
               .andExpect(status().isOk());
   }

   // This will cause the validation crashed - and try to validate
   @Test
    public void test_validationInput () throws  Exception{
       Student student = new Student("Emily", "Tran", "emilfffay@tran.com", "emiaaan", "123", Arrays.asList(new Role("Student", "Student at GSU")), false);
       given(studentRepository.save(student)).willReturn(student);
       this.mockMvc.perform(post("/api/auth/signUp/student").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(student.toString()))
               .andExpect(status().isBadRequest());
       student.setEmail("notAnEmail");
       this.mockMvc.perform(post("/api/auth/signUp/student").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(student.toString()))
               .andExpect(status().isBadRequest());
       student.setLastName("1");
       this.mockMvc.perform(post("/api/auth/signUp/student").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(student.toString()))
               .andExpect(status().isBadRequest());
       student.setFirstName("1");
       this.mockMvc.perform(post("/api/auth/signUp/student").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(student.toString()))
               .andExpect(status().isBadRequest());
       student.setRoles(Arrays.asList());
       this.mockMvc.perform(post("/api/auth/signUp/student").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(student.toString()))
               .andExpect(status().isBadRequest());
   }

}
