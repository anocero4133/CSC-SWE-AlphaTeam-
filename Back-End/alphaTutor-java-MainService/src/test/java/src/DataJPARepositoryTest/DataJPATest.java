package src.DataJPARepositoryTest;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import src.Model.*;
import src.Repository.StudentRepository;
import src.Repository.TutorCoordinatorRepository;
import src.Repository.TutorRepository;
import src.Repository.UserRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class DataJPATest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TutorCoordinatorRepository tutorCoordinatorRepository;
    @Autowired
    private TutorRepository tutorRepository;
    @Before
    public void setUp() {
        Student student = new Student("Emily", "Tran", "emilfffay@tran.com", "emiaaan", "123123131233", Arrays.asList(new Role("Student", "Student at GSU")), false);
        Coordinator coordinator = new Coordinator("Thong", "Tran","ttt@pdx.edu", "thongtran715", "dasdadadasd",Arrays.asList(new Role("Tutor coordinator")));
        Tutor someOne = new Tutor("someone1","some", "someone1@gmail.com", "someone1","somethinghere", Arrays.asList(new Role("Tutor", "Tutor at GSU")));
        someOne.setAvailabilities(Arrays.asList(new Availability("10:30","11:00","Monday")));
        someOne.setCourses(Arrays.asList(new CSCourses("Computer Organization", "CSC 3210")));
        tutorRepository.save(someOne);
        studentRepository.save(student);
        tutorCoordinatorRepository.save(coordinator);
    }

    @DisplayName("Sign Up test Successfully")
    @Test
    public void test_SignUpStudent() {
        assertEquals("Student Emily is saved", "emiaaan", studentRepository.findByEmail("emilfffay@tran.com").getUserName());
        assertEquals("Tutor coordinator Thong is saved", "thongtran715", tutorCoordinatorRepository.findByEmail("ttt@pdx.edu").getUserName());
        assertEquals("Tutor someone is saved", "someone1", tutorRepository.findByEmail("someone1@gmail.com").getUserName());
    }

    @DisplayName("Log in test Successfully")
    @Test
    public void test_LogInUser()  {
        // Student Log in
        Student student = (Student) userRepository.findByUserNameAndPassword("Something", "something");
        // Expected Error
        assertEquals("User not found", null, student);
        // Expected Success
        student = (Student)userRepository.findByUserNameAndPassword("emiaaan","123123131233");
        assertEquals("User found", "emilfffay@tran.com", student.getEmail());
        // Tutor Coordinator Log in
        Coordinator coordinator = (Coordinator) userRepository.findByUserNameAndPassword("thongtran715", "dasdadadasd");
        assertEquals("Coordinator found", "ttt@pdx.edu" ,coordinator.getEmail());
    }

    @Test
    public void test_deleteUser()  {
        Student student = studentRepository.findByEmail("emilfffay@tran.com");
        studentRepository.delete(student);
        assertEquals("Student Emily is deleted", null, studentRepository.findByEmail("emilfffay@tran.com"));
        Tutor tutor = tutorRepository.findByEmail("someone1@gmail.com");
        tutorRepository.delete(tutor);
        assertEquals("Tutor somone is deleted", null, tutorRepository.findByEmail("someone1@gmail.com"));

    }
    @Test
    public void test_getAllTutors(){
        Iterable<Tutor> tutorIterator = tutorRepository.findAll();
        int count = 0 ;
        for (Tutor tutor: tutorIterator) {
            count += 1;
        }
        assertEquals("The number of tutor is 1", 1, count);
    }

}
