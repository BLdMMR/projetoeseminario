package pt.isel.leic.ps.g42.criart.services

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.MailException
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.SendEmailException

import java.util.*

@Service
class EmailService(private val mailSender: JavaMailSender) {

    companion object {
        private const val REGISTRATION_URI_TEMPLATE = "/signup-confirmation?token="
        private const val REGISTRATION_CONFIRMATION_EMAIL_SUBJECT = "Registration confirmation"
        private const val REGISTRATION_CONFIRMATION_EMAIL_MESSAGE_TEMPLATE =
            "<br>  To complete the registration of your Cri Art account please click <a href=\"%s\">here</a> "
    }

    private val log = LoggerFactory.getLogger(EmailService::class.java.name)


    @Value("\${web.site.address}")
    var baseUri: String? = ""


    fun sendRegistrationMail(emailAddress: String, token: UUID) {

        var mailMessage = this.mailSender.createMimeMessage()

        val messageHelper = MimeMessageHelper(mailMessage)

        messageHelper.setTo(emailAddress)
        messageHelper.setSubject(REGISTRATION_CONFIRMATION_EMAIL_SUBJECT)

        val tkn = "${this.baseUri}$REGISTRATION_URI_TEMPLATE$token"

        messageHelper.setText(REGISTRATION_CONFIRMATION_EMAIL_MESSAGE_TEMPLATE.format(tkn), true)

        try {
            this.mailSender.send(mailMessage)
            log.info("Mail sent successfully!")
        } catch(exception: MailException) {
            log.error(exception.message)
            throw SendEmailException()
        }
    }


}