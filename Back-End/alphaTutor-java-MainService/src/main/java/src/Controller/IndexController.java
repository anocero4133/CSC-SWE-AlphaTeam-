package src.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api")
public class IndexController {

    @GetMapping(value = "/hello")
    public String hello(){
        return "Hello world";
    }


}
