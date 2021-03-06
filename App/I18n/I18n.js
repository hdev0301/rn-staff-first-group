import I18n from 'react-native-i18n'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// All translations for the app go here:
I18n.translations = {
  en: {
    'login-title': 'LOGIN',
    'login-info': 'or fill in the form to log in',
    'login-passwordForgotLink': 'Forgot your password?',
    'login-submitButton': 'Log in',
    'login-dontHaveAccount': 'Don’t have an account?',
    'login-registerLink': 'REGISTER',
    'register-title': 'REGISTER',
    'register-info': 'or fill in the form to register',
    'register-alreadyAnUser': 'Already a user?',
    'register-loginLink': 'LOGIN',
    'register-submitButton': 'Register',
    'placeholder-email': 'Email',
    'placeholder-password': 'Password',
    'placeholder-choosePassword': 'Choose a Password',
    'placeholder-confirmPassword': 'Confirm Password',
    'placeholder-name': 'Name',
    'placeholder-firstName': 'First Name',
    'placeholder-lastName': 'Last Name',
    'placeholder-phone': 'Phone',
    'placeholder-employeeId': 'Employee ID',
    'placeholder-articleTitle': 'Your news title',
    'placeholder-articleText': 'Your news text',
    'placeholder-feedbackText': 'Your feedback will be forwarded to the appropriate department. Please provide your phone number in your comments so they may contact you for more details.',
    'placeholder-feedbackCategory': 'Select Category',
    'newsfeed-title': 'Newsfeed',
    'profile-title': 'Profile',
    'profile-userProfile': 'User Profile',
    'profile-name': 'Name',
    'profile-phone': 'Phone',
    'profile-location': 'Location',
    'profile-email': 'Email',
    'profile-resetPassword': 'Reset Password',
    'profile-employeeId': 'Employee ID',
    'profile-employeeLocation': 'Employee Location',
    'profile-employeeRegion': 'Employee Region',
    'profile-logOut': 'LOG OUT',
    'profile-employeeAdmin': 'Helpful Links',
    'publish-title': 'Publish News',
    'publish-publishingOptions': 'Publishing Options',
    'publish-publishingInstructions': 'You can publish news to other employees in this location',
    'publish-info': 'Your news',
    'publish-button': 'Publish News',
    'publish-notifyUsers': 'Notify users?',
    'publish-articleSent': 'Thanks for your news!',
    'mainToolbar-cancel': 'Cancel',
    'mainToolbar-back': 'Back',
    'confirmationDialog-ok': 'OK',
    'resetPassword-title': 'Reset Password',
    'resetPassword-info': 'Please enter your email <br> so we can reset your password.',
    'resetPassword-button': 'Reset',
    'resetPassword-successful': 'We have emailed you instructions to complete your password reset. Please wait a few minutes for delivery.',
    'modifyProfileName-title': 'Name',
    'modifyProfileName-info': 'Edit your name',
    'modifyProfileName-done': 'Done',
    'modifyProfilePhone-title': 'Phone',
    'modifyProfilePhone-info': 'Edit your phone',
    'modifyProfilePhone-done': 'Done',
    'modifyProfileEmployeeId-title': 'Employee ID',
    'modifyProfileEmployeeId-info': 'Edit your Employee ID',
    'modifyProfileEmployeeId-done': 'Done',
    'error': 'Error',
    'warning': 'Warning',
    'validation-presence': 'Can’t be blank',
    'validation-email': 'Not a valid email',
    'validation-passwordMatch': 'Passwords don’t match',
    'validation-phone': 'Not a valid phone',
    'validation-stringMinLength': 'Must have at least {0} characters',
    'validation-numberMinLength': 'Must have at least {0} numbers',
    'validation-stringMaxLength': 'Can have maimum {0} characters',
    'error-networkLine': 'We can’t connect to the internet. <br> Please check your network connection.',
    'fbLoginButton-label': 'Log in with Facebook',
    'googleLoginButton-label': 'Log in with Google',
    'feedback-title': 'Feedback',
    'feedback-info': 'We are always looking for ways to improve. Please tell us what you think.',
    'feedback-infoImprovementOnly': 'This form is for improvement comments only. Safety, security or policy concerns should be submitted to our confidential',
    'feedback-infoHotlineLinkText': 'Ethics and Compliance Hotline',
    'feedback-infoHotlineLinkUrl': 'https://secure.ethicspoint.com/domain/media/en/gui/35441/index.html',
    'feedback-button': 'Send',
    'feedback-feedbackSent': 'Thanks for your feedback!',
    'perkspot-link': 'View your Perkspot',
    'perkspot-title': 'Perkspot',
    'adp-link': 'View your ADP Account',
    'adp-title': 'ADP',
    'wellsfargo-link': 'View your Wells Fargo 401k',
    'wellsfargo-title': 'Wells Fargo 401k',
    'greatwestlife-link': 'View your Great West Life 401k',
    'greatwestlife-title': 'Great West Life 401k',
    'employeeassistance-link': 'Employee Assistance Plan',
    'employeeassistance-title': 'Employee Assistance Plan',
    'feedbackCategoryModal-appImprovements': 'App Improvements',
    'feedbackCategoryModal-operationalImprovements': 'Operational Improvements',
    'feedbackCategoryModal-header': 'SELECT CATEGORY'
  }
};

export default I18n
