package src.ControllerTest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import src.Controller.TutorCoordinatorController;
import src.Model.Availability;
import src.Model.Role;
import src.Model.Tutor;
import src.Service.TutorCoordinatorService;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
@RunWith(SpringRunner.class)
@WebMvcTest(TutorCoordinatorController.class)

public class TutorCoordinatorTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TutorCoordinatorService tutorCoordinatorService;

    @Before
    public void setUp(){
        Tutor someOne = new Tutor("someone1","some", "someone1@gmail.com", "someone1","somethinghere", Arrays.asList(new Role("Tutor", "Tutor at GSU")));
        someOne.setAvailabilities(Arrays.asList(
                new Availability("10:30","11:00", "Monday"),
                new Availability("10:30","11:00", "Tuesday"),
                new Availability("10:30","11:00", "Wednesday"),
                new Availability("10:30","11:00", "Thursday"),
                new Availability("10:30","11:00", "Friday"),
                new Availability("9:30","10:00", "Monday"),
                new Availability("9:30","10:00", "Tuesday"),
                new Availability("9:30","10:00", "Wednesday"),
                new Availability("9:30","10:00", "Thursday"),
                new Availability("9:30","10:00", "Friday"),
                new Availability("11:30","12:00", "Monday"),
                new Availability("11:30","12:00", "Tuesday"),
                new Availability("11:30","12:00", "Wednesday"),
                new Availability("11:30","12:00", "Thursday")
                ));
        Tutor someOne2 = new Tutor("someone1","some", "someondde1@gmail.com", "sfdfdfomeone1","somethinghere", Arrays.asList(new Role("Tutor", "Tutor at GSU")));
        given(tutorCoordinatorService.addTutor(someOne)).willReturn(someOne);
        given(tutorCoordinatorService.addTutor(someOne2)).willReturn(someOne2);
        given(tutorCoordinatorService.getAllTutors()).willReturn(Arrays.asList(someOne, someOne2));
        given(tutorCoordinatorService.getScheduleForTutor(someOne.getUserName())).willReturn(someOne.getAvailabilities());
    }


    @Test
    public void test_deleteTutorByUsername() throws Exception {
        given(tutorCoordinatorService.deleteUserByUserName("someone1")).willReturn(true);
        this.mockMvc.perform(delete("/api/tutorCoordinator/tutor/{username}", "someone1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
        this.mockMvc.perform(delete("/api/tutorCoordinator/tutor/{username}", "someone1" + "error here").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound());
    }

    @Test
    public void test_getAllTutors() throws  Exception{
        this.mockMvc.perform(get("/api/tutorCoordinator/tutor/all")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void test_getAllSchedule() throws Exception{
        this.mockMvc.perform(get("/api/tutorCoordinator/tutor/schedule/{username}", "someone1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(14)));
    }


    @Test
    public void test_addTutor() throws  Exception{
        Tutor someOne2 = new Tutor("someone1","some", "someondde1@gmail.com", "sfdfdfomeone1","somethinghere", Arrays.asList(new Role("Tutor", "Tutor at GSU")));

        given(tutorCoordinatorService.addTutor(someOne2)).willReturn(null);
        // Wrong HTTP call
        this.mockMvc.perform(get("/api/tutorCoordinator/tutor").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
        // Missed a lot of things such as courses
        this.mockMvc.perform(post("/api/tutorCoordinator/tutor").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
