package pt.isel.leic.ps.g42.criart.services

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.MailException
import org.springframework.mail.MailSender
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.SendEmailException

import java.util.*
import javax.mail.internet.MimeMessage

@Service
class EmailService(private val mailSender: JavaMailSender) {

    val log = LoggerFactory.getLogger(EmailService::class.java.name)
    companion object {
        private const val REGISTRATION_URI_TEMPLATE = "/api/auth/confirm-signup?token="
        private const val REGISTRATION_CONFIRMATION_EMAIL_SUBJECT = "Registration confirmation"
        private const val REGISTRATION_CONFIRMATION_EMAIL_MESSAGE_TEMPLATE =
            "<br>  To complete the registration of your Cri Art account please click <a href=\"%s\">here</a> "
    }


    @Value("\${web.site.address}")
    var baseUri: String? = null


    fun sendRegistrationMail(emailAddress: String, token: UUID) {

        var mailMessage = this.mailSender.createMimeMessage()

        val messagehelper = MimeMessageHelper(mailMessage)

        messagehelper.setTo(emailAddress)
        messagehelper.setSubject(REGISTRATION_CONFIRMATION_EMAIL_SUBJECT)


        val token = "${this.baseUri}$REGISTRATION_URI_TEMPLATE$token"

        messagehelper.setText(REGISTRATION_CONFIRMATION_EMAIL_MESSAGE_TEMPLATE.format(token), true)

        try {
            this.mailSender.send(mailMessage)
            log.info("Super Mail Slam Banana")
        } catch(exception: MailException) {
            println(exception.message)
            log.info("Super Mail Slam Banana Catch")
            throw SendEmailException()
        }
    }


}