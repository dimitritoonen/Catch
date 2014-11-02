using Catch.Web.Api.Common.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Common.Repository
{
    public interface IRepository<T> where T : DomainModel
    {
        T Find(int id);
        void Add(T item);
        void Update(T item);
    }
}
