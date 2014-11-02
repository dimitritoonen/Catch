using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;

namespace Catch.Web.Api.Infrastructure
{
    public class NinjectDependencyResolver : IDependencyResolver
    {
        private readonly IKernel _kernel;

        public IKernel Kernel
        {
            get { return _kernel; }
        }

        public NinjectDependencyResolver(IKernel kernel)
        {
            this._kernel = kernel;
        }

        public IDependencyScope BeginScope()
        {
            return this;
        }

        public object GetService(Type serviceType)
        {
            return _kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _kernel.GetAll(serviceType);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}