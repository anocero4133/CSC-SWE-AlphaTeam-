package src.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.Model.Availability;
import src.Model.Role;
import src.Model.User;
import src.Repository.AvailabilityRepository;
import src.Repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TutorCoordinatorService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AvailabilityRepository availabilityRepository;


    public TutorCoordinatorService() {
    }
    private boolean checkIfTutor(List<Role> roles) {
        for (Role role : roles) {
            if (role.getRoleName().equalsIgnoreCase("Tutor")){
                return true;
            }
        }
        return false;
    }

    public User findTutorById(Long id) {
        return userRepository.findUserByUserId(id);
    }

    public User addTutor(User user){
        if (userRepository.findUserByUserName(user.getUserName()) != null){
            return null;
        }
        if (userRepository.findUserByEmail(user.getEmail()) != null){
            return null;
        }
        if (checkIfTutor(user.getRoles())) {
           return  userRepository.save(user);
        }
        return null;
    }
    public boolean deleteUserByUserName(String userName){
        User user = userRepository.findUserByUserName(userName);
        if (user == null){return false;}
        if (checkIfTutor(user.getRoles())) {
            userRepository.delete(user);
            return true;
        }
        return false;
    }

    public boolean deleteUser(User user){
        if (checkIfTutor(user.getRoles())) {
            userRepository.delete(user);
            return true;
        }
        return false;
    }

    public Iterable<Availability> addTutorAvailability(User user){
            if (checkIfTutor(user.getRoles())) {
               return availabilityRepository.saveAll(user.getAvailabilities()) ;
            }
            return null;
    }

    public Iterable<Availability> addTutorAvailabilityByUsername(String userName, List<Availability> availabilities){
        User user = userRepository.findUserByUserName(userName);
        if (user == null) {return null;}
        if (checkIfTutor(user.getRoles())) {
            user.setAvailabilities(availabilities);
            return availabilityRepository.saveAll(availabilities);
        }
        return null;
    }

    public User editTutor (User user){
        if (checkIfTutor(user.getRoles())) {
            return userRepository.save(user);
        }
        return null;
    }

    public Iterable<Availability> editTutorSchedule(String username, List<Availability> availabilities){
        User user = userRepository.findUserByUserName(username);
        if (user == null) {return null;}
        if (checkIfTutor(user.getRoles())){
            user.setAvailabilities(availabilities);
            return availabilityRepository.saveAll(availabilities);
        }
        return null;
    }
    public Iterable<User> getAllTutors(){
        Iterable<User> allUsers = userRepository.findAll();
        List<User> tutors = new ArrayList<>();
        for (User user: allUsers) {
            if (checkIfTutor(user.getRoles())){
                tutors.add(user);
            }
        }
        return tutors;
    }


}
