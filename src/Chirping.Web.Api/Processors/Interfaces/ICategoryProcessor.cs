#region using directives

using Chirping.Web.Api.BindingModels.Activity;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.Processors.Interfaces
{
    public interface ICategoryProcessor
    {
        IEnumerable<CategoryBindingModel> GetAll();
    }
}