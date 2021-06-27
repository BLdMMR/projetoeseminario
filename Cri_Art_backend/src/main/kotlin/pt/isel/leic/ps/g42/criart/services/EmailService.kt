package pt.isel.leic.ps.g42.criart.services

import org.springframework.mail.MailException
import org.springframework.mail.MailMessage
import org.springframework.mail.MailSender
import org.springframework.mail.SimpleMailMessage
import org.springframework.stereotype.Service
import java.lang.RuntimeException
import java.util.*

@Service
class EmailService(private val mailSender: MailSender) {

    private val registrationTemplate: String = "Your Cri Art account has been successfully created!"

    fun sendRegistrationMail(emailAddress: String) {

        var mailMessage = SimpleMailMessage()

        mailMessage.setTo(emailAddress)
        mailMessage.setFrom("criartserviceacc@gmail.com")
        mailMessage.setSubject("Account creation")
        mailMessage.setText(registrationTemplate)
        try {
            this.mailSender.send(mailMessage)
        } catch(exception: MailException) {
            throw RuntimeException(exception)
        }
    }

}