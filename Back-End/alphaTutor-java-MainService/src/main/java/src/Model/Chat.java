//package src.Model;
//
//import javax.persistence.*;
//
//@Entity
//public class Chat {
//    @Id
//    @Column(name ="id")
//    private Long id;
//
//    @OneToOne
//    @MapsId
//    private User fromUser;
//
//    @OneToOne
//    @MapsId
//    private User toUser;
//
//    private String message;
//
//    public Chat() {
//    }
//
//    public Chat(Long id, User fromUser, User toUser, String message) {
//        this.id = id;
//        this.fromUser = fromUser;
//        this.toUser = toUser;
//        this.message = message;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public User getFromUser() {
//        return fromUser;
//    }
//
//    public void setFromUser(User fromUser) {
//        this.fromUser = fromUser;
//    }
//
//    public User getToUser() {
//        return toUser;
//    }
//
//    public void setToUser(User toUser) {
//        this.toUser = toUser;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//}
