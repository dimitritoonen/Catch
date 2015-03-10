#region using directives

using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Domain
{
    public class TimeFrame
    {
        private const int AWeekInDays = 7;

        #region constructors

        public TimeFrame()
        {
            this.FromDate = DateTime.Today;
            this.TillDate = this.FromDate.AddDays(AWeekInDays);
        }

        public TimeFrame(string tillDate)
            : this()
        {
            SetTillDate(tillDate);
        }

        public TimeFrame(string fromDate, string tillDate)
        {
            SetFromDate(fromDate);
            SetTillDate(tillDate);
        }

        #endregion

        // sets from date and ensures that from date is alway greather than today
        private void SetFromDate(string date)
        {
            var fromDate = Convert.ToDateTime(date);

            if (fromDate < DateTime.Today)
            {
                // default from date to today is it's smaller than today
                this.FromDate = DateTime.Today;
            }
            else
            {
                this.FromDate = fromDate.Date;
            }
        }

        // sets till date and ensures that till date is alway greather than from date
        private void SetTillDate(string date)
        {
            var tillDate = Convert.ToDateTime(date);

            if (tillDate < this.FromDate)
            {
                // add a week if till date is smaller then from date
                this.TillDate = this.FromDate.AddDays(AWeekInDays);
            }
            else
            {
                this.TillDate = tillDate.Date;
            }
        }


        public DateTime FromDate { get; private set; }
        public DateTime TillDate { get; private set; }
    }
}
