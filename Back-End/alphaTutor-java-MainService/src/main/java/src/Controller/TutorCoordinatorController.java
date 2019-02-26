package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import src.Model.Availability;
import src.Model.User;
import src.Service.TutorCoordinatorService;

import javax.validation.Valid;

@RestController
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


}
