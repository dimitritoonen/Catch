#region using directives

using Chirping.Web.Api.Common.Data.Entities;

using System;

#endregion

namespace Chirping.Web.Api.Common.Exceptions
{
    public class AddActivityException : Exception
    {
        public ActivityEntity Activity { get; private set; }

        public AddActivityException(ActivityEntity activity, Exception innerException)
            : base(BuildMessage(activity, innerException))
        {
            this.Activity = activity;
        }

        private static string BuildMessage(ActivityEntity activity, Exception innerException)
        {
            return string.Format("Unable to add activity with text: '{0}' by owner: {1} because of exception: {2}",
                    activity.ContentText,
                    activity.Owner.NickName,
                    innerException.ToString());
        }
    }
}
