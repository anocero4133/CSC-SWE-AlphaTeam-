package src.ControllerTest;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import src.Controller.AuthController;
import src.Controller.TutorCoordinatorController;
import src.Model.User;
import src.Repository.UserRepository;
import static org.junit.Assert.*;

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
    private RedisTemplate<String, Object> redisTemplate;
    @Test
    public void test_LogInUser() throws Exception{
        User user = userRepository.findUserByUserName("ads");
        assertEquals(null, user);

        user = userRepository.findUserByUserName("austinhonest");
        System.out.println(userRepository.findAll());
        assertEquals("anocero1@student.gsu.edu", user.getEmail());
    }

}
