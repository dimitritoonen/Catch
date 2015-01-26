#region using directives

using System;

#endregion

namespace Chirping.Web.Api.Diagnostics
{
    /*
        First digit defines the below:
        1xxx = Start operations
        2xxx = normal behavior
        3xxx = activity tracing
        4xxx = warning
        5xxx = errors
        8xxx = Stop operations
        9xxx = fatal errors

        Second digit defines the below
        x1xx = database
        x2xx = account
        x3xx = 
        x4xx = email
        
    */

    public enum LogEvent
    {
        ///<message>1xxx: start operations</message>
        StartApplication = 1000,

        /// 2xxx: normal behavior
        InfoRegisteringUser = 2201,
        //InfoAccountSendConfirmEmail = 2210,
        //InfoAccountSendPasswordResetEmail = 2212,

        /// 3xxx: activity tracing


        /// 4xxx: warning


        /// 5xxx: errors
        ErrorAccountRegisteringUser = 5201,
        //ErrorAccountStoreImage = 5202,
        ErrorAccountSendEmail = 5210,

        /// 8xxx: stop operations


        /// 9xxx: fatal errors
        FatalGlobalUnexpectedException = 9999
    }
}
