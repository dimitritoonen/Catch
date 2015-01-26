#region using directives

using System;
using System.Diagnostics;

#endregion

namespace Chirping.Web.Api.Diagnostics
{
    public class LogOperationScope : IDisposable
    {
        public TraceSource TraceSource { get; private set; }

        public LogOperationScope(string traceSource)
        {
            TraceSource = new TraceSource(traceSource);
        }

        #region logging operations

        public void TraceVerbose(LogEvent logEvent, string message, params string[] args)
        {
            TraceEvent(TraceEventType.Verbose, logEvent, message, args);
        }

        public void TraceInformation(LogEvent logEvent, string message, params string[] args)
        {
            TraceEvent(TraceEventType.Information, logEvent, message, args);
        }

        public void TraceWarning(LogEvent logEvent, string message, params string[] args)
        {
            TraceEvent(TraceEventType.Warning, logEvent, message, args);
        }

        public void TraceError(LogEvent logEvent, Exception ex)
        {
            TraceEvent(TraceEventType.Error, logEvent, ex.ToString());
        }

        public void TraceError(LogEvent logEvent, Exception ex, string message, params string[] args)
        {
            var msg = string.Format(message, args);
            var msgWithException = string.Format("{0}: {1}", msg, ex.ToString());

            TraceEvent(TraceEventType.Error, logEvent, msgWithException);
        }


        private void TraceEvent(TraceEventType eventType, LogEvent logEvent, string message, params string[] args)
        {
            TraceSource.TraceEvent(eventType, (int)logEvent, string.Format(message, args));
        }

        #endregion

        public void Dispose()
        {
            TraceSource.Flush();
            TraceSource.Close();
        }
    }
}
