package pt.isel.leic.ps.g42.criart.services

import org.slf4j.LoggerFactory
import org.springframework.mail.MailException
import org.springframework.mail.MailSender
import org.springframework.mail.SimpleMailMessage
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.SendEmailException

import java.util.*

@Service
class EmailService(private val mailSender: MailSender) {

    val log = LoggerFactory.getLogger(EmailService::class.java.name)

    fun sendRegistrationMail(emailAddress: String) {

        var mailMessage = SimpleMailMessage()
        log.info("Mail Banana")
        mailMessage.setTo(emailAddress)
        mailMessage.setFrom("criartserviceacc@gmail.com")
        mailMessage.setSubject("Account creation")
        mailMessage.setText("Your account has been succesfully registered!")
        log.info("Mail Slam Banana")
        try {
            this.mailSender.send(mailMessage)
            log.info("Super Mail Slam Banana")
        } catch(exception: MailException) {
            println(exception.message)
            log.info("Super Mail Slam Banana Catch")
            throw SendEmailException()
        }
    }

    fun sendPasswordRecoveryEmail(emailAddress: String, url: String) {
        
    }


    fun sendEmailAddressChangeEmail() {

    }

}