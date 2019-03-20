package src.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.Model.Availability;
import src.Model.Role;
import src.Model.Tutor;
import src.Model.User;
import src.Repository.AvailabilityRepository;
import src.Repository.TutorRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TutorCoordinatorService {

    @Autowired
    private TutorRepository tutorRepository;
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
        return tutorRepository.findByUserId(id);
    }

    public User addTutor(Tutor user){

        if (tutorRepository.findByUserName(user.getUserName()) != null){
            return null;
        }
        if (tutorRepository.findByEmail(user.getEmail()) != null){
            return null;
        }
        if (user.getAvailabilities().isEmpty()) {
            return null;
        }
        if (user.getAvailabilities().size() > 20) {
            return null;
        }
        if (user.getCourses().isEmpty()){
            return null;
        }

        if (checkIfTutor(user.getRoles())) {
           return  tutorRepository.save(user);
        }
        return null;
    }
    public boolean deleteUserByUserName(String userName){
        Tutor user = tutorRepository.findByUserName(userName);
        if (user == null){return false;}
        if (checkIfTutor(user.getRoles())) {
            tutorRepository.delete(user);
            return true;
        }
        return false;
    }

    public boolean deleteUser(Tutor user){
        if (checkIfTutor(user.getRoles())) {
            tutorRepository.delete(user);
            return true;
        }
        return false;
    }

    public Iterable<Availability> addTutorAvailability(Tutor user){
            if (checkIfTutor(user.getRoles())) {
               return availabilityRepository.saveAll(user.getAvailabilities()) ;
            }
            return null;
    }

    public Iterable<Availability> addTutorAvailabilityByUsername(String userName, List<Availability> availabilities){
        Tutor user = (Tutor) tutorRepository.findByUserName(userName);
        if (user == null) {return null;}
        if (checkIfTutor(user.getRoles())) {
            user.setAvailabilities(availabilities);
            return availabilityRepository.saveAll(availabilities);
        }
        return null;
    }

    public User editTutor (Tutor user){
        if (checkIfTutor(user.getRoles())) {
            return tutorRepository.save(user);
        }
        return null;
    }

    public Iterable<Availability> editTutorSchedule(String username, List<Availability> availabilities){
        Tutor user = (Tutor) tutorRepository.findByUserName(username);
        if (user == null) {return null;}
        if (checkIfTutor(user.getRoles())){
            user.setAvailabilities(availabilities);
            return availabilityRepository.saveAll(availabilities);
        }
        return null;
    }
    public List<Tutor> getAllTutors(){
        Iterable<Tutor> allUsers = tutorRepository.findAll();
        List<Tutor> tutors = new ArrayList<Tutor>();
        for (Tutor user: allUsers) {
            if (checkIfTutor(user.getRoles())){
                tutors.add(user);
            }
        }
        return tutors;
    }
    public Iterable<Availability> getScheduleForTutor(String username){
        Tutor tutor  = (Tutor) tutorRepository.findByUserName(username);
        if (tutor == null){return null;}
        return tutor.getAvailabilities();
    }

    public Tutor getTutor(String username){
        Tutor tutor = (Tutor)tutorRepository.findByUserName(username);
        return tutor;
    }
}
