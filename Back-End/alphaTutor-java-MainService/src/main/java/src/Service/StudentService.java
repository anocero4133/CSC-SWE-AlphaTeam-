package src.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.Model.Student;
import src.Model.User;
import src.Repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository userRepository;

    public User addUser(Student user) { return userRepository.save(user); }
    public Iterable<Student> viewUsers() {
        Iterable<Student> users = userRepository.findAll();
        List<Student> tutors = new ArrayList<Student>();
        for(Student user : users) {
            if (user.getRoles().contains("Tutor")) {
                tutors.add(user);
            }
        }
        return tutors;
    }

}
