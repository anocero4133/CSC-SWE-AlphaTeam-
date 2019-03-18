package src.ControllerTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import src.Controller.TutorCoordinatorController;
import src.Model.User;
import src.Service.TutorCoordinatorService;
import static org.mockito.Mockito.when;


@RunWith(SpringRunner.class)
@WebMvcTest(TutorCoordinatorController.class)

public class TutorCoordinatorTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TutorCoordinatorService tutorCoordinatorService;

    @Test
    public void test_FindTutorById() throws Exception{
//        User user = new User();

//        when(tutorCoordinatorService.getAllTutors()).thenReturn()
    }
}
