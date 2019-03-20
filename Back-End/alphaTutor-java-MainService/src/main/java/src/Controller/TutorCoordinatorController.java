package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import src.Model.Availability;
import src.Model.Tutor;
import src.Service.TutorCoordinatorService;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "https://tutor-gsu.herokuapp.com")
@RequestMapping(value = "api/tutorCoordinator")
public class TutorCoordinatorController {

    @Autowired
    private TutorCoordinatorService tutorCoordinatorService;
//    @PutMapping(path = "/{tutor_id}")
//    public ResponseEntity editTutor(@RequestBody User user, @PathVariable Long tutor_id){
//        User u = tutorCoordinatorService.findTutorById(tutor_id);
//        if (u == null){
//            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
//        }
//        u = u.setUser(user);
//        tutorCoordinatorService.editTutor(u);
//        return new ResponseEntity(u, HttpStatus.OK);
//    }


    @PostMapping(path = "/tutor")
    public ResponseEntity addTutor(@RequestBody Tutor user){
            Tutor u = (Tutor) tutorCoordinatorService.addTutor(user);
            if (u == null){
                return new ResponseEntity("error.notTutor", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(u.convertTutorToMap(), HttpStatus.OK);
    }
    @PostMapping(path = "/tutor/schedule")
     public ResponseEntity addTutorSchedule(@RequestBody Tutor user){
            Iterable<Availability> u = tutorCoordinatorService.addTutorAvailability(user);
            if (u == null){
                return new ResponseEntity("error.notTutor", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(u, HttpStatus.OK);
    }
    @PostMapping(path = "/tutor/schedule/{username}")
    public ResponseEntity  addTutorScheduleViaUserName(@PathVariable(required = false) String username, @RequestBody List<Availability> availabilities){
        Iterable<Availability> availabilities1 = tutorCoordinatorService.addTutorAvailabilityByUsername(username, availabilities);
        if (availabilities1 == null){
            return new ResponseEntity("error.notTutor", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(availabilities1, HttpStatus.OK);
    }

    @DeleteMapping(path = "/tutor/{userName}")
    public ResponseEntity deleteUser (@PathVariable String userName) {
        if (tutorCoordinatorService.deleteUserByUserName(userName)){
            return new ResponseEntity("User " + userName + " has been deleted ", HttpStatus.OK) ;
        }
        return new ResponseEntity("User not found or user is not tutor" , HttpStatus.NOT_FOUND);
    }


    @GetMapping(path = "/tutor/all")
    public ResponseEntity getAllTutors(){
        return new ResponseEntity(tutorCoordinatorService.getAllTutors(), HttpStatus.OK);
    }
    @GetMapping(path = "/tutor/schedule/{username}")
    public ResponseEntity getScheduleForTutor(@PathVariable(required = true) String username){
        Iterable<Availability> availabilities = tutorCoordinatorService.getScheduleForTutor(username);
        if (availabilities == null){
            return new ResponseEntity("Tutor not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(availabilities, HttpStatus.OK);
    }
}
