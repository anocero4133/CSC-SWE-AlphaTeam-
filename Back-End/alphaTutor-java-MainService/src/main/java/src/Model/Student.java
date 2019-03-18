package src.Model;

import javax.persistence.Entity;
import java.util.Map;

@Entity
public class Student extends User {

    private boolean isVerified;

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public Map<String, Object> convertStudentToMap(){
        Map<String , Object> map = super.convertUserToMap();
        map.remove("password");
        map.put("isVerified", isVerified) ;
        return map;
    }
}
