'use strict';
console.log('Loading function');

exports.handler = (event, context) => {
    var permitted = [
        'permitted@example.com'
    ];
    var isPermitted = false;
    console.log('Received event:', JSON.stringify(event, null, 2));
    for(var p in permitted){
        if(event.request.userAttributes.email == permitted[p]){
            isPermitted = true;
            break;
        }
    }

    if(!isPermitted){
        throw(new Error('not permitted'));
    }
    context.done(null, event);
};
