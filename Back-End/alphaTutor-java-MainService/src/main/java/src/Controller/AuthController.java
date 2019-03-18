package src.Controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import src.Model.Coordinator;
import src.Model.Student;
import src.Model.User;
import src.Repository.StudentRepository;
import src.Repository.TutorCoordinatorRepository;
import src.Repository.TutorRepository;
import src.Repository.UserRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private JavaMailSender sender;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private TutorCoordinatorRepository tutorCoordinatorRepository;

    @GetMapping(path = "/user/{username}")
    public ResponseEntity getUserByUsername(@PathVariable String username){
        User user = userRepository.findByUserName(username);
        if (user == null){
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(user, HttpStatus.OK);
    }


    @GetMapping(path = "/signUpCode/{email}/{code}")
    public ResponseEntity verifySignUpCode(@PathVariable String email, @PathVariable  String code){
        String correctCode = (String) redisTemplate.opsForValue().get(email);
        if (correctCode.equalsIgnoreCase(code)){
            redisTemplate.delete(email);
            return new ResponseEntity("Code Verified", HttpStatus.OK);
        }
        return new ResponseEntity("Code not Verified", HttpStatus.FORBIDDEN);
    }


    @PostMapping(path = "/login/")
    public ResponseEntity userLogIn(@Valid @RequestBody Map<String, Object> payload){
        JSONObject json = new JSONObject(payload);
        if (!json.has("username") || !json.has("password")){
            return null;
        }
        String username = json.getString("username");
        String password = json.getString("password");
        User user = userRepository.findByUserNameAndPassword(username, password) ;
        if (user == null){
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(user, HttpStatus.OK);
    }
    @PostMapping(path = "/signUp/student")
    public ResponseEntity signUpStudent(@Valid @RequestBody Student student){
        if (studentRepository.findByEmail(student.getEmail()) != null){
            return new ResponseEntity("Student existed", HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity(studentRepository.save(student).convertStudentToMap(), HttpStatus.OK);
    }

    @PostMapping("signUp/coordinator")
    public ResponseEntity addCoordinator (@Valid @RequestBody Coordinator user){
        if (tutorCoordinatorRepository.findByUserName(user.getUserName()) != null || tutorCoordinatorRepository.findByEmail(user.getEmail()) != null){
            return new ResponseEntity("User duplicated", HttpStatus.FORBIDDEN) ;
        }
        return new ResponseEntity(tutorCoordinatorRepository.save(user).convertUserToMap(), HttpStatus.OK);
    }



    @GetMapping("/mail/sendCode/{email}")
    public ResponseEntity sendMail(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        if (user != null){
            return new ResponseEntity("User has already registered" , HttpStatus.CONFLICT);
        }
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        Random rnd = new Random();
        try {
            helper.setTo(email);
            int code = 100000 + rnd.nextInt(900000);
            helper.setText("Hi there, Please enter this code to the app to verify your identity: " +code +"\nPlease notice this code will expire in 1 hour");
            helper.setSubject("Alpha Tutor Verification");
            // Add to redis
            redisTemplate.opsForValue().set(email, code);
            redisTemplate.expire(email, 1,TimeUnit.HOURS);
        } catch (MessagingException e) {
            e.printStackTrace();
            return new ResponseEntity("Error sending the email", HttpStatus.FORBIDDEN);
        }
        sender.send(message);
        return new ResponseEntity("Sent Email", HttpStatus.ACCEPTED);
    }

    @PostMapping(path = "/forgetUsername/{email}")
    public ResponseEntity userForgetUsername(@PathVariable String email) {
            User user = userRepository.findByEmail(email)  ;
            if (user == null){
                return new ResponseEntity("User not found" , HttpStatus.NOT_FOUND);
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

        User user = userRepository.findByEmail(email);
        if (user == null){
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        }
        JSONObject json = new JSONObject(map);
        String passWord = json.getString("password");
        if (passWord.length() < 8){
            return new ResponseEntity("Password not enough length", HttpStatus.BAD_REQUEST);
        }
        user.setPassword(passWord);
        System.out.println(user);
        return new ResponseEntity(studentRepository.save((Student)user), HttpStatus.OK);
    }
    @PostMapping(path = "/sendPasswordReset/{email}")
    public ResponseEntity sendPasswordReset(@PathVariable String email){
        User user = userRepository.findByEmail(email)  ;
        if (user == null){
            return new ResponseEntity("User not found" , HttpStatus.NOT_FOUND);
        }
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(email);
            helper.setText("Hi, Click here to reset the password: \n" + "http://localhost:3000/reset/password/" + email);
            helper.setSubject("ALPHA TUTOR PASSWORD RESET");
        } catch (MessagingException e) {
            e.printStackTrace();
            return new ResponseEntity("Error sending the email", HttpStatus.FORBIDDEN);
        }
        sender.send(message);
        return new ResponseEntity("Send username successfully", HttpStatus.OK);
    }


}
