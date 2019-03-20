//package src.ServiceTest;
//
//import org.junit.Before;
//import org.junit.runner.RunWith;
//import org.mockito.Mock;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.test.context.junit4.SpringRunner;
//import src.Repository.AvailabilityRepository;
//import src.Repository.TutorRepository;
//import src.Service.TutorCoordinatorService;
//
//@RunWith(SpringRunner.class)
//public class TutorCoordinatorServiceTest {
//    @TestConfiguration
//    static class TutorCoordinatorServiceTestConfiguration{
//        @Bean
//        public TutorCoordinatorService tutorCoordinatorService(){
//            return new TutorCoordinatorService();
//        }
//    }
//
//    @Autowired
//    private TutorCoordinatorService tutorCoordinatorService;
//
//    @MockBean
//    private TutorRepository userRepository;
//    @MockBean
//    private AvailabilityRepository availabilityRepository;
//
//    @Before
//    public void setUp() {
//
//    }
//}
