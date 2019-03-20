package src.MailSenderTest;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.test.context.junit4.SpringRunner;
import src.Model.Mail;

import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Random;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringMailIntegrationTest {
    @Autowired
    private JavaMailSender sender;
    @Rule
    public SmtpServerRule smtpServerRule = new SmtpServerRule(2525);

    @Test
    public void shouldSendSingleMail() throws javax.mail.MessagingException, IOException
    {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        Mail mail = new Mail();
        mail.setFrom("info@memorynotfound.com");
        mail.setTo("no-reply@memorynotfound.com");
        mail.setSubject("Alpha Tutor Verification");
        try {
            Random rnd = new Random();
            int code = 100000 + rnd.nextInt(900000);
            mail.setContent("Hi there, Please enter this code to the app to verify your identity: " +code +"\nPlease notice this code will expire in 1 hour");
            helper.setFrom(mail.getFrom());
            helper.setTo(mail.getTo());
            helper.setText(mail.getContent());
            helper.setSubject(mail.getSubject());
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
        sender.send(message);
        MimeMessage[] receivedMessages = smtpServerRule.getMessages();
        assertEquals(1, receivedMessages.length);
        MimeMessage current = receivedMessages[0];
        assertEquals("Alpha Tutor Verification" ,current.getSubject());
        assertEquals("no-reply@memorynotfound.com", current.getAllRecipients()[0].toString());
//        assertEquals(mail.getContent(), current.getContent());
    }
}
