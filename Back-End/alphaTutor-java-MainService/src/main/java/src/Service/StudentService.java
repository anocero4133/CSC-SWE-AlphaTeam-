package src.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.Model.User;
import src.Repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) { return userRepository.save(user); }
    public Iterable<User> viewUsers() {
        Iterable<User> users = userRepository.findAll();
        List<User> tutors = new ArrayList<User>();
        for(User user : users) {
            if (user.getRoles().contains("Tutor")) {
                tutors.add(user);
            }
        }
        return tutors;
    }

}
