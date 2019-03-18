package src;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import src.Controller.AuthController;
import src.Controller.StudentController;
import src.Controller.TutorCoordinatorController;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class alphaTutorApplicationTest {

    // Application Context Test.
    @Autowired
    private AuthController authController;
    @Autowired
    private StudentController studentController;
    @Autowired
    private TutorCoordinatorController tutorCoordinatorController;
    @Test
    public void contextLoads() throws Exception {
//        // Check if all the controllers are up and running
        assertThat(authController).isNotNull();
        assertThat(studentController).isNotNull();
        assertThat(tutorCoordinatorController).isNotNull();
    }
}
