/**
 * Login
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Author: Matthew Levy (mlevy@vbgov.com)
*/

$(function() {
  'use strict';

  // clear previous sessions:
  sessionStorage.removeItem('cognito-token');
  AWS.config.region = AWS_REGION; // Configure region in the AWS SDK if you will use it
  AWSCognito.config.region = AWS_REGION; //This is required to derive the endpoint
  if(AWSCognito.config.credentials){
    AWSCognito.config.credentials.clearCachedId();
  }
  AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: ID_POOL_ID
  });
  // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
  AWSCognito.config.update({accessKeyId: 'test', secretAccessKey: 'test'});

  function blockPage(){
    // Block the page
    $.blockUI({
      css: {
        'border': 'none',
        'font-size': '90%',
        'padding': '15px',
        'backgroundColor': '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        'opacity': 0.5,
        'color': '#fff'
      }
    });
  }

  if(window.location.search == '?verify'){
    $('#create-creds').hide();
    $('#verify-creds').fadeIn();
  }

  //Event handler for account creations
  $('#create-creds').submit(function(e){
    e.preventDefault();
    blockPage();
    //CREATE A USER
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
        UserPoolId : POOL_ID,
        ClientId : CLIENT_ID
    });
    var attributeList = [
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
          Name : 'email',
          Value : $('#create-creds input[name="email"]').val()
      }),
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
          Name : 'name',
          Value : $('#create-creds input[name="name"]').val()
      })
    ];
    userPool.signUp($('#create-creds input[name="user"]').val(), $('#create-creds input[name="pw"]').val(), attributeList, null, function(err, result){
        if (err) {
            alert(err);
            $.unblockUI();
            return;
        }
        //success
        $.unblockUI();
        localStorage.setItem('cognito-username', result.user.getUsername());
        $('#create-creds').hide();
        $('#verify-creds').fadeIn();
    });
  });

  //Event handler for verification form
  $('#verify-creds').submit(function(e){
    e.preventDefault();
    blockPage();

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
        UserPoolId : POOL_ID,
        ClientId : CLIENT_ID
    });
    var userData = {
        Username : localStorage.getItem('cognito-username') || $('#create-creds input[name="user"]').val(),
        Pool : userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.confirmRegistration($('#verify-creds input[name="code"]').val(), true, function(err, result) {
        if (err) {
            alert(err);
            $.unblockUI();
            return;
        }
        //success
        $.unblockUI();
        window.location.replace(window.location.href.replace('account-creation.html', 'login.html'));
    });
  });

  // Event handler for the login form
  $('#application-login').submit(function(e){
    e.preventDefault();
    blockPage();

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
        UserPoolId : POOL_ID,
        ClientId : CLIENT_ID
    });
    var authenticationData = {
        Username : $('#application-login input[name="user"]').val(),
        Password : $('#application-login input[name="pw"]').val(),
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var userData = {
        Username : $('#application-login input[name="user"]').val(),
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            // Authenticated; create a session token
            //set the token in sessionStorage
            sessionStorage.setItem('cognito-token', result.getIdToken().getJwtToken());

            var creds = {};
            creds['cognito-idp.' + AWS_REGION + '.amazonaws.com/' + POOL_ID] = sessionStorage.getItem('cognito-token');
            AWS.config.update({
              credentials: new AWS.CognitoIdentityCredentials({
                  IdentityPoolId : ID_POOL_ID, // your identity pool id here
                  Logins : creds
              })
            });
            $.unblockUI();
            window.location.replace(window.location.href.replace('login.html', 'index.html'));
        },

        onFailure: function(err) {
            alert(err);
            $.unblockUI();
        },

    });
  });
  // Event handler for the forgotten password
  $('#forgotten-password').submit(function(e){
    e.preventDefault();
    blockPage();

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
        UserPoolId : POOL_ID,
        ClientId : CLIENT_ID
    });
    var userData = {
        Username : $('#forgotten-password input[name="user"]').val(),
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    var verificationCode = null;
    $('#forgotten-password').prepend('<p>An email has been sent with verfication information.</p>');
    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            $.unblockUI();
            window.location.replace(window.location.href.replace('forgot-password.html', 'login.html'));
        },
        onFailure: function(err) {
            alert(err);
            $.unblockUI();
        },
        inputVerificationCode: function() {
            $.unblockUI();
            verificationCode = window.prompt('Please input verification code ' ,'');
            cognitoUser.confirmPassword(verificationCode, $('#forgotten-password input[name="pw"]').val(), this);
        }

    });
  });
});
