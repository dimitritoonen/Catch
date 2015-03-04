#region using directives

using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Common.Domain.Activity
{
    public class BetweenTime
    {
        private const int DefaultBeginTime = 8;
        private const int DefaultEndTime = 20;

        #region constructors

        public BetweenTime()
        {
            SetDefaults();
        }

        public BetweenTime(uint beginTime, uint endTime)
        {
            // set default if begin and end times are not propertly set up
            if (ValidateTimes(beginTime, endTime))
            {
                SetDefaults();
                return;
            }


            this.BeginTime = beginTime;
            this.EndTime = endTime;
        }

        private static bool ValidateTimes(uint beginTime, uint endTime)
        {
            return beginTime > 24 || 
                endTime > 24 ||
                endTime < beginTime;
        }

        private void SetDefaults()
        {
            this.BeginTime = DefaultBeginTime;
            this.EndTime = DefaultEndTime;
        }

        #endregion


        public uint BeginTime { get; private set; }
        public uint EndTime { get; private set; }
    }
}
