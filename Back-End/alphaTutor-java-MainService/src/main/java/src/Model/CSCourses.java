package src.Model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CSCourses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long csCourseId;

    private String csCourseName;

    private String courseCRN ;

    public CSCourses(String csCourseName, String courseCRN) {
        this.csCourseName = csCourseName;
        this.courseCRN = courseCRN;
    }

    public CSCourses() {
    }

    public Long getCsCourseId() {
        return csCourseId;
    }

    public void setCsCourseId(Long csCourseId) {
        this.csCourseId = csCourseId;
    }

    public String getCsCourseName() {
        return csCourseName;
    }

    public void setCsCourseName(String csCourseName) {
        this.csCourseName = csCourseName;
    }

    public String getCourseCRN() {
        return courseCRN;
    }

    public void setCourseCRN(String courseCRN) {
        this.courseCRN = courseCRN;
    }
}
