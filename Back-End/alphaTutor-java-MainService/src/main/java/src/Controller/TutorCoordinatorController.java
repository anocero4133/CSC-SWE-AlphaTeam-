package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import src.Model.Availability;
import src.Model.User;
import src.Service.TutorCoordinatorService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/tutorCoordinator")
public class TutorCoordinatorController {

    @Autowired
    private TutorCoordinatorService tutorCoordinatorService;
    @PostMapping(path = "/tutor")
    public ResponseEntity addTutor(@RequestBody User user){
            User u = tutorCoordinatorService.addTutor(user);
            if (u == null){
                return new ResponseEntity("error.notTutor", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(u, HttpStatus.OK);
    }
    @PostMapping(path = "/tutor/schedule")
     public ResponseEntity addTutorSchedule(@RequestBody User user){
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

}
