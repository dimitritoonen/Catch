#region using directives

using System;

using log4net;

#endregion

namespace Catch.Web.Api.Common.Logging
{
    public class LogManagerAdapter : ILogManager
    {
        public ILog GetLog(Type typeAssociatedWithRequestedLog)
        {
            return LogManager.GetLogger(typeAssociatedWithRequestedLog);
        }
    }
}
