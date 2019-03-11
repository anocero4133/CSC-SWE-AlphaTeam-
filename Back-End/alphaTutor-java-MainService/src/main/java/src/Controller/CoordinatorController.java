package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import src.Model.User;
import src.Repository.UserRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/coordinator")
public class CoordinatorController {

    @Autowired
    private UserRepository userRepository;
    @PostMapping("")
    public ResponseEntity addCoordinator (@Valid @RequestBody User user){
        return new ResponseEntity(userRepository.save(user), HttpStatus.OK);

    }
}
