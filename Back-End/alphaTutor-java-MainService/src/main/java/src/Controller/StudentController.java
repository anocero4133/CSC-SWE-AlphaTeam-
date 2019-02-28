package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import src.Model.User;
import src.Service.StudentService;

@RestController
@RequestMapping(value = "api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping(path = "/add")
    public ResponseEntity register(@RequestBody User user) {
        User u = studentService.addUser(user);
        if (u == null) {
            return new ResponseEntity("error.not Tutor", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(u, HttpStatus.OK);
    }
}
