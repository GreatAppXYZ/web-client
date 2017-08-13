class Messages {
  static getMessage(key) {
    let messageMap = {};
    messageMap['email.already.in.use'] = 'This is an existing email';
    messageMap['wrong.email.format'] = 'Wrong email format';
    messageMap['password.should.contain.at.least.6.characters'] = 'Password should contain at least 6 characters';
    messageMap['incorrect.current.password'] = 'Your current password is incorrect';
    messageMap['incorrect.authenticated.user.password'] = 'Your own password is incorrect';
    messageMap['new.password.should.contain.at.least.6.characters'] = 'The new password should contain at least 6 characters';
    messageMap['main.admin.should.not.be.deleted'] = 'Main admin user cannot be removed.';
    messageMap['invalid.future.date'] = 'Invalid future date.';

    if(!messageMap[key]) return key;
    return messageMap[key];
  }
}

export default Messages;
