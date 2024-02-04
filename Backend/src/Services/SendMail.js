const nodemailer = require('nodemailer');
const { EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = require('../Configs/email.config');
const { logInfo, logError } = require('../Utils/logger');
async function SendEmail(email, code) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: EMAIL_PORT,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: "Gioidz",
        to: email,
        subject: "[OTP] Mã xác nhận tài khoản của bạn",
        html: `<table style="height:100%;border-style:none;width:100%;border-spacing:0;padding:0;background-color:#f8f8f8">
    <tbody style="height:100%">
        <tr style="height:100%;background-color:#ffffff">
            <td align="center" valign="bottom">
                
<table border="0" width="640" cellspacing="0" cellpadding="0">
<tbody>
    <tr>
        <td width="14">&nbsp;</td>

    </tr>
</tbody>
</table>

            </td>
        </tr>
        <tr style="height:100%">
            <td style="height:100%" align="center" valign="bottom">
                <table style="height:100%" border="0" width="640" cellspacing="0" cellpadding="0">
                    <tbody style="height:100%">
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td width="14">&nbsp;</td>
                            <td>
                                <table border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                


<table border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF">
<tbody>
    <tr>
        <td width="32">&nbsp;</td>
        <td height="32">&nbsp;</td>
        <td width="32">&nbsp;</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td style="color:#333333;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;padding:0px 0px 0px 0px" bgcolor="#ffffff">Xin chào,</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td style="color:#333333;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;padding:12px 0px 14px 0px" bgcolor="#ffffff">
Vì mục đích bảo mật, bạn phải nhập mã dưới đây để xác minh tài khoản. Mã sẽ chỉ hoạt động trong 15 phút và nếu bạn yêu cầu mã mới, mã này sẽ ngừng hoạt động.
        </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td>
            <table border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td style="color:#333333;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;padding:8px 16px 0px 16px" bgcolor="#FFF4CE">Mã xác minh tài khoản:</td>
                    </tr>
                    <tr>
                        <td style="color:#333333;font-family:'Segoe UI',Arial,sans-serif;font-size:18px;padding:0px 16px 8px 16px" bgcolor="#FFF4CE"><strong>${code}</strong></td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
    
</tbody>
</table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="14">&nbsp;</td>
                        </tr>
                        <tr style="height:100%">
                            <td width="14">&nbsp;</td>
                            
<td style="padding-top:20px;padding-bottom:20px" align="left" valign="top">
<p style="font-family:'Segoe UI',Tahoma,sans-serif;margin:0px 0px 0px 5px;color:#000;font-size:10px">© 2023 Ship Management  <a style="color:#072b60" href="/" target="_blank"> Đồ án chuyên ngành</a></p>
</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logError(new Date(), `Send to email: ${email} error`, "Send Email")
        } else {
            logInfo(new Date(), "Success", `Send to email: ${email} successfully + ${info.response}`)
        }
    })
}
module.exports =
{
    SendEmail
}