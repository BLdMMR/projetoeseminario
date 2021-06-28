package pt.isel.leic.ps.g42.criart.services

import org.springframework.mail.MailException
import org.springframework.mail.MailSender
import org.springframework.mail.SimpleMailMessage
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.SendEmailException

import java.util.*

@Service
class EmailService(private val mailSender: MailSender) {


    fun sendRegistrationMail(emailAddress: String, confirmationUrl: String) {

        var mailMessage = SimpleMailMessage()

        mailMessage.setTo(emailAddress)
        mailMessage.setFrom("criartserviceacc@gmail.com")
        mailMessage.setSubject("Account creation")
        mailMessage.setText("To complete the registration of your account please click the following link")
        try {
            this.mailSender.send(mailMessage)
        } catch(exception: MailException) {
            throw SendEmailException()
        }
    }

    fun sendPasswordRecoveryEmail(emailAddress: String, url: String) {
        
    }


    fun sendEmailAddressChangeEmail() {

    }

}