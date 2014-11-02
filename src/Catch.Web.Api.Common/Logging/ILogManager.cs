#region using directives

using System;

using log4net;

#endregion

namespace Catch.Web.Api.Common.Logging
{
    public interface ILogManager
    {
        ILog GetLog(Type typeAssociatedWithRequestedLog);
    }
}
