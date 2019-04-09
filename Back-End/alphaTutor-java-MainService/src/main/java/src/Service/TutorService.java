package src.Service;

import org.springframework.stereotype.Service;

@Service
public class TutorService {
    private static TutorService instance;
    private TutorService() {}
    public static TutorService getInstance() {
        if (instance == null) {
            instance = new TutorService();
        }
        return instance;
    }
}
