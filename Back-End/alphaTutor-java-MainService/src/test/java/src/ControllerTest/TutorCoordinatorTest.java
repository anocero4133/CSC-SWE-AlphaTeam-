package src.ControllerTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import src.Controller.TutorCoordinatorController;
import src.Model.Role;
import src.Model.Tutor;
import src.Service.TutorCoordinatorService;

import java.util.Arrays;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;
@RunWith(SpringRunner.class)
@WebMvcTest(TutorCoordinatorController.class)

public class TutorCoordinatorTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TutorCoordinatorService tutorCoordinatorService;

    @Test
    public void test_deleteTutorByUsername() throws Exception {
        Tutor someOne = new Tutor("someone1","some", "someone1@gmail.com", "someone1","somethinghere", Arrays.asList(new Role("Tutor", "Tutor at GSU")));
        given(tutorCoordinatorService.deleteUserByUserName(someOne.getUserName())).willReturn(true);
        this.mockMvc.perform(delete("/api/tutorCoordinator/tutor/{username}", someOne.getUserName()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
        this.mockMvc.perform(delete("/api/tutorCoordinator/tutor/{username}", someOne.getUserName() + "error here").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound());
    }

    @Test
    public void test_getAllTutors() throws  Exception{
        Tutor someOne = new Tutor("someone1","some", "someone1@gmail.com", "someone1","somethinghere", Arrays.asList(new Role("Tutor", "Tutor at GSU")));
        Tutor someOne2 = new Tutor("someone1","some", "someondde1@gmail.com", "sfdfdfomeone1","somethinghere", Arrays.asList(new Role("Tutor", "Tutor at GSU")));
        given(tutorCoordinatorService.getAllTutors()).willReturn(Arrays.asList(someOne, someOne2));
        this.mockMvc.perform(get("/api/tutorCoordinator/tutor/all")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2)));
    }
}
