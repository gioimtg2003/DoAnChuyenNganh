export const isValidCheckEmail = (inputEmail) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if( inputEmail == ''){
        return {
            ER: false,
            Mess: 'Email không được để trống'
        }
    }
    if (reg.test(inputEmail) === false) {
        return {
            ER: false,
            Mess: 'Email không đúng định dạng'
        }
    } 
    return {
        ER: true,
        Mess: 'Email đúng'
    }
}

export const isValidCheckOTP  = (inputOTP) => {
    if( inputOTP == ''){
        return {
            ER: false,
            Mess: 'Vui lòng nhập mã OTP'
        }
    }
    return {
        ER: true,
        Mess: '11'
    }
}