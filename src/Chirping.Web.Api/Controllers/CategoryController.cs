#region using directives

using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Processors.Interfaces;

using System.Collections.Generic;
using System.Web.Http;

#endregion

namespace Chirping.Web.Api.Controllers
{
    [Authorize]
    public class CategoryController : ApiController
    {
        ICategoryProcessor _processor = null;

        public CategoryController(ICategoryProcessor processor)
        {
            this._processor = processor;
        }

        public IEnumerable<CategoryBindingModel> Get()
        {
            return _processor.GetAll();
        }
    }
}