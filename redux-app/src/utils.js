export const isEmailValid = (email) => {
    // A regular expression for email validation
     const emailRegex = /^(?!.*\.{2})(?!^\.)[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/;
     const emailRegexTrailingDot = /[^.]\@/;
     const emailDomainVarifivation = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|in)$/;
     return (
       emailRegex.test(email) &&
       emailRegexTrailingDot.test(email) &&
       emailDomainVarifivation.test(email)
     );
 };

 export const isValidMobileNumber = (num) => {
    const mobileNumberRegEx = /^([7-9]{1})([0-9]{1})([0-9]{8})$/;
    return mobileNumberRegEx.test(num);
};