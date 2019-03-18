package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import src.Model.Student;
import src.Repository.StudentRepository;
import src.Service.StudentService;

@RestController
@RequestMapping(value = "api/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private StudentRepository studentRepository;
    @PostMapping(path = "/add")
    public ResponseEntity register(@RequestBody Student user) {
        studentRepository.save(user) ;
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @GetMapping(path = "/view")
    public ResponseEntity view() {
        return new ResponseEntity(studentService.viewUsers(), HttpStatus.OK);
    }
}
