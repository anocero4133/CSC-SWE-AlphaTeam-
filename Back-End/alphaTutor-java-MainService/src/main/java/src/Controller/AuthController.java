package src.Controller;

import org.apache.http.HttpResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import src.Model.User;
import src.Repository.UserRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private JavaMailSender sender;
    @Autowired
    private UserRepository userRepository;
    @PostMapping(path = "/login/")
    public ResponseEntity userLogIn(@Valid @RequestBody Map<String, Object> payload){
        JSONObject json = new JSONObject(payload);
        if (!json.has("username") || !json.has("password")){
            return null;
        }
        String username = json.getString("username");
        String password = json.getString("password");
        User user = userRepository.findUserByUserNameAndPassword(username, password) ;
        if (user == null){
            return new ResponseEntity("User not foundl", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @PostMapping("/mail/sendCode/{email}")
    public ResponseEntity sendMail(@PathVariable String email) {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        Random rnd = new Random();
        try {
            helper.setTo(email);
            int code = 100000 + rnd.nextInt(900000);
            helper.setText("Hi there, Please enter this code to the app to verify your identity: " +code);
            helper.setSubject("Alpha Tutor Verification");
        } catch (MessagingException e) {
            e.printStackTrace();
            return new ResponseEntity("Error sending the email", HttpStatus.FORBIDDEN);
        }
        sender.send(message);
        return new ResponseEntity("Sent Email", HttpStatus.ACCEPTED);
    }

    @PostMapping(path = "/forgetUsername/{email}")
    public ResponseEntity userForgetUsername(@PathVariable String email) {
            User user = userRepository.findUserByEmail(email)  ;
            if (user == null){
                return null;
            }
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(email);
            helper.setText("Hi, here is your username: " + user.getUserName());
            helper.setSubject("Username recovery");
        } catch (MessagingException e) {
            e.printStackTrace();
            return new ResponseEntity("Error sending the email", HttpStatus.FORBIDDEN);
        }
        sender.send(message);
        return new ResponseEntity("Send username successfully", HttpStatus.OK);
    }

    @PutMapping(path = "/forgetPassword/{email}")
    public ResponseEntity userForgetPassword(@PathVariable String email, @RequestBody Map<String, Object> map){
        User user = userRepository.findUserByEmail(email);
        if (user == null){
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        }
        JSONObject json = new JSONObject(map);
        String passWord = json.getString("password");
        user.setPassword(passWord);
        return new ResponseEntity(userRepository.save(user), HttpStatus.OK);
    }

    @GetMapping(path = "/api/auth/{username}/{password}")
    public User validateUser(@PathVariable String username, @PathVariable String password){
        User user = userRepositorydd.
    }
}