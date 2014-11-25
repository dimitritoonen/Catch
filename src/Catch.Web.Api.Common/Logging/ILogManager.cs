#region using directives

using System;

using log4net;

#endregion

namespace Chirping.Web.Api.Common.Logging
{
    public interface ILogManager
    {
        ILog GetLog(Type typeAssociatedWithRequestedLog);
    }
}
