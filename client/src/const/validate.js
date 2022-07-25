//const
const matches = "Phải bao gồm ít nhất một kiểu số.";
const passwordConfirm = "Mật khẩu nhập lại không đúng.";
const email = "Vui lòng nhập địa chỉ email hợp lệ.";

//function check
function checkLengthBetween(nStart, nEnd, nameLabel) {
  return (
    nameLabel +
    " phải nằm giữa " +
    nStart.toString() +
    " và " +
    nEnd.toString() +
    "."
  );
}
function checkRequired(nameLabel) {
  return "Vui lòng nhập " + nameLabel + " của bạn.";
}
function checkMinLength(nMin) {
  return "Vui lòng nhập ít nhất " + nMin + " ký tự.";
}

export const validate = {
  matches,
  checkLengthBetween,
  checkRequired,
  passwordConfirm,
  email,
  checkMinLength,
};
