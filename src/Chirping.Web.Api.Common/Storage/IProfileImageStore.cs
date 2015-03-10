#region using directives

using System;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.Common.Storage
{
    public interface IProfileImageStore
    {
        void StoreImage(string image, string imageReference);
        string GetImage(string profileImageReference);
    }
}
