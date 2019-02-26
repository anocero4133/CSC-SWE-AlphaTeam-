package src.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.Model.Availability;
import src.Model.Role;
import src.Model.User;
import src.Repository.AvailabilityRepository;
import src.Repository.UserRepository;

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

    public User addTutor(User user){
        if (checkIfTutor(user.getRoles())) {
           return  userRepository.save(user);
        }
        return null;
    }

    public Iterable<Availability> addTutorAvailability(User user){
            if (checkIfTutor(user.getRoles())) {
               return availabilityRepository.saveAll(user.getAvailabilities()) ;
            }
            return null;
    }


    public Iterable<Availability> addTutorAvailabilityByUsername(String userName, List<Availability> availabilities){
        User user = userRepository.findUserByUserName(userName);
        if (user == null){
            return null;
        }
        user.setAvailabilities(availabilities);
        return availabilityRepository.saveAll(availabilities);
    }
}
