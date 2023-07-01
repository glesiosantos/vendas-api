import { log } from 'console'
import { fromUnixTime } from 'date-fns'
import mailer from 'nodemailer'

type TemplaeteVariables = {
  [key: string]: string | number
}

type ParseMailContent = {
  template: string
  variables: TemplaeteVariables
}

type MailContact = {
  name: string
  email: string
}

type MessageMail = {
  to: MailContact
  from?: MailContact
  subject: string
  templateData: ParseMailContent
}

export class EtherealConfig {
  static async sendEmail (message: MessageMail): Promise<void> {
    const account = await mailer.createTestAccount()
    const transporter = mailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })
    const messageMail = await transporter.sendMail({
      from: {
        name:  || 'Equipe API Vendas',
        email: '' || 'contato@vendasapi.com.br'
      }

    })

    console.log('Message sent: %s', messageMail.messageId)
    console.log('Preview url: %s', mailer.getTestMessageUrl(messageMail))
  }
}
